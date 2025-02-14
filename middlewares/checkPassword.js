const validator = require("validator");

const checkPassword = (req, res, next) => {
  if (!req.body.password) {
    return res.status(401).json({ message: "You must enter a password!" });
  } else {
    const checkResults = [];
    const minlength = {
      minLength: 8,
      minLowercase: 0,
      minUppercase: 0,
      minNumbers: 0,
      minSymbols: 0,
    };
    if (!validator.isStrongPassword(req.body.password, minlength)) {
      checkResults.push({
        message: "Your paswword length must be grater then 8",
        status: false,
      });
    } else {
      checkResults.push({
        message: "Your paswword length must be grater then 8",
        status: true,
      });
    }

    const minLowercase = {
      minLength: 4,
      minLowercase: 4,
      minUppercase: 0,
      minNumbers: 0,
      minSymbols: 0,
    };
    if (!validator.isStrongPassword(req.body.password, minLowercase)) {
      checkResults.push({
        message: "Your paswword must contains minimum 4 lowercase letters",
        status: false,
      });
    } else {
      checkResults.push({
        message: "Your paswword must contains minimum 4 lowercase letters",
        status: true,
      });
    }

    const minUppercase = {
      minLength: 2,
      minLowercase: 0,
      minUppercase: 2,
      minNumbers: 0,
      minSymbols: 0,
    };
    if (!validator.isStrongPassword(req.body.password, minUppercase)) {
      checkResults.push({
        message: "Your paswword must contains minimum 2 Uppercase letters",
        status: false,
      });
    } else {
      checkResults.push({
        message: "Your paswword must contains minimum 2 Uppercase letters",
        status: true,
      });
    }

    const minNumbers = {
      minLength: 1,
      minLowercase: 0,
      minUppercase: 0,
      minNumbers: 1,
      minSymbols: 0,
    };
    if (!validator.isStrongPassword(req.body.password, minNumbers)) {
      checkResults.push({
        message: "Your paswword must contains minimum 1 number",
        status: false,
      });
    } else {
      checkResults.push({
        message: "Your paswword must contains minimum 1 number",
        status: true,
      });
    }

    const minSymbols = {
      minLength: 1,
      minLowercase: 0,
      minUppercase: 0,
      minNumbers: 0,
      minSymbols: 1,
    };
    if (!validator.isStrongPassword(req.body.password, minSymbols)) {
      checkResults.push({
        message: "Your paswword must contains minimum 1 symbol",
        status: false,
      });
    } else {
      checkResults.push({
        message: "Your paswword must contains minimum 1 symbol",
        status: true,
      });
    }

    if (checkResults.filter((item) => item.status === false).length > 0) {
      return res.status(403).json({
        message: checkResults
          .map((item) => `${item.message} - ${item.status ? "OK" : "Not OK"}`)
          .join("\n"),
      });
    } else {
      next();
    }
  }
};

module.exports = { checkPassword };
