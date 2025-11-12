// server.js
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const app = express();
const profileRouter = require("./routes/profile");
const attendancesRouter = require("./routes/attendances");
const scheduleRoutes = require("./routes/schedule");
const locationRoutes = require("./routes/location");

// Middleware
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use((req, res, next) => {
  req.url = req.url.replace(/\s+/g, "").replace(/%0A/g, "");
  next();
});

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Doc Json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
app.use("/api/auth", authRoutes); //Login route
app.use("/api/attendances", attendancesRouter);
app.use("/schedule", scheduleRoutes); //zz
app.use("/locations", locationRoutes); //location route

// API test kết nối
app.get("/test", (req, res) => {
  console.log("Test API được gọi");
  res.json({ message: "API đang hoạt động" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Không tìm thấy API: ${req.method} ${req.url}`,
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Lỗi server:", err);
  res
    .status(500)
    .json({ success: false, message: "Lỗi server", error: err.message });
});
// Profile
app.use("/api/profile", profileRouter);

const PORT = 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server đang chạy trên port ${PORT}`);
  console.log(`Test API: http://localhost:${PORT}/test`);
  console.log(`Login API: http://localhost:${PORT}/login`);
});
