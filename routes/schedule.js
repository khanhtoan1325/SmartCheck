// routes/schedule.js
const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Lấy lịch làm việc theo employee_id
router.get("/:employeeId", (req, res) => {
  const employeeId = req.params.employeeId;

  const sql = `
    SELECT schedule_id, work_date, start_time, end_time, status
    FROM schedules
    WHERE employee_id = ?
    ORDER BY work_date ASC
  `;

  db.query(sql, [employeeId], (err, results) => {
    if (err) {
      console.error("Lỗi truy vấn:", err);
      return res.status(500).json({ error: "Lỗi server" });
    }

    res.json(results);
  });
});

module.exports = router;
