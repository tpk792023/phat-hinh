// Worker cấp máy chủ trung gian (TURN) cho trang Phát Hình Lớp Học.
// Cần 2 biến trong Settings → Variables and Secrets của Worker:
//   TURN_KEY_ID        (Text)   – "Turn Token ID" lấy ở Realtime → TURN Server
//   TURN_KEY_API_TOKEN (Secret) – "API Token" lấy cùng chỗ đó
// Chỉ trang của thầy (tpk792023.github.io) mới được xin thông tin đăng nhập TURN.

const ALLOWED = ['https://tpk792023.github.io'];

export default {
  async fetch(req, env) {
    const origin = req.headers.get('Origin') || '';
    const ok = ALLOWED.includes(origin) || /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);
    const cors = {
      'Access-Control-Allow-Origin': ok ? origin : ALLOWED[0],
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Vary': 'Origin',
    };
    if (req.method === 'OPTIONS') return new Response(null, { headers: cors });
    if (!ok) return new Response('Không được phép', { status: 403, headers: cors });
    if (!env.TURN_KEY_ID || !env.TURN_KEY_API_TOKEN) {
      return new Response('Chưa cài TURN_KEY_ID / TURN_KEY_API_TOKEN', { status: 500, headers: cors });
    }

    const r = await fetch(
      `https://rtc.live.cloudflare.com/v1/turn/keys/${env.TURN_KEY_ID}/credentials/generate-ice-servers`,
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${env.TURN_KEY_API_TOKEN}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ ttl: 86400 }), // hiệu lực 24 giờ
      }
    );
    return new Response(await r.text(), {
      status: r.status,
      headers: { ...cors, 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    });
  },
};
