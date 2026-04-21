const router = require("express").Router();
const { body } = require("express-validator");
const {
  listBudgets,
  createBudget,
  updateBudget,
  deleteBudget
} = require("../controllers/budgetController");
const { protect } = require("../middleware/auth");
const { handleValidation } = require("../middleware/validate");

const budgetValidators = [
  body("category").trim().isLength({ min: 2 }).withMessage("Category is required."),
  body("amount").isFloat({ gt: 0 }).withMessage("Budget amount must be greater than 0.")
];

router.use(protect);

router.get("/", listBudgets);
router.post("/", budgetValidators, handleValidation, createBudget);
router.put("/:id", budgetValidators, handleValidation, updateBudget);
router.delete("/:id", deleteBudget);

module.exports = router;
