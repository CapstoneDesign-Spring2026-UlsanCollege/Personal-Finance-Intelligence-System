const db = require("../config/db");

function getProfile(req, res) {
  res.json({ user: req.user });
}

function updateProfile(req, res) {
  const { name, currency, monthlyIncomeGoal } = req.body;
  const now = new Date().toISOString();

  db.prepare(`
    UPDATE users
    SET name = ?, currency = ?, monthly_income_goal = ?, updated_at = ?
    WHERE id = ?
  `).run(
    name.trim(),
    currency.trim().toUpperCase(),
    Number(monthlyIncomeGoal || 0),
    now,
    req.user.id
  );

  const updated = db.prepare(`
    SELECT id, name, email, currency, monthly_income_goal, created_at, updated_at
    FROM users
    WHERE id = ?
  `).get(req.user.id);

  res.json({
    user: {
      id: updated.id,
      name: updated.name,
      email: updated.email,
      currency: updated.currency,
      monthlyIncomeGoal: updated.monthly_income_goal,
      createdAt: updated.created_at,
      updatedAt: updated.updated_at
    },
    message: "Profile updated successfully."
  });
}

function getSettings(req, res) {
  const settings = db.prepare(`
    SELECT email_notifications, monthly_reports, two_factor_enabled
    FROM user_settings
    WHERE user_id = ?
  `).get(req.user.id);

  res.json({
    settings: {
      emailNotifications: Boolean(settings?.email_notifications),
      monthlyReports: Boolean(settings?.monthly_reports),
      twoFactorEnabled: Boolean(settings?.two_factor_enabled)
    }
  });
}

function updateSettings(req, res) {
  const { emailNotifications, monthlyReports, twoFactorEnabled } = req.body;

  db.prepare(`
    UPDATE user_settings
    SET email_notifications = ?, monthly_reports = ?, two_factor_enabled = ?
    WHERE user_id = ?
  `).run(
    emailNotifications ? 1 : 0,
    monthlyReports ? 1 : 0,
    twoFactorEnabled ? 1 : 0,
    req.user.id
  );

  res.json({
    message: "Settings updated successfully.",
    settings: {
      emailNotifications: Boolean(emailNotifications),
      monthlyReports: Boolean(monthlyReports),
      twoFactorEnabled: Boolean(twoFactorEnabled)
    }
  });
}

module.exports = {
  getProfile,
  updateProfile,
  getSettings,
  updateSettings
};
