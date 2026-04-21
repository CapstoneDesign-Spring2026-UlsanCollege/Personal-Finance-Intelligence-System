const router = require("express").Router();
const { body } = require("express-validator");
const {
  listTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction
} = require("../controllers/transactionController");
const { protect } = require("../middleware/auth");
const { handleValidation } = require("../middleware/validate");

const transactionValidators = [
  body("title").trim().isLength({ min: 2 }).withMessage("Title must be at least 2 characters."),
  body("amount").isFloat({ gt: 0 }).withMessage("Amount must be greater than 0."),
  body("type").isIn(["income", "expense"]).withMessage("Type must be income or expense."),
  body("category").trim().isLength({ min: 2 }).withMessage("Category is required."),
  body("date").isISO8601().withMessage("Date must be valid.")
];

router.use(protect);

router.get("/", listTransactions);
router.post("/", transactionValidators, handleValidation, createTransaction);
router.put("/:id", transactionValidators, handleValidation, updateTransaction);
router.delete("/:id", deleteTransaction);

module.exports = router;
