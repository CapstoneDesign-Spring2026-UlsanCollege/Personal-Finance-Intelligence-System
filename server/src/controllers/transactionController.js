const db = require("../config/db");

function mapRow(row) {
  return {
    id: row.id,
    title: row.title,
    amount: Number(row.amount),
    type: row.type,
    category: row.category,
    date: row.date,
    notes: row.notes || "",
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

function listTransactions(req, res) {
  const rows = db.prepare(`
    SELECT *
    FROM transactions
    WHERE user_id = ?
    ORDER BY date DESC, id DESC
  `).all(req.user.id);

  res.json({ transactions: rows.map(mapRow) });
}

function createTransaction(req, res) {
  const { title, amount, type, category, date, notes } = req.body;
  const now = new Date().toISOString();

  const result = db.prepare(`
    INSERT INTO transactions (user_id, title, amount, type, category, date, notes, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(req.user.id, title.trim(), Number(amount), type, category.trim(), date, (notes || "").trim(), now, now);

  const row = db.prepare("SELECT * FROM transactions WHERE id = ?").get(result.lastInsertRowid);
  res.status(201).json({ transaction: mapRow(row), message: "Transaction added successfully." });
}

function updateTransaction(req, res) {
  const existing = db.prepare("SELECT id FROM transactions WHERE id = ? AND user_id = ?").get(req.params.id, req.user.id);
  if (!existing) {
    return res.status(404).json({ message: "Transaction not found." });
  }

  const { title, amount, type, category, date, notes } = req.body;
  const now = new Date().toISOString();

  db.prepare(`
    UPDATE transactions
    SET title = ?, amount = ?, type = ?, category = ?, date = ?, notes = ?, updated_at = ?
    WHERE id = ? AND user_id = ?
  `).run(title.trim(), Number(amount), type, category.trim(), date, (notes || "").trim(), now, req.params.id, req.user.id);

  const row = db.prepare("SELECT * FROM transactions WHERE id = ? AND user_id = ?").get(req.params.id, req.user.id);
  res.json({ transaction: mapRow(row), message: "Transaction updated successfully." });
}

function deleteTransaction(req, res) {
  const result = db.prepare("DELETE FROM transactions WHERE id = ? AND user_id = ?").run(req.params.id, req.user.id);
  if (!result.changes) {
    return res.status(404).json({ message: "Transaction not found." });
  }
  res.json({ message: "Transaction deleted successfully." });
}

module.exports = {
  listTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction
};
