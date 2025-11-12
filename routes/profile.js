const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/profile", (req, res) => {
  const userId = req.query.id;

  if (!userId) {
    return res
      .status(400)
      .json({ success: false, message: "Thiếu ID người dùng" });
  }

  const query = "SELECT*FROM employees WHERE employees_id = ?";
  db.query(query, [full_name, email], (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Lỗi truy vấn ",
        error: err.message,
      });
    }

    if (results.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Không tìm thấy người dùng" });
    }

    const user = results[0];
    res.json({ success: true, user });
  });
});

module.exports = router;
