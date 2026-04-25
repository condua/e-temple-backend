const User = require("../models/User");

// Lấy danh sách Users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách user", error });
  }
};

// Tạo User mới
exports.createUser = async (req, res) => {
  try {
    const { name, dob } = req.body;

    // Log để kiểm tra dữ liệu nhận được
    console.log("Body nhận được:", req.body);

    if (!name || !dob) {
      return res.status(400).json({ message: "Thiếu tên hoặc ngày sinh" });
    }

    const newUser = new User({ name, dob });
    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Lỗi tạo user:", error);
    res.status(500).json({ message: "Lỗi Server", error: error.message });
  }
};
