const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const db = require("../config/db");

// 📌 API POST - Đăng nhập hỗ trợ hash và plaintext
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const sql = `SELECT user_id, username, password, employee_id FROM users WHERE username = ?`;

  db.query(sql, [username], async (err, results) => {
    if (err) {
      console.error("Login error:", err);
      return res.status(500).json({ error: "Login failed" });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const user = results[0];

    try {
      // So sánh với bcrypt trước
      const isMatch = await bcrypt.compare(password, user.password);

      // Nếu bcrypt không khớp, thử kiểm tra mật khẩu plaintext (cũ)
      const isLegacyMatch = password === user.password;

      if (!isMatch && !isLegacyMatch) {
        return res.status(401).json({ error: "Invalid username or password" });
      }

      // Xóa mật khẩu khỏi response
      const { password: _, ...userData } = user;

      res.status(200).json(userData);
    } catch (compareError) {
      console.error("Password compare error:", compareError);
      res.status(500).json({ error: "Password comparison failed" });
    }
  });
});

// 📌 API GET - Kiểm tra đăng nhập (không khuyến nghị sử dụng GET với thông tin nhạy cảm)
router.get("/check-login", (req, res) => {
  const { username, password } = req.query;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }

  const sql = `SELECT user_id, username, password, employee_id FROM users WHERE username = ?`;

  db.query(sql, [username], async (err, results) => {
    if (err) {
      console.error("Check login error:", err);
      return res.status(500).json({ error: "Failed to check login" });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const user = results[0];

    try {
      const isMatch = await bcrypt.compare(password, user.password);
      const isLegacyMatch = password === user.password;

      if (!isMatch && !isLegacyMatch) {
        return res.status(401).json({ error: "Invalid username or password" });
      }

      const { password: _, ...userData } = user;
      res.status(200).json(userData);
    } catch (compareError) {
      console.error("Compare error:", compareError);
      res.status(500).json({ error: "Password comparison failed" });
    }
  });
});

module.exports = router;
