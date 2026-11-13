# Tạo máy chủ trung gian (TURN) miễn phí trên Cloudflare

Mục đích: xem được link phát hình từ bất kỳ đâu (4G, Wi-Fi nhà, Wi-Fi trường).
Miễn phí 1.000 GB/tháng — dư dùng cho lớp học.

## Bước 1 – Tạo khoá TURN
1. Vào https://dash.cloudflare.com, đăng nhập (chưa có tài khoản thì bấm **Sign up**, chỉ cần email).
2. Menu bên trái chọn **Realtime** → **TURN Server** → **Create**.
   (Nếu không thấy, gõ "TURN" vào ô tìm kiếm trên cùng.)
3. Đặt tên `phat-hinh` → **Create**.
4. Màn hình hiện 2 dòng: **Turn Token ID** và **API Token**.
   Chép cả 2 vào Notepad tạm (API Token chỉ hiện một lần).

## Bước 2 – Tạo Worker
1. Menu bên trái chọn **Compute (Workers)** → **Workers & Pages** → **Create** → **Create Worker** (chọn mẫu "Hello World").
2. Đặt tên `phat-hinh-turn` → **Deploy**.
3. Bấm **Edit code**, xoá hết code cũ, dán toàn bộ nội dung file `worker.js` (cùng thư mục này) → **Deploy**.

## Bước 3 – Cài 2 khoá vào Worker
1. Quay lại trang Worker `phat-hinh-turn` → thẻ **Settings** → **Variables and Secrets** → **Add**.
2. Thêm:
   - Type **Text**, Name `TURN_KEY_ID`, Value = Turn Token ID ở bước 1.
   - Type **Secret**, Name `TURN_KEY_API_TOKEN`, Value = API Token ở bước 1.
3. Bấm **Deploy** (hoặc **Save**).

## Bước 4 – Gửi em đường link Worker
Trên trang Worker có dòng dạng `https://phat-hinh-turn.<tên-thầy>.workers.dev`.
Gửi em **đường link đó thôi** — không gửi 2 khoá ở bước 1.
