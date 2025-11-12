🕒 Attendance App

Attendance App là ứng dụng chấm công thông minh được phát triển bằng React Native (Expo), giúp doanh nghiệp và nhân viên dễ dàng thực hiện check-in / check-out mọi lúc, mọi nơi thông qua mã QR hoặc mã thay thế, kết hợp với định vị GPS và xác thực thời gian thực.

Ứng dụng hướng đến mục tiêu đơn giản hóa quy trình chấm công, tăng độ chính xác và hạn chế gian lận trong quản lý nhân sự hiện đại.

🚀 Tính năng nổi bật
🧾 1. Chấm công thông minh

✅ Chấm công bằng mã QR – Quét mã do hệ thống cấp để điểm danh nhanh chóng và chính xác.

🔑 Chấm công bằng mã thay thế (Manual Code) – Cho phép nhập mã thủ công khi camera hoặc QR không khả dụng.

🌍 2. Xác thực vị trí và thời gian thực

📍 Xác thực vị trí (GPS) – Ghi nhận vị trí check-in/check-out để đảm bảo nhân viên có mặt tại đúng khu vực quy định.

⏱️ Cập nhật mã QR động (Dynamic QR) – Mã QR được tự động làm mới sau mỗi chu kỳ (ví dụ 5 phút), ngăn chặn việc dùng lại mã cũ.

👤 3. Quản lý người dùng và dữ liệu

🔐 Đăng nhập / đăng xuất an toàn – Xác thực người dùng bằng tài khoản và token bảo mật.

📅 Xem lịch sử chấm công – Dễ dàng theo dõi toàn bộ lịch sử check-in / check-out trong ứng dụng.

🧭 Phân biệt trạng thái Check-in / Check-out – Giao diện trực quan, rõ ràng từng lượt chấm công.

🖥️ 4. Quản lý và giám sát (Dành cho Admin)

👨‍💼 Bảng điều khiển tổng hợp (Dashboard) – Theo dõi danh sách nhân viên, thời gian chấm công, và trạng thái hiện tại.

📊 Thống kê năng suất – Tính toán giờ làm việc, thời gian đi muộn / về sớm. (Tính năng mở rộng)

🛠️ Công nghệ sử dụng
Thành phần	Công nghệ
Frontend	React Native (Expo)
Ngôn ngữ	JavaScript / TypeScript
API Backend	Node.js (Express)
Cơ sở dữ liệu	MySQL / MongoDB
Định vị	Expo Location API
Quét mã	expo-camera / react-qr-code
Xác thực	JWT (JSON Web Token)
⚙️ Quy trình hoạt động

Admin hệ thống tạo mã QR chứa token động (TTL = 300s).

Nhân viên mở app → Quét mã QR hoặc nhập mã thủ công.

Ứng dụng gửi yêu cầu đến server kèm token, userId, và vị trí GPS.

Server xác thực tính hợp lệ của token, thời gian, và vị trí.

Nếu hợp lệ → ghi dữ liệu chấm công vào CSDL và trả kết quả thành công.

📲 Màn hình chính trong ứng dụng

Màn hình đăng nhập / đăng xuất

Trang chấm công (QR / mã thay thế)

Màn hình hiển thị mã QR động

Trang lịch sử chấm công (History)

Trang hồ sơ cá nhân (Profile)

💡 Lợi ích mang lại

Tự động hóa quy trình chấm công, giảm phụ thuộc vào sổ sách thủ công.

Giảm thiểu gian lận (chấm công hộ, sai vị trí, sai giờ).

Dễ dàng mở rộng và tích hợp với các hệ thống HRM (quản lý nhân sự).

Giao diện thân thiện, phù hợp cho mọi loại hình doanh nghiệp.

🔒 Bảo mật

Mỗi mã QR chỉ hợp lệ trong thời gian ngắn (TTL).

Token được mã hóa bằng JWT.

Xác thực người dùng qua API bảo mật.

Ẩn thông tin nhạy cảm bằng file .env (không commit)
