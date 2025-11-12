<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Attendance App - React Native (Expo)</title>
  <style>
    body {
      font-family: "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      line-height: 1.7;
      color: #222;
      background: #fafafa;
      margin: 40px auto;
      max-width: 900px;
      padding: 20px;
    }
    h1, h2, h3 {
      color: #1a73e8;
    }
    h1 {
      text-align: center;
      margin-bottom: 30px;
    }
    code {
      background: #f2f2f2;
      padding: 2px 6px;
      border-radius: 4px;
      font-family: Consolas, monospace;
    }
    pre {
      background: #f7f7f7;
      padding: 15px;
      border-radius: 10px;
      overflow-x: auto;
      border: 1px solid #e0e0e0;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 15px 0;
    }
    th, td {
      border: 1px solid #ddd;
      padding: 10px 12px;
      text-align: left;
    }
    th {
      background: #1a73e8;
      color: #fff;
    }
    section {
      margin-bottom: 40px;
    }
    ul {
      margin-left: 20px;
    }
    .highlight {
      color: #1a73e8;
      font-weight: bold;
    }
    hr {
      border: none;
      border-top: 2px solid #eee;
      margin: 40px 0;
    }
  </style>
</head>
<body>

  <h1>🕒 Attendance App</h1>

  <section>
    <p>
      <strong>Attendance App</strong> là ứng dụng <span class="highlight">chấm công thông minh</span> được phát triển bằng 
      <strong>React Native (Expo)</strong>, giúp doanh nghiệp và nhân viên dễ dàng thực hiện 
      <strong>check-in / check-out</strong> mọi lúc, mọi nơi thông qua <strong>mã QR</strong> hoặc 
      <strong>mã thay thế</strong>, kết hợp với <strong>định vị GPS</strong> và 
      <strong>xác thực thời gian thực</strong>.
    </p>
    <p>
      Ứng dụng hướng đến mục tiêu <strong>đơn giản hóa quy trình chấm công</strong>, 
      <strong>tăng độ chính xác</strong> và <strong>hạn chế gian lận</strong> trong quản lý nhân sự hiện đại.
    </p>
  </section>

  <hr />

  <section>
    <h2>🚀 Tính năng nổi bật</h2>

    <h3>🧾 1. Chấm công thông minh</h3>
    <ul>
      <li>✅ <strong>Chấm công bằng mã QR</strong> – Quét mã do hệ thống cấp để điểm danh nhanh chóng và chính xác.</li>
      <li>🔑 <strong>Chấm công bằng mã thay thế (Manual Code)</strong> – Cho phép nhập mã thủ công khi camera hoặc QR không khả dụng.</li>
    </ul>

    <h3>🌍 2. Xác thực vị trí và thời gian thực</h3>
    <ul>
      <li>📍 <strong>Xác thực vị trí (GPS)</strong> – Ghi nhận vị trí check-in/check-out để đảm bảo nhân viên có mặt tại đúng khu vực quy định.</li>
      <li>⏱️ <strong>Cập nhật mã QR động (Dynamic QR)</strong> – Mã QR được tự động làm mới sau mỗi chu kỳ, ngăn chặn việc dùng lại mã cũ.</li>
    </ul>

    <h3>👤 3. Quản lý người dùng và dữ liệu</h3>
    <ul>
      <li>🔐 <strong>Đăng nhập / đăng xuất an toàn</strong> – Xác thực người dùng bằng tài khoản và token bảo mật.</li>
      <li>📅 <strong>Xem lịch sử chấm công</strong> – Theo dõi toàn bộ lịch sử check-in / check-out trong ứng dụng.</li>
      <li>🧭 <strong>Phân biệt trạng thái Check-in / Check-out</strong> – Giao diện trực quan, rõ ràng từng lượt chấm công.</li>
    </ul>

    <h3>🖥️ 4. Quản lý và giám sát (Admin)</h3>
    <ul>
      <li>👨‍💼 <strong>Bảng điều khiển tổng hợp (Dashboard)</strong> – Theo dõi danh sách nhân viên, thời gian chấm công, trạng thái hiện tại.</li>
      <li>📊 <strong>Thống kê năng suất</strong> – Tính toán giờ làm việc, thời gian đi muộn / về sớm.</li>
    </ul>
  </section>

  <hr />

  <section>
    <h2>🛠️ Công nghệ sử dụng</h2>
    <table>
      <tr><th>Thành phần</th><th>Công nghệ</th></tr>
      <tr><td>Frontend</td><td><strong>React Native (Expo)</strong></td></tr>
      <tr><td>Ngôn ngữ</td><td><strong>JavaScript / TypeScript</strong></td></tr>
      <tr><td>API Backend</td><td><strong>Node.js (Express)</strong></td></tr>
      <tr><td>Cơ sở dữ liệu</td><td><strong>MySQL / MongoDB</strong></td></tr>
      <tr><td>Định vị</td><td><strong>Expo Location API</strong></td></tr>
      <tr><td>Quét mã</td><td><strong>expo-camera / react-qr-code</strong></td></tr>
      <tr><td>Xác thực</td><td><strong>JWT (JSON Web Token)</strong></td></tr>
    </table>
  </section>

  <hr />

  <section>
    <h2>⚙️ Quy trình hoạt động</h2>
    <ol>
      <li><strong>Admin</strong> tạo mã QR chứa token động (TTL = 300s).</li>
      <li><strong>Nhân viên</strong> mở app → Quét mã QR hoặc nhập mã thủ công.</li>
      <li>Ứng dụng gửi yêu cầu đến server kèm token, userId, vị trí GPS.</li>
      <li><strong>Server</strong> xác thực token, thời gian, vị trí hợp lệ.</li>
      <li>Nếu hợp lệ → ghi dữ liệu chấm công và trả kết quả thành công.</li>
    </ol>
  </section>

  <hr />

  <section>
    <h2>📲 Màn hình chính trong ứng dụng</h2>
    <ul>
      <li>Trang đăng nhập / đăng xuất</li>
      <li>Trang chấm công (QR / mã thay thế)</li>
      <li>Màn hình hiển thị mã QR động</li>
      <li>Lịch sử chấm công (History)</li>
      <li>Hồ sơ cá nhân (Profile)</li>
    </ul>
  </section>

  <hr />

  <section>
    <h2>📦 Cài đặt và chạy dự án</h2>
    <pre><code># 1️⃣ Clone repository
