const db = require("../config/db");
const { getDashboardSummary, getMonthlyBreakdown, getCategoryBreakdown } = require("../utils/queries");

function getDashboard(req, res) {
  res.json({
    summary: getDashboardSummary(db, req.user.id),
    monthly: getMonthlyBreakdown(db, req.user.id),
    categories: getCategoryBreakdown(db, req.user.id)
  });
}

module.exports = { getDashboard };
