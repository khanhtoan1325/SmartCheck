const express = require("express");
const router = express.Router();
const db = require("../config/db");
// 📌 Check-in API
router.post("/checking", (req, res) => {
  const { employee_id, check_in_location, random_code, check_in_time } =
    req.body;
  const currentTime = new Date();
  const today = currentTime.toISOString().split("T")[0];

  const sql = `
    INSERT INTO attendances 
    (employee_id, check_in_time, check_in_location, random_code, date) 
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [employee_id, currentTime, check_in_location, random_code, today],
    (err, result) => {
      if (err) {
        console.error("Check-in error:", err);
        return res.status(500).json({ error: "Check-in failed" });
      }

      if (result.affectedRows > 0) {
        res.status(200).json({
          employee_id,
          message: "Check-in successful",
          attendance_id: result.insertId,
        });
      } else {
        res.status(500).json({ error: "Check-in failed" });
      }
    }
  );
});

// 📌 Check-out API
// 📌 Check-out API
router.post("/checkout", (req, res) => {
  const { employee_id, check_out_location } = req.body;
  const currentTime = new Date();
  const today = currentTime.toISOString().split("T")[0];

  const sql = `
    UPDATE attendances 
    SET check_out_time = ?, check_out_location = ?
    WHERE employee_id = ? AND date = ? AND check_out_time IS NULL
  `;

  db.query(
    sql,
    [currentTime, check_out_location, employee_id, today],
    (err, result) => {
      if (err) {
        console.error("Check-out error:", err);
        return res.status(500).json({ error: "Check-out failed" });
      }

      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ error: "No matching check-in found for today" });
      }

      res.status(200).json({ message: "Check-out successful" });
    }
  );
});

module.exports = router;
