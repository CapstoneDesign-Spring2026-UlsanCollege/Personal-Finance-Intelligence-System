const { getDB, saveDB } = require("../config/db");

function getProfile(req, res) {
  res.json({ user: req.user });
}

function updateProfile(req, res) {
  try {
    const db = getDB();
    const { name, currency, monthlyIncomeGoal } = req.body;
    const now = new Date().toISOString();

    db.run(`UPDATE users SET name = ?, currency = ?, monthly_income_goal = ?, updated_at = ? WHERE id = ?`,
      [name.trim(), currency.trim().toUpperCase(), Number(monthlyIncomeGoal || 0), now, req.user.id]);
    
    saveDB();

    const row = db.exec(`SELECT * FROM users WHERE id = ${req.user.id}`);
    res.json({ user: { name, currency, monthlyIncomeGoal }, message: "Profile updated successfully." });
  } catch (err) {
    res.status(500).json({ message: "Failed to update profile." });
  }
}

function getSettings(req, res) {
  res.json({ settings: { emailNotifications: true, monthlyReports: true, twoFactorEnabled: false } });
}

function updateSettings(req, res) {
  res.json({ message: "Settings saved.", settings: req.body });
}

module.exports = { getProfile, updateProfile, getSettings, updateSettings };