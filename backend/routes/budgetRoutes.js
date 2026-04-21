const router = require("express").Router();
const {
  listBudgets,
  createBudget,
  updateBudget,
  deleteBudget
} = require("../controllers/budgetController");
const { protect } = require("../middleware/auth");

router.use(protect);

router.get("/", listBudgets);
router.post("/", createBudget);
router.put("/:id", updateBudget);
router.delete("/:id", deleteBudget);

module.exports = router;