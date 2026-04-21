const { getDB } = require("../config/db");

function getDashboard(req, res) {
  try {
    const db = getDB();
    const userId = req.user.id;
    
    const incomeData = db.exec(`SELECT COALESCE(SUM(amount), 0) as total FROM transactions WHERE user_id = ${userId} AND type = 'income'`);
    const totalIncome = incomeData[0]?.values[0][0] || 0;
    
    const expenseData = db.exec(`SELECT COALESCE(SUM(amount), 0) as total FROM transactions WHERE user_id = ${userId} AND type = 'expense'`);
    const totalExpenses = expenseData[0]?.values[0][0] || 0;
    
    const categoryData = db.exec(`SELECT category, SUM(amount) as total FROM transactions WHERE user_id = ${userId} AND type = 'expense' GROUP BY category`);
    
    const categories = categoryData.length ? categoryData[0].values.map(row => ({
      category: row[0],
      amount: row[1]
    })) : [];
    
    res.json({
      summary: {
        totalIncome: totalIncome,
        totalExpenses: totalExpenses,
        balance: totalIncome - totalExpenses
      },
      monthly: [],
      categories
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch dashboard." });
  }
}

module.exports = { getDashboard };