import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * 홈페이지 문의 접수 (Vercel 서버리스 함수)
 *
 * 구글 앱스스크립트 웹앱으로 넘겨 스프레드시트에 기록하고 Gmail로 알림 메일을 보낸다.
 *   CONTACT_WEBHOOK_URL  앱스스크립트 웹앱 주소 (https://script.google.com/macros/s/.../exec)
 *   CONTACT_SECRET       웹앱 코드의 SECRET 과 같은 값
 * 스크립트와 설치 방법: docs/contact-appsscript.gs, docs/contact-appsscript.md
 *
 * 설정이 없으면 503 을 돌려주고, 화면은 방문자의 메일 프로그램을 회사 주소로 여는 예비 경로로 넘어간다.
 */

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

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) {
    console.error('문의 접수 설정 없음: CONTACT_WEBHOOK_URL');
    return res.status(503).json({ error: '문의 접수 설정이 완료되지 않았습니다.' });
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

  if (values.email !== '' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    return res.status(400).json({ error: '이메일 주소 형식이 올바르지 않습니다.' });
  }

  const at = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });

  try {
    const response = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret: process.env.CONTACT_SECRET ?? '', ...values, at }),
    });
    const raw = await response.text();

    // 앱스스크립트는 오류가 나도 200 에 HTML 을 돌려주는 경우가 있어 본문까지 확인한다.
    let data: { ok?: boolean; reason?: string } = {};
    try {
      data = JSON.parse(raw);
    } catch {
      console.error('문의 접수 응답이 JSON 이 아님', response.status, raw.slice(0, 300));
      return res.status(502).json({ error: '문의 접수에 실패했습니다.' });
    }
    if (!response.ok || data.ok !== true) {
      console.error('문의 접수 실패', response.status, data.reason ?? raw.slice(0, 300));
      return res.status(502).json({ error: '문의 접수에 실패했습니다.' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('문의 접수 오류', err);
    return res.status(502).json({ error: '문의 접수에 실패했습니다.' });
  }
}
