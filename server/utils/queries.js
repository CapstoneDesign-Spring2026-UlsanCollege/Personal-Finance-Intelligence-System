function getDashboardSummary(db, userId) {
  const totals = db.prepare(`
    SELECT
      COALESCE(SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END), 0) AS totalIncome,
      COALESCE(SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END), 0) AS totalExpense
    FROM transactions
    WHERE user_id = ?
  `).get(userId);

  const balance = Number(totals.totalIncome) - Number(totals.totalExpense);

  const budgetTotals = db.prepare(`
    SELECT
      COALESCE(SUM(amount), 0) AS totalBudget
    FROM budgets
    WHERE user_id = ?
  `).get(userId);

  const spentAgainstBudgets = db.prepare(`
    SELECT
      COALESCE(SUM(t.amount), 0) AS spent
    FROM transactions t
    JOIN budgets b
      ON b.user_id = t.user_id
      AND b.category = t.category
    WHERE t.user_id = ?
      AND t.type = 'expense'
  `).get(userId);

  return {
    totalIncome: Number(totals.totalIncome),
    totalExpense: Number(totals.totalExpense),
    balance,
    totalBudget: Number(budgetTotals.totalBudget),
    spentAgainstBudgets: Number(spentAgainstBudgets.spent)
  };
}

function getMonthlyBreakdown(db, userId) {
  return db.prepare(`
    SELECT
      strftime('%Y-%m', date) AS month,
      ROUND(COALESCE(SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END), 0), 2) AS income,
      ROUND(COALESCE(SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END), 0), 2) AS expense
    FROM transactions
    WHERE user_id = ?
    GROUP BY strftime('%Y-%m', date)
    ORDER BY month ASC
  `).all(userId);
}

function getCategoryBreakdown(db, userId) {
  return db.prepare(`
    SELECT
      category AS name,
      ROUND(COALESCE(SUM(amount), 0), 2) AS value
    FROM transactions
    WHERE user_id = ?
      AND type = 'expense'
    GROUP BY category
    ORDER BY value DESC
  `).all(userId);
}

module.exports = {
  getDashboardSummary,
  getMonthlyBreakdown,
  getCategoryBreakdown
};
