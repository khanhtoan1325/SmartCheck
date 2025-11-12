const express = require("express");
const router = express.Router();
const db = require("../config/db");

// 📍 POST /locations
router.post("/", (req, res) => {
  const { latitude, longitude, description } = req.body;

  if (!latitude || !longitude) {
    return res.status(400).json({ error: "Thiếu dữ liệu tọa độ" });
  }

  const sql = `
    INSERT INTO locations (latitude, longitude, description)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [latitude, longitude, description || null], (err, result) => {
    if (err) {
      console.error("❌ Lỗi khi lưu vị trí:", err);
      return res.status(500).json({ error: "Lưu vị trí thất bại" });
    }

    res.status(200).json({
      message: "✅ Lưu vị trí thành công!",
      id: result.insertId,
      data: { latitude, longitude, description },
    });
  });
});

module.exports = router;
