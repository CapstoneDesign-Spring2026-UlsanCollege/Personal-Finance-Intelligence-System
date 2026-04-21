const { getDB, saveDB } = require("../config/db");

function mapRow(row) {
  return {
    id: row[0],
    userId: row[1],
    title: row[2],
    amount: row[3],
    type: row[4],
    category: row[5],
    date: row[6],
    notes: row[7] || "",
    createdAt: row[8],
    updatedAt: row[9]
  };
}

function listTransactions(req, res) {
  try {
    const db = getDB();
    const rows = db.exec(`SELECT * FROM transactions WHERE user_id = ${req.user.id} ORDER BY date DESC, id DESC`);
    
    if (!rows.length) {
      return res.json({ transactions: [] });
    }
    
    const cols = rows[0].columns;
    const transactions = rows[0].values.map(row => {
      const obj = {};
      cols.forEach((col, i) => obj[col] = row[i]);
      return obj;
    });
    
    res.json({ transactions });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch transactions." });
  }
}

function createTransaction(req, res) {
  try {
    const db = getDB();
    const { title, amount, type, category, date, notes } = req.body;
    const now = new Date().toISOString();

    db.run(`INSERT INTO transactions (user_id, title, amount, type, category, date, notes, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [req.user.id, title.trim(), amount, type, category.trim(), date, notes || "", now, now]);
    
    saveDB();

    const result = db.exec("SELECT last_insert_rowid() as id");
    const id = result[0].values[0][0];
    
    const row = db.exec(`SELECT * FROM transactions WHERE id = ${id}`);
    res.status(201).json({ transaction: mapRow(row[0].values[0]), message: "Transaction added successfully." });
  } catch (err) {
    res.status(500).json({ message: "Failed to create transaction." });
  }
}

function updateTransaction(req, res) {
  try {
    const db = getDB();
    const { title, amount, type, category, date, notes } = req.body;
    const now = new Date().toISOString();

    db.run(`UPDATE transactions SET title = ?, amount = ?, type = ?, category = ?, date = ?, notes = ?, updated_at = ? WHERE id = ? AND user_id = ?`,
      [title.trim(), amount, type, category.trim(), date, notes || "", now, req.params.id, req.user.id]);
    
    saveDB();

    const row = db.exec(`SELECT * FROM transactions WHERE id = ${req.params.id} AND user_id = ${req.user.id}`);
    if (!row.length || !row[0].values.length) {
      return res.status(404).json({ message: "Transaction not found." });
    }
    
    res.json({ transaction: mapRow(row[0].values[0]), message: "Transaction updated successfully." });
  } catch (err) {
    res.status(500).json({ message: "Failed to update transaction." });
  }
}

function deleteTransaction(req, res) {
  try {
    const db = getDB();
    db.run(`DELETE FROM transactions WHERE id = ${req.params.id} AND user_id = ${req.user.id}`);
    saveDB();
    res.json({ message: "Transaction deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete transaction." });
  }
}

module.exports = { listTransactions, createTransaction, updateTransaction, deleteTransaction };