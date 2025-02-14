const connectDB = require("../db");
const User = require("../models/user");

const checkUserName = async (req, res, next) => {
  const { username } = req.body;

  try {
    connectDB();
    const user = await User.findOne({ username });
    if (user) {
      res.status(500).json({ message: "Username already exists" });
    } else {
      next();
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { checkUserName };
