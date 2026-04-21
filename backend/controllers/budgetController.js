const { getDB, saveDB } = require("../config/db");

function mapBudget(row) {
  return {
    id: row[0],
    userId: row[1],
    category: row[2],
    amount: row[3],
    createdAt: row[4],
    updatedAt: row[5]
  };
}

function listBudgets(req, res) {
  try {
    const db = getDB();
    const rows = db.exec(`SELECT * FROM budgets WHERE user_id = ${req.user.id} ORDER BY category ASC`);
    
    if (!rows.length) {
      return res.json({ budgets: [] });
    }
    
    const budgets = rows[0].values.map(row => {
      const category = row[2];
      const amount = row[3];
      
      const spentData = db.exec(`SELECT COALESCE(SUM(amount), 0) as spent FROM transactions WHERE user_id = ${req.user.id} AND category = '${category}' AND type = 'expense'`);
      const spent = spentData[0]?.values[0][0] || 0;
      
      return { 
        id: row[0],
        userId: row[1],
        category: row[2],
        amount: row[3],
        spent: spent,
        remaining: amount - spent,
        createdAt: row[4],
        updatedAt: row[5]
      };
    });
    
    res.json({ budgets });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch budgets." });
  }
}

function createBudget(req, res) {
  try {
    const db = getDB();
    const { category, amount } = req.body;
    
    const existing = db.exec(`SELECT id FROM budgets WHERE user_id = ${req.user.id} AND category = '${category.trim()}'`);
    if (existing.length && existing[0].values.length) {
      return res.status(409).json({ message: "A budget for this category already exists." });
    }

    const now = new Date().toISOString();
    db.run(`INSERT INTO budgets (user_id, category, amount, created_at, updated_at) VALUES (?, ?, ?, ?, ?)`,
      [req.user.id, category.trim(), amount, now, now]);
    
    saveDB();

    const result = db.exec("SELECT last_insert_rowid() as id");
    const id = result[0].values[0][0];
    
    res.status(201).json({ budget: { id, category, amount, spent: 0, remaining: amount }, message: "Budget created successfully." });
  } catch (err) {
    res.status(500).json({ message: "Failed to create budget." });
  }
}

function updateBudget(req, res) {
  try {
    const db = getDB();
    const { category, amount } = req.body;
    const now = new Date().toISOString();

    db.run(`UPDATE budgets SET category = ?, amount = ?, updated_at = ? WHERE id = ? AND user_id = ?`,
      [category.trim(), amount, now, req.params.id, req.user.id]);
    
    saveDB();

    const row = db.exec(`SELECT * FROM budgets WHERE id = ${req.params.id} AND user_id = ${req.user.id}`);
    if (!row.length || !row[0].values.length) {
      return res.status(404).json({ message: "Budget not found." });
    }
    
    res.json({ budget: mapBudget(row[0].values[0]), message: "Budget updated successfully." });
  } catch (err) {
    res.status(500).json({ message: "Failed to update budget." });
  }
}

function deleteBudget(req, res) {
  try {
    const db = getDB();
    db.run(`DELETE FROM budgets WHERE id = ${req.params.id} AND user_id = ${req.user.id}`);
    saveDB();
    res.json({ message: "Budget deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete budget." });
  }
}

module.exports = { listBudgets, createBudget, updateBudget, deleteBudget };