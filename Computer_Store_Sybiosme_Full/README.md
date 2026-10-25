# SYBIOSME × APEX PC COMPONENT STORE (Full-Stack MVC + 3D WebGL2 Scrollytelling)

Dự án kết hợp hoàn chỉnh 2 hệ thống:
1. **`pc_sybiosme_scroll.html`** (và `Computer-store-main/public/sybiosme-3d.html`):
   - Bản Web 3D WebGL2 & Halftone Scrollytelling chuẩn **SYBIOSME (`sybiosme.com/en`)** kết hợp trực tiếp **Component Store + Smart PC Builder + Giỏ hàng + Admin Dashboard**.
   - **Chạy ngay không cần cài đặt**: Chỉ cần mở trực tiếp file `pc_sybiosme_scroll.html` trên bất kỳ trình duyệt nào (Chrome, Edge, Safari, Firefox).
2. **`Computer-store-main/` (Node.js + Express + EJS + MySQL / Auto In-Memory Store)**:
   - Hệ thống MVC Cửa hàng linh kiện máy tính, lọc sản phẩm, kiểm tra tương thích Socket CPU/Mainboard/RAM (`PCBuilderModel`), Giỏ hàng và trang Quản trị Admin (`/admin`).
   - Đã nâng cấp giao diện sang phong cách **SYBIOSME Dark Carbon + Vermilion**, bổ sung đầy đủ ảnh linh kiện thật (RTX 5090, Ryzen 9 9950X3D, ROG X870E Glacial, Miku AIO OLED...) và nhúng trực tiếp mô hình 3D.
   - Tự động chạy mượt ngay cả khi máy chưa bật MySQL nhờ bộ nhớ đệm SQL tích hợp sẵn trong `src/config/DBConnection.js`.

## Cách chạy bản Node.js Express (`Computer-store-main`)
```bash
cd Computer-store-main
npm install
npm start
```
Sau đó truy cập:
- Trang chủ & 3D Showcase: `http://localhost:3000`
- Bản 3D SYBIOSME Toàn màn hình: `http://localhost:3000/sybiosme-3d.html`
- PC Builder kiểm tra tương thích: `http://localhost:3000/pc-builder`
- Tài khoản Admin: `admin@store.test` / Mật khẩu: `admin123`
- Tài khoản Khách hàng: `user@store.test` / Mật khẩu: `user123`
