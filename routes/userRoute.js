const express = require("express");
const { registerUser, loginUser } = require("../controllers/userController");
const router = express.Router();
const { checkUserName } = require("../middlewares/checkUserName.js");
const { checkPassword } = require("../middlewares/checkPassword.js");
const { checkEmail } = require("../middlewares/checkEmail.js");

router.post(
  "/register",
  checkUserName,
  checkEmail,
  checkPassword,
  registerUser
);

router.post("/login", loginUser);

module.exports = router;