git clone https://github.com/nguyenkhanhtoan1325/Smartcheck.git
cd attendance-app

# 2️⃣ Cài đặt dependencies
npm install
# hoặc
yarn install

# 3️⃣ Chạy dự án
npx expo start
</code></pre>
  </section>

  <hr />

  <section>
    <h2>🧭 Cấu trúc thư mục</h2>
    <pre><code>/attendance-app
├── /src
│   ├── /screens
│   ├── /components
│   ├── /hooks
│   ├── /services
│   ├── /utils
│   └── /styles
├── App.js
├── app.json
├── package.json
└── .env
</code></pre>
  </section>

  <hr />

  <section>
    <h2>👨‍💻 Nhóm phát triển</h2>
    <table>
      <tr><th>Vai trò</th><th>Họ tên</th><th>Công nghệ phụ trách</th></tr>
      <tr><td>🧠 Trưởng nhóm</td><td>Nguyễn Khánh Toàn</td><td>React Native, Node.js, MySQL</td></tr>
      <tr><td>💻 Backend Developer</td><td>Nguyễn Khánh Toàn</td><td>Express, JWT, API</td></tr>
      <tr><td>🎨 Frontend Developer</td><td>Nguyễn Khánh Toàn</td><td>React Native (Expo)</td></tr>
      <tr><td>🧾 Tester</td><td>Nguyễn Nhật Hà</td><td>Postman, Jest</td></tr>
    </table>
  </section>

  <hr />
</body>
</html>
