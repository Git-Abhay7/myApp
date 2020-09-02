const { check } = require("express-validator");

module.exports = {
  create: () => {
    return [
      check("firstName").notEmpty().withMessage("Please fill firstName  field"),
      check("email").notEmpty().withMessage("Please fill Email field."),
      check("password")
        .notEmpty()
        .isLength({ min: 5 })
        .withMessage("Please fill password field with atleast length--> 5."),
    ];
  },
  valid: () => {
    return [
      check("email").notEmpty().withMessage("Please fill Email field"),
      check("password").notEmpty().withMessage("Please fill Password."),
    ];
  },
};
