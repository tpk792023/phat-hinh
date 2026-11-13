// =====================================================================
// 👉 CHỖ 1: Dán "Turn Token ID" vào GIỮA HAI DẤU NHÁY ' ' ở dòng dưới
const TURN_KEY_ID = 'DAN_TURN_TOKEN_ID_VAO_DAY';

// 👉 CHỖ 2: Dán "API Token" vào GIỮA HAI DẤU NHÁY ' ' ở dòng dưới
const TURN_KEY_API_TOKEN = 'DAN_API_TOKEN_VAO_DAY';
// =====================================================================
// Từ đây trở xuống KHÔNG sửa gì
// (Bản này để trong kho GitHub nên không chứa khoá thật.
//  Khoá thật chỉ nằm trong Worker phat-hinh-turn trên Cloudflare.)

const ALLOWED = ['https://tpk792023.github.io'];
export default {
  async fetch(req, env) {
    const origin = req.headers.get('Origin') || '';
    const ok = ALLOWED.includes(origin) || /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);
    const cors = { 'Access-Control-Allow-Origin': ok ? origin : ALLOWED[0], 'Access-Control-Allow-Methods': 'GET, OPTIONS', 'Vary': 'Origin' };
    if (req.method === 'OPTIONS') return new Response(null, { headers: cors });
    if (!ok) return new Response('Khong duoc phep', { status: 403, headers: cors });
    const clean = v => String(v || '').replace(/[\s"'`]/g, '');
    const keyId = clean(TURN_KEY_ID), token = clean(TURN_KEY_API_TOKEN);
    try {
      const r = await fetch(`https://rtc.live.cloudflare.com/v1/turn/keys/${encodeURIComponent(keyId)}/credentials/generate-ice-servers`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ ttl: 86400 }),
      });
      return new Response(await r.text(), { status: r.status, headers: { ...cors, 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });
    } catch (e) {
      return new Response('Loi: ' + e.message, { status: 502, headers: cors });
    }
  },
};
