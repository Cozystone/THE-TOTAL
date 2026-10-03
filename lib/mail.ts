import nodemailer from 'nodemailer';
import { ENTRY_CLOSE_DATE, SEASON } from '@/lib/entry';

/*
 * 메일 — Gmail SMTP(앱 비밀번호). 값은 배포 환경 변수에만 둔다(코드 · 저장소에 넣지 않는다).
 *   GMAIL_USER          보내는 Gmail 주소(받는 사람에게 보이는 주소)
 *   GMAIL_APP_PASSWORD  그 계정의 앱 비밀번호 16자리(2단계 인증 필요)
 *   MAIL_FROM_NAME      보내는 이름(기본 'THE TOTAL Academy')
 *
 * 두 통만 보낸다.
 *   1) 신청 완료 — ENTRY APPLICATION 직후 그 주소로 한 통
 *   2) 응시 안내 — 카운트다운이 끝나면(11.01 00:00 KST 이후 첫 크론) 신청자 목록에만, 한 사람에 한 번
 * Gmail 개인 계정은 하루 약 500명까지 보낼 수 있다 — 넘으면 다음 크론이 남은 주소를 이어 보낸다.
 */
const USER = process.env.GMAIL_USER;
const PASS = process.env.GMAIL_APP_PASSWORD?.replace(/\s+/g, '');
const NAME = process.env.MAIL_FROM_NAME || 'THE TOTAL Academy';
export const SITE_URL = (process.env.SITE_URL || 'https://thetotal-academy.vercel.app').replace(/\/$/, '');

export const mailConnected = () => !!(USER && PASS);

export type Mail = { to: string; subject: string; text: string; html: string };

let transport: nodemailer.Transporter | null = null;
function smtp() {
  if (!transport) {
    transport = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      pool: true,
      maxConnections: 2,
      auth: { user: USER, pass: PASS },
    });
  }
  return transport;
}

export async function sendOne(m: Mail): Promise<{ ok: boolean; error?: string }> {
  if (!mailConnected()) return { ok: false, error: 'not_connected' };
  try {
    await smtp().sendMail({ from: { name: NAME, address: USER! }, to: m.to, subject: m.subject, text: m.text, html: m.html });
    return { ok: true };
  } catch (e) {
    return { ok: false, error: String((e as Error).message ?? e).slice(0, 200) };
  }
}

/** 차례로 보낸다. 보낸 주소와 실패한 주소를 나눠 돌려준다. */
export async function sendMany(list: Mail[]): Promise<{ sent: string[]; failed: { to: string; error: string }[] }> {
  const sent: string[] = [];
  const failed: { to: string; error: string }[] = [];
  for (const m of list) {
    const r = await sendOne(m);
    if (r.ok) sent.push(m.to);
    else failed.push({ to: m.to, error: r.error ?? 'error' });
  }
  return { sent, failed };
}

/* ── 서식 — 기관 공지처럼. 흰 바탕 · 검정 글자 · 얇은 선, 장식 없음 ── */
function layout(lines: string[], action?: { label: string; href: string }) {
  const body = lines
    .map((l) => (l === '' ? '<tr><td style="height:12px"></td></tr>' : `<tr><td style="padding:2px 0;font-size:15px;line-height:1.75;color:#2b2e32">${l}</td></tr>`))
    .join('');
  const button = action
    ? `<tr><td style="padding:24px 0 8px"><a href="${action.href}" style="display:inline-block;padding:14px 22px;background:#0e0f10;color:#ffffff;text-decoration:none;font-size:15px;font-weight:600">${action.label}</a></td></tr>`
    : '';
  return `<!doctype html><html lang="ko"><body style="margin:0;padding:0;background:#ffffff">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff"><tr><td align="center" style="padding:32px 20px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;font-family:'Apple SD Gothic Neo','Malgun Gothic',Helvetica,Arial,sans-serif">
<tr><td style="padding-bottom:14px;border-bottom:1px solid #0e0f10;font-family:Helvetica,Arial,sans-serif;font-size:15px;font-weight:700;letter-spacing:0.08em;color:#0e0f10">THE TOTAL <span style="font-size:11px;font-weight:500;letter-spacing:0.04em;color:#66696d">Academy</span></td></tr>
<tr><td style="height:24px"></td></tr>
${body}${button}
<tr><td style="padding-top:28px;border-bottom:1px solid #e8e8e8"></td></tr>
<tr><td style="padding-top:14px;font-size:12px;line-height:1.7;color:#66696d">이 메일은 2027 THE TOTAL 입학평가 신청 때 동의하신 주소로만 발송됩니다.<br>이메일 주소는 2026년 11월 30일까지 보관한 뒤 삭제합니다.<br>THE TOTAL · 서울 · 대치</td></tr>
</table></td></tr></table></body></html>`;
}

const plain = (lines: string[]) => lines.join('\n').replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ');

/** 1) 신청 완료 */
export function applicationMail(to: string, season: string): Mail {
  if (season !== SEASON) {
    const lines = [`<b>${season} Season Entry 시작 안내 신청이 완료되었습니다.</b>`, '', '다음 Entry가 열릴 때 이 주소로 한 차례 안내합니다.'];
    return { to, subject: `[THE TOTAL] ${season} Season Entry 시작 안내 신청이 완료되었습니다`, html: layout(lines), text: plain(lines) };
  }
  const lines = [
    '<b>2027 THE TOTAL 입학평가 신청이 완료되었습니다.</b>',
    '',
    '평가 진행 &nbsp;온라인 Entry',
    '평가일 &nbsp;2026년 11월 1일',
    '평가 종료 &nbsp;2026년 11월 1일 23:59',
    '',
    '신청 마감(10월 31일 23:59)이 지나면, 응시 안내를 이 주소로 보내드립니다.',
  ];
  return {
    to,
    subject: '[THE TOTAL] 2027 입학평가 신청이 완료되었습니다',
    html: layout(lines, { label: '2027 입학평가 안내 보기 →', href: `${SITE_URL}/entry` }),
    text: `${plain(lines)}\n\n${SITE_URL}/entry`,
  };
}

/** 2) 응시 안내 — 카운트다운이 끝난 뒤 */
export function examMail(to: string): Mail {
  const end = ENTRY_CLOSE_DATE.slice(0, 10).replace(/-/g, '.');
  const lines = [
    '<b>2027 THE TOTAL 입학평가 응시 안내</b>',
    '',
    '신청이 마감되었습니다. 지금부터 온라인 Entry에 응시할 수 있습니다.',
    `평가는 ${end} 23:59에 종료됩니다.`,
    '',
    '온라인 진단에서 시작해, 과정별 평가로 이어집니다.',
    '평가는 한 번만 진행됩니다. 시작 전에 조용한 곳을 정해 두세요.',
  ];
  return {
    to,
    subject: '[THE TOTAL] 2027 입학평가 응시 안내',
    html: layout(lines, { label: '응시하기 →', href: `${SITE_URL}/diagnosis` }),
    text: `${plain(lines)}\n\n${SITE_URL}/diagnosis`,
  };
}
