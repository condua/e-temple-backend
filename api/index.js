const express = require("express");
const app = express();
const cors = require("cors");
const { handleChat } = require("../controllers/chatController");

// Route cho chat sử dụng OpenAI
app.use(cors()); // Cho phép tất cả các domain truy cập
// Middleware (nếu cần)
app.use(express.json());

// Route cơ bản
app.get("/", (req, res) => {
  res.send("Node.js Server is running on Vercel!");
});

// Route API ví dụ
app.get("/api/users", (req, res) => {
  res.json([
    { id: 1, name: "User A" },
    { id: 2, name: "User B" },
  ]);
});
app.post("/api/chat", handleChat);

// QUAN TRỌNG: Cấu hình để chạy được cả Local và Vercel
const port = process.env.PORT || 3000;

// Chỉ chạy app.listen khi ở môi trường local (development)
// if (process.env.NODE_ENV !== "production") {
//   app.listen(port, () => {
//     console.log(`Server running locally on port ${port}`);
//   });
// }
app.listen(port, () => {
  console.log(`Server is running on port ${PORT}`);
});
// Export app để Vercel handler có thể bắt được request
module.exports = app;
