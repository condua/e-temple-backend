const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// 1. Import Controllers
const { handleChat } = require("../controllers/chatController");
const { getUsers, createUser } = require("../controllers/userController");

const app = express();

// 2. Middleware cơ bản (Phải đặt lên đầu)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. Cấu hình CORS
const whitelist = [
  "https://e-temple-phi.vercel.app",
  "http://localhost:3000",
  "http://localhost:5173",
];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Không được phép bởi CORS"));
    }
  },
};
app.use(cors(corsOptions));

// 4. Kết nối MongoDB (Hàm tối ưu cho Serverless)
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("MongoDB Connection Error:", err);
  }
};

// Middleware kết nối DB cho mọi request -----
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// 5. Định nghĩa Routes (Xóa bỏ các route trùng lặp)
app.get("/", (req, res) => {
  res.send("API MongoDB is running with Controllers!");
});

// Route cho Chat
app.post("/api/chat", handleChat);

// Route cho User (Dùng controller thật)
app.get("/api/users", getUsers);
app.post("/api/users", createUser);

// 6. Xử lý Port và listen (Chỉ chạy khi ở Local)
const port = process.env.PORT || 3000;
if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

// 7. Export cho Vercel
module.exports = app;
