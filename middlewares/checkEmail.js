const validator = require("validator");

const checkEmail = (req, res, next) => {
  if (!req.body.email) {
    return res.status(401).json({ message: `An error occured!\n NO EMAIL` });
  } else {
    if (!validator.isEmail(req.body.email)) {
      return res.status(401).json({
        message: `Your email address is not a valid one. Please enter a valid email address`,
      });
    } else {
      next();
    }
  }
};

module.exports = { checkEmail };
