/*
 * 메일 — Resend(Vercel Marketplace 연결 시 RESEND_API_KEY 자동 주입). 키는 배포 환경 변수에만.
 *
 *   보내는 주소 MAIL_FROM — 인증된 도메인이 생기면 'THE TOTAL <entry@도메인>' 으로 바꾼다.
 *   인증된 도메인이 없으면 Resend 시험 주소(onboarding@resend.dev)로 나가고, 이때는 Resend 계정 주인 주소로만 실제로 도착한다.
 *
 *   두 가지 메일만 보낸다:
 *     1) 예약 확인 — ENTRY RESERVATION 직후 그 주소로 한 통(2028 시작 안내 신청이면 그 확인)
 *     2) 평가 개시 안내 — 평가일(11.01) 00:05 KST 에 예약자 목록에만, 한 사람에 한 번
 */
import { ENTRY_CLOSE_DATE, SEASON } from '@/lib/entry';

const KEY = process.env.RESEND_API_KEY;
const FROM = process.env.MAIL_FROM || 'THE TOTAL <onboarding@resend.dev>';
export const SITE_URL = (process.env.SITE_URL || 'https://thetotal-academy.vercel.app').replace(/\/$/, '');

export const mailConnected = () => !!KEY;

type Mail = { to: string; subject: string; text: string; html: string };

export async function sendOne(m: Mail): Promise<{ ok: boolean; error?: string }> {
  if (!KEY) return { ok: false, error: 'not_connected' };
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: FROM, to: [m.to], subject: m.subject, text: m.text, html: m.html }),
      cache: 'no-store',
    });
    if (res.ok) return { ok: true };
    return { ok: false, error: `${res.status} ${(await res.text()).slice(0, 200)}` };
  } catch (e) {
    return { ok: false, error: String(e).slice(0, 200) };
  }
}

/** 최대 100통씩 */
export async function sendBatch(list: Mail[]): Promise<{ ok: boolean; error?: string }> {
  if (!KEY) return { ok: false, error: 'not_connected' };
  try {
    const res = await fetch('https://api.resend.com/emails/batch', {
      method: 'POST',
      headers: { Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(list.map((m) => ({ from: FROM, to: [m.to], subject: m.subject, text: m.text, html: m.html }))),
      cache: 'no-store',
    });
    if (res.ok) return { ok: true };
    return { ok: false, error: `${res.status} ${(await res.text()).slice(0, 200)}` };
  } catch (e) {
    return { ok: false, error: String(e).slice(0, 200) };
  }
}

/* ── 서식 — 기관 공지처럼. 흰 바탕 · 검정 글자 · 얇은 선, 장식 없음 ── */
function layout(lines: string[], action?: { label: string; href: string }) {
  const body = lines.map((l) => (l === '' ? '<tr><td style="height:12px"></td></tr>' : `<tr><td style="padding:2px 0;font-size:15px;line-height:1.75;color:#2b2e32">${l}</td></tr>`)).join('');
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
<tr><td style="padding-top:14px;font-size:12px;line-height:1.7;color:#66696d">이 메일은 2027 THE TOTAL 입학평가 예약 때 동의하신 주소로만 발송됩니다.<br>이메일 주소는 ${SEASON === '2027' ? '2026년 11월 30일' : '시즌 종료'}까지 보관한 뒤 삭제합니다.<br>THE TOTAL · 서울 · 대치</td></tr>
</table></td></tr></table></body></html>`;
}

const strip = (lines: string[]) => lines.filter((l) => !l.startsWith('<')).join('\n').replace(/<[^>]+>/g, '');

export function reservationMail(to: string, season: string): Mail {
  if (season !== SEASON) {
    const lines = [
      `<b>${season} Season Entry 시작 안내 신청이 기록되었습니다.</b>`,
      '',
      `다음 Entry가 열릴 때 이 주소로 한 차례 안내합니다.`,
    ];
    return { to, subject: `[THE TOTAL] ${season} Season Entry 시작 안내 신청 확인`, html: layout(lines), text: strip(lines) };
  }
  const lines = [
    '<b>2027 Season Entry 예약이 완료되었습니다.</b>',
    '',
    '평가 진행 &nbsp;온라인 Entry',
    '평가일 &nbsp;2026년 11월 1일',
    '평가 종료 &nbsp;2026년 11월 1일 23:59',
    '',
    '평가 개시 안내는 11월 1일 00시에 이 주소로 전달됩니다.',
  ];
  return {
    to,
    subject: '[THE TOTAL] 2027 Season Entry 예약 확인',
    html: layout(lines, { label: '2027 입학평가 안내 보기 →', href: `${SITE_URL}/entry` }),
    text: `${strip(lines).replace(/&nbsp;/g, ' ')}\n\n${SITE_URL}/entry`,
  };
}

export function evaluationMail(to: string): Mail {
  const end = ENTRY_CLOSE_DATE.slice(0, 10).replace(/-/g, '.');
  const lines = [
    '<b>2027 THE TOTAL 입학평가가 시작되었습니다.</b>',
    '',
    `평가는 오늘 ${end} 23:59에 종료됩니다.`,
    '온라인 진단에서 시작해, 과정별 평가로 이어집니다.',
    '',
    '평가는 한 번만 진행됩니다. 시작 전에 조용한 곳을 정해 두세요.',
  ];
  return {
    to,
    subject: '[THE TOTAL] 2027 Season Entry 평가 개시',
    html: layout(lines, { label: '평가 시작하기 →', href: `${SITE_URL}/diagnosis` }),
    text: `${strip(lines)}\n\n${SITE_URL}/diagnosis`,
  };
}
