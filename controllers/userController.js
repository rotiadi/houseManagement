const User = require("../models/user");

const registerUser = async (req, res, next) => {
  const { username, email, password, fullname } = req.body;
  const errors = [];

  if (!username) {
    errors.push("Username is required");
  }
  if (!email) {
    errors.push("Email is required");
  }
  if (!password) {
    errors.push("Password is required");
  }
  if (!fullname) {
    errors.push("Fullname is required");
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  } else {
    try {
      const newUser = new User(req.body);
      await newUser.save();
      res.status(200).json({ message: "User registered successfully" });
    } catch (err) {
      next(err);
    }
  }
};

module.exports = { registerUser };
