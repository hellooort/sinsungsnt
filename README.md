<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/ae0f816b-c798-4467-99c9-d347df91eb63

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

---

## 문의폼 메일 발송 (Resend)

문의폼은 `/api/contact` (Vercel 서버리스 함수)로 POST하고, 서버에서 Resend로 메일을 보냅니다.
API 키는 브라우저에 절대 노출되지 않습니다.

- 서버: `api/contact.ts`
- 프론트: `src/App.tsx` 의 `handleContactSubmit`

### 1. Resend 도메인 인증

1. https://resend.com 가입 후 **Domains → Add Domain** 에서 운영 도메인 `sntg.co.kr` 등록
2. Resend가 보여주는 DNS 레코드(SPF / DKIM / DMARC)를 도메인 등록기관 DNS에 추가
3. 상태가 **Verified** 로 바뀌면 완료 (보통 몇 분 ~ 수 시간)
4. **API Keys → Create API Key** 로 키 발급 (`re_` 로 시작)

도메인 인증 전에는 `onboarding@resend.dev` 로만 발송 가능하고, 수신도 Resend 가입 계정 본인 메일로만 됩니다.

### 2. 환경변수

| 변수 | 설명 | 예시 |
| --- | --- | --- |
| `RESEND_API_KEY` | Resend API 키 | `re_xxxxxxxx` |
| `MAIL_FROM` | 발신 주소. **인증된 도메인**이어야 함 | `신성에스엔티 <noreply@sntg.co.kr>` |
| `MAIL_TO` | 문의를 받을 주소. 쉼표로 여러 개 가능 | `shinsung0822@daum.net` (2026-11-23 고객사 요청 주소) |

**Vercel 등록:** 프로젝트 → Settings → Environment Variables 에서 위 3개를 Production / Preview / Development 모두 체크해 추가한 뒤 **재배포**해야 반영됩니다.

**로컬:** `.env` 에 같은 3개를 추가합니다. (`.env` 는 gitignore 되어 있음)

### 3. 로컬 테스트

Vite 개발 서버(`npm run dev`)는 `api/` 를 실행하지 않습니다. 서버리스 함수까지 같이 띄우려면:

```bash
npx vercel dev
```

### 4. 동작 확인

- 폼 전송 → 버튼이 "전송 중..." 으로 바뀌고, 성공 시 접수 안내 문구 표시
- 받은 메일에서 **회신**하면 문의자 이메일로 바로 답장됩니다 (Reply-To 설정)
- 실패 시 Vercel 대시보드 → Logs 에서 `api/contact` 로그 확인

### 5. 다음·네이버 수신 (`shinsung0822@daum.net`)

다음·네이버는 처음 보는 도메인에서 오는 메일을 스팸함으로 분류하는 경우가 있습니다.
도메인 인증(SPF/DKIM)이 되어 있으면 대부분 정상 수신되지만, 첫 발송 후 아래를 한 번 해두면 확실합니다.

1. 첫 테스트 메일이 받은편지함에 없으면 **스팸함** 확인 → **"스팸 아님"** 처리
2. 발신 주소(`no-reply@sinsungsnt.com` 등)를 네이버 **주소록에 등록**
3. 네이버 메일 → 환경설정 → 수신설정에서 해당 도메인을 **수신 허용 목록**에 추가

DMARC 레코드까지 넣어두면 네이버·다음 수신률이 눈에 띄게 안정적입니다.

### 스팸 대응

- 봇 유인용 히든 필드(허니팟) — 채워지면 발송하지 않고 성공으로 응답
- IP 기준 1분당 5회 간이 제한 (서버리스 특성상 완벽하진 않음)
- 스팸이 계속 들어오면 Vercel WAF 또는 Cloudflare Turnstile 추가 검토
