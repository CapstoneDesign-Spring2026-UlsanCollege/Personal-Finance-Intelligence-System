const router = require("express").Router();
const { protect } = require("../middleware/auth");
const { getDashboard } = require("../controllers/dashboardController");

router.use(protect);
router.get("/", getDashboard);

module.exports = router;
