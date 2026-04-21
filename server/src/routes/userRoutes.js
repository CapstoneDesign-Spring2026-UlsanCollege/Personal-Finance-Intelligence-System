const router = require("express").Router();
const { body } = require("express-validator");
const { protect } = require("../middleware/auth");
const { handleValidation } = require("../middleware/validate");
const {
  getProfile,
  updateProfile,
  getSettings,
  updateSettings
} = require("../controllers/userController");

router.use(protect);

router.get("/profile", getProfile);
router.put(
  "/profile",
  [
    body("name").trim().isLength({ min: 2 }).withMessage("Name must be at least 2 characters."),
    body("currency").trim().isLength({ min: 3, max: 5 }).withMessage("Currency is required."),
    body("monthlyIncomeGoal").optional().isFloat({ min: 0 }).withMessage("Monthly income goal must be 0 or more.")
  ],
  handleValidation,
  updateProfile
);

router.get("/settings", getSettings);
router.put(
  "/settings",
  [
    body("emailNotifications").isBoolean().withMessage("Email notifications must be true or false."),
    body("monthlyReports").isBoolean().withMessage("Monthly reports must be true or false."),
    body("twoFactorEnabled").isBoolean().withMessage("Two factor setting must be true or false.")
  ],
  handleValidation,
  updateSettings
);

module.exports = router;
