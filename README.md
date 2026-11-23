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

## 문의폼 접수 (구글 스프레드시트 + Gmail)

문의폼은 `/api/contact` (Vercel 서버리스 함수)로 POST하고, 서버가 구글 앱스스크립트 웹앱으로 넘겨
**스프레드시트에 기록하고 Gmail로 `shinsung0822@daum.net`에 알림 메일**을 보냅니다.

- 서버: `api/contact.ts`
- 프론트: `src/App.tsx` 의 `handleContactSubmit`
- 앱스스크립트 코드: `docs/contact-appsscript.gs`
- 설치 순서: `docs/contact-appsscript.md`

### 환경변수 (Vercel `hellooorts-projects` / `sinsungsnt`)

| 변수 | 설명 |
| --- | --- |
| `CONTACT_WEBHOOK_URL` | 앱스스크립트 웹앱 주소 (`https://script.google.com/macros/s/.../exec`) |
| `CONTACT_SECRET` | 스크립트의 `SECRET` 과 같은 값 |

환경변수가 없거나 접수에 실패하면 방문자의 메일 프로그램을 `shinsung0822@daum.net`으로 여는 예비 경로로 넘어갑니다.

### 로컬 테스트

Vite 개발 서버(`npm run dev`)는 `api/` 를 실행하지 않습니다. 서버리스 함수까지 같이 띄우려면 `npx vercel dev` 를 씁니다.

### 배포

Vercel 프로젝트의 프레임워크 설정이 Other 로 되어 있어서 `vercel.json` 에 Vite 빌드(`dist`)를 명시했습니다.
