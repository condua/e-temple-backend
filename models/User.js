const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  dob: {
    type: Date, // Ngày tháng năm sinh dd/mm/yyyy ----
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Tự động lấy ngày hiện tại khi tạo
  },
});

// Kiểm tra nếu model đã tồn tại (----------- tránh lỗi trên Vercel khi hot-reload ---------------)
module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
