const db = require("../config/db");

function mapBudget(row) {
  return {
    id: row.id,
    category: row.category,
    amount: Number(row.amount),
    spent: Number(row.spent || 0),
    remaining: Number(row.amount) - Number(row.spent || 0),
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

function listBudgets(req, res) {
  const rows = db.prepare(`
    SELECT
      b.*,
      COALESCE((
        SELECT SUM(t.amount)
        FROM transactions t
        WHERE t.user_id = b.user_id
          AND t.category = b.category
          AND t.type = 'expense'
      ), 0) AS spent
    FROM budgets b
    WHERE b.user_id = ?
    ORDER BY b.category ASC
  `).all(req.user.id);

  res.json({ budgets: rows.map(mapBudget) });
}

function createBudget(req, res) {
  const { category, amount } = req.body;
  const existing = db.prepare("SELECT id FROM budgets WHERE user_id = ? AND category = ?").get(req.user.id, category.trim());

  if (existing) {
    return res.status(409).json({ message: "A budget for this category already exists." });
  }

  const now = new Date().toISOString();
  const result = db.prepare(`
    INSERT INTO budgets (user_id, category, amount, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?)
  `).run(req.user.id, category.trim(), Number(amount), now, now);

  const row = db.prepare(`
    SELECT b.*, 0 AS spent
    FROM budgets b
    WHERE b.id = ?
  `).get(result.lastInsertRowid);

  res.status(201).json({ budget: mapBudget(row), message: "Budget created successfully." });
}

function updateBudget(req, res) {
  const existing = db.prepare("SELECT id FROM budgets WHERE id = ? AND user_id = ?").get(req.params.id, req.user.id);
  if (!existing) {
    return res.status(404).json({ message: "Budget not found." });
  }

  const { category, amount } = req.body;
  const duplicate = db.prepare("SELECT id FROM budgets WHERE user_id = ? AND category = ? AND id != ?").get(req.user.id, category.trim(), req.params.id);
  if (duplicate) {
    return res.status(409).json({ message: "Another budget already uses this category." });
  }

  const now = new Date().toISOString();
  db.prepare(`
    UPDATE budgets
    SET category = ?, amount = ?, updated_at = ?
    WHERE id = ? AND user_id = ?
  `).run(category.trim(), Number(amount), now, req.params.id, req.user.id);

  const row = db.prepare(`
    SELECT
      b.*,
      COALESCE((
        SELECT SUM(t.amount)
        FROM transactions t
        WHERE t.user_id = b.user_id
          AND t.category = b.category
          AND t.type = 'expense'
      ), 0) AS spent
    FROM budgets b
    WHERE b.id = ? AND b.user_id = ?
  `).get(req.params.id, req.user.id);

  res.json({ budget: mapBudget(row), message: "Budget updated successfully." });
}

function deleteBudget(req, res) {
  const result = db.prepare("DELETE FROM budgets WHERE id = ? AND user_id = ?").run(req.params.id, req.user.id);
  if (!result.changes) {
    return res.status(404).json({ message: "Budget not found." });
  }
  res.json({ message: "Budget deleted successfully." });
}

module.exports = {
  listBudgets,
  createBudget,
  updateBudget,
  deleteBudget
};
