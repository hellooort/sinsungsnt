import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

/** 입력 길이 상한 — 초과 시 400. 폼 남용/대용량 페이로드 방지용. */
const LIMITS = {
  company: 100,
  name: 50,
  phone: 40,
  email: 120,
  message: 5000,
} as const;

type Field = keyof typeof LIMITS;

const LABELS: Record<Field, string> = {
  company: '회사명 / 브랜드명',
  name: '담당자명',
  phone: '연락처',
  email: '이메일',
  message: '문의 내용',
};

/** 이메일 본문에 그대로 넣기 전 HTML 특수문자 이스케이프. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** 헤더 인젝션 방지 — 제목/Reply-To에 들어가는 값에서 개행 제거. */
function singleLine(value: string): string {
  return value.replace(/[\r\n]+/g, ' ').trim();
}

/**
 * 워밍된 인스턴스 한정 간이 스로틀.
 * 서버리스라 완전하진 않지만 연속 스팸 폭주는 걸러준다.
 */
const recentByIp = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (recentByIp.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  recentByIp.set(ip, hits);
  if (recentByIp.size > 500) recentByIp.clear();
  return hits.length > MAX_PER_WINDOW;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'POST 요청만 허용됩니다.' });
  }

  const { RESEND_API_KEY, MAIL_TO, MAIL_FROM } = process.env;
  if (!RESEND_API_KEY || !MAIL_TO || !MAIL_FROM) {
    console.error('환경변수 누락:', {
      RESEND_API_KEY: !!RESEND_API_KEY,
      MAIL_TO: !!MAIL_TO,
      MAIL_FROM: !!MAIL_FROM,
    });
    return res.status(500).json({ error: '서버 설정이 완료되지 않았습니다. 전화로 문의해 주세요.' });
  }

  const body = (req.body ?? {}) as Record<string, unknown>;

  // 허니팟 — 사람에겐 안 보이는 필드. 채워져 있으면 봇으로 보고 조용히 성공 처리.
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return res.status(200).json({ ok: true });
  }

  const forwarded = req.headers['x-forwarded-for'];
  const ip = (Array.isArray(forwarded) ? forwarded[0] : forwarded)?.split(',')[0]?.trim() ?? 'unknown';
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: '요청이 너무 잦습니다. 잠시 후 다시 시도해 주세요.' });
  }

  const values = {} as Record<Field, string>;
  for (const field of Object.keys(LIMITS) as Field[]) {
    const raw = body[field];
    values[field] = typeof raw === 'string' ? raw.trim() : '';
  }

  const required: Field[] = ['company', 'name', 'phone', 'message'];
  const missing = required.filter((f) => values[f] === '');
  if (missing.length > 0) {
    return res.status(400).json({ error: `${missing.map((f) => LABELS[f]).join(', ')} 항목을 입력해 주세요.` });
  }

  const tooLong = (Object.keys(LIMITS) as Field[]).filter((f) => values[f].length > LIMITS[f]);
  if (tooLong.length > 0) {
    return res.status(400).json({ error: `${tooLong.map((f) => LABELS[f]).join(', ')} 항목이 너무 깁니다.` });
  }

  const hasEmail = values.email !== '';
  if (hasEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    return res.status(400).json({ error: '이메일 주소 형식이 올바르지 않습니다.' });
  }

  const subject = singleLine(`[신성에스엔티 문의] ${values.company} - ${values.name}`);

  const rows = (Object.keys(LABELS) as Field[])
    .filter((f) => f !== 'message' && values[f] !== '')
    .map(
      (f) => `<tr>
        <th style="text-align:left;padding:10px 16px;background:#f1f5f9;color:#475569;font-size:13px;font-weight:600;width:140px;vertical-align:top;">${LABELS[f]}</th>
        <td style="padding:10px 16px;color:#0f172a;font-size:14px;">${escapeHtml(values[f])}</td>
      </tr>`
    )
    .join('');

  const html = `<div style="font-family:-apple-system,'Segoe UI','Malgun Gothic',sans-serif;max-width:640px;margin:0 auto;">
    <div style="background:#0f172a;color:#ffffff;padding:20px 24px;font-size:16px;font-weight:700;">신성에스엔티 홈페이지 문의</div>
    <table style="width:100%;border-collapse:collapse;border:1px solid #e2e8f0;border-top:none;">${rows}</table>
    <div style="border:1px solid #e2e8f0;border-top:none;padding:16px;">
      <div style="color:#475569;font-size:13px;font-weight:600;margin-bottom:8px;">${LABELS.message}</div>
      <div style="color:#0f172a;font-size:14px;line-height:1.7;white-space:pre-wrap;">${escapeHtml(values.message)}</div>
    </div>
    <div style="padding:14px 16px;color:#94a3b8;font-size:12px;">
      ${hasEmail ? '이 메일에 그대로 회신하면 문의자에게 전달됩니다.' : '문의자가 이메일을 남기지 않았습니다. 연락처로 회신해 주세요.'}
    </div>
  </div>`;

  const text = (Object.keys(LABELS) as Field[])
    .filter((f) => values[f] !== '')
    .map((f) => `${LABELS[f]}: ${values[f]}`)
    .join('\n');

  try {
    const { data, error } = await resend.emails.send({
      from: MAIL_FROM,
      to: MAIL_TO.split(',').map((addr) => addr.trim()).filter(Boolean),
      subject,
      html,
      text,
      ...(hasEmail ? { replyTo: singleLine(values.email) } : {}),
    });

    if (error) {
      console.error('Resend 발송 실패:', error);
      return res.status(502).json({ error: '메일 발송에 실패했습니다. 전화로 문의해 주세요.' });
    }

    return res.status(200).json({ ok: true, id: data?.id });
  } catch (err) {
    console.error('문의 처리 중 예외:', err);
    return res.status(500).json({ error: '메일 발송에 실패했습니다. 전화로 문의해 주세요.' });
  }
}
