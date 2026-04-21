const router = require("express").Router();
const {
  listTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction
} = require("../controllers/transactionController");
const { protect } = require("../middleware/auth");

router.use(protect);

router.get("/", listTransactions);
router.post("/", createTransaction);
router.put("/:id", updateTransaction);
router.delete("/:id", deleteTransaction);

module.exports = router;