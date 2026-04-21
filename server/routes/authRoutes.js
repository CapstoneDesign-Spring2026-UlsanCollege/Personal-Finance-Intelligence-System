const router = require("express").Router();
const { body } = require("express-validator");
const { register, login } = require("../controllers/authController");
const { handleValidation } = require("../middleware/validate");

router.post(
  "/register",
  [
    body("name").trim().isLength({ min: 2 }).withMessage("Name must be at least 2 characters."),
    body("email").isEmail().withMessage("Please enter a valid email."),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters.")
      .matches(/[A-Z]/).withMessage("Password must include an uppercase letter.")
      .matches(/[0-9]/).withMessage("Password must include a number.")
  ],
  handleValidation,
  register
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please enter a valid email."),
    body("password").notEmpty().withMessage("Password is required.")
  ],
  handleValidation,
  login
);

module.exports = router;
