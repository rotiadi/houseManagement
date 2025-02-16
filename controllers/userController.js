const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
      const encrypt_password = await bcrypt.hash(newUser.password, 10);
      newUser.password = encrypt_password;
      await newUser.save();
      res.status(200).json({ message: "User registered successfully" });
    } catch (err) {
      next(err);
    }
  }
};

const loginUser = async (req, res, next) => {
  const { username, password } = req.body;
  const errors = [];
  const secretKey = process.env.SECRET_KEY;

  if (!username) {
    errors.push("User name is required");
  }
  if (!password) {
    errors.push("Password is required");
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  } else {
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      } else {
        const passwordOk = await bcrypt.compare(password, user.password);
        if (passwordOk) {
          const token = jwt.sign({ username: user.username }, secretKey, {
            expiresIn: "1h",
          });
          return res
            .status(200)
            .json({ message: "User logged in successfully", token: token });
        } else {
          return res.status(400).json({ message: "Incorrect password" });
        }
      }
    } catch (err) {
      next(err);
    }
  }
};

module.exports = { registerUser, loginUser };
