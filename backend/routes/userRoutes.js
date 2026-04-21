const router = require("express").Router();
const { protect } = require("../middleware/auth");
const {
  getProfile,
  updateProfile,
  getSettings,
  updateSettings
} = require("../controllers/userController");

router.use(protect);

router.get("/profile", getProfile);
router.put("/profile", updateProfile);
router.get("/settings", getSettings);
router.put("/settings", updateSettings);

module.exports = router;