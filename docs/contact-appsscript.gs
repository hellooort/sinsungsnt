/**
 * 신성에스엔티 홈페이지 문의 접수 (구글 앱스스크립트)
 *
 *  - 스프레드시트에 문의를 한 줄씩 쌓는다
 *  - 지정한 주소로 알림 메일을 보낸다 (스크립트를 만든 구글 계정의 Gmail로 발송)
 *
 * 설치 순서는 같은 폴더의 contact-appsscript.md 를 본다.
 */

/* ── 이 세 가지만 고쳐서 쓴다 ───────────────────────────── */
var TO = 'shinsung0822@daum.net';        // 알림을 받을 주소 (여러 명이면 쉼표로 구분)
var SECRET = '여기에-직접-정한-비밀값';   // Vercel 환경변수 CONTACT_SECRET 과 똑같이 적는다
var SHEET_NAME = '문의';
/* ──────────────────────────────────────────────────── */

function doPost(e) {
  try {
    var d = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    if (SECRET && d.secret !== SECRET) return json({ ok: false, reason: 'forbidden' });

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sh = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    if (sh.getLastRow() === 0) {
      sh.appendRow(['접수 시각', '회사명 / 브랜드명', '담당자명', '연락처', '이메일', '문의 내용']);
      sh.setFrozenRows(1);
      sh.setColumnWidths(1, 5, 160);
      sh.setColumnWidth(6, 420);
    }
    var at = d.at || Utilities.formatDate(new Date(), 'Asia/Seoul', 'yyyy-MM-dd HH:mm:ss');
    sh.appendRow([at, d.company || '', d.name || '', d.phone || '', d.email || '', d.message || '']);

    var body = [
      '신성에스엔티 홈페이지 문의',
      '',
      '회사명 / 브랜드명: ' + (d.company || '-'),
      '담당자명: ' + (d.name || '-'),
      '연락처: ' + (d.phone || '-'),
      '이메일: ' + (d.email || '-'),
      '',
      '문의 내용:',
      d.message || '-',
      '',
      '접수 시각: ' + at,
      '문의 목록: ' + ss.getUrl(),
      '',
      d.email ? '이 메일에 그대로 회신하면 문의자에게 전달됩니다.' : '문의자가 이메일을 남기지 않았습니다. 연락처로 회신해 주세요.'
    ].join('\n');

    var mail = {
      to: TO,
      subject: '[신성에스엔티 문의] ' + (d.company || '') + ' - ' + (d.name || ''),
      body: body,
      name: '신성에스엔티 홈페이지'
    };
    if (d.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) mail.replyTo = d.email;
    MailApp.sendEmail(mail);

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, reason: String(err) });
  }
}

/** 주소가 살아 있는지 브라우저로 확인할 때 쓴다 */
function doGet() {
  return json({ ok: true, status: 'ready' });
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/** 배포 전에 한 번 실행해 권한을 승인하고, 시트 기록과 메일 발송을 확인한다 */
function testSend() {
  var res = doPost({
    postData: {
      contents: JSON.stringify({
        secret: SECRET,
        company: '테스트 회사',
        name: '테스트',
        phone: '010-0000-0000',
        email: '',
        message: '설정 확인용 문의입니다'
      })
    }
  });
  Logger.log(res.getContent());
}
