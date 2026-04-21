const bcrypt = require("bcryptjs");
const db = require("../config/db");
const { signToken } = require("../utils/token");

function sanitizeUser(row) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    currency: row.currency,
    monthlyIncomeGoal: row.monthly_income_goal,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

function register(req, res) {
  const { name, email, password } = req.body;
  const existing = db.prepare("SELECT id FROM users WHERE email = ?").get(email);

  if (existing) {
    return res.status(409).json({ message: "An account with this email already exists." });
  }

  const passwordHash = bcrypt.hashSync(password, 10);
  const now = new Date().toISOString();

  const stmt = db.prepare(`
    INSERT INTO users (name, email, password_hash, currency, monthly_income_goal, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const result = stmt.run(name.trim(), email.toLowerCase().trim(), passwordHash, "USD", 0, now, now);

  const user = db.prepare(`
    SELECT id, name, email, currency, monthly_income_goal, created_at, updated_at
    FROM users
    WHERE id = ?
  `).get(result.lastInsertRowid);

  res.status(201).json({
    user: sanitizeUser(user),
    token: signToken(user)
  });
}

function login(req, res) {
  const { email, password } = req.body;
  const userWithHash = db.prepare(`
    SELECT *
    FROM users
    WHERE email = ?
  `).get(email.toLowerCase().trim());

  if (!userWithHash) {
    return res.status(401).json({ message: "Invalid email or password." });
  }

  const valid = bcrypt.compareSync(password, userWithHash.password_hash);
  if (!valid) {
    return res.status(401).json({ message: "Invalid email or password." });
  }

  res.json({
    user: sanitizeUser(userWithHash),
    token: signToken(userWithHash)
  });
}

module.exports = {
  register,
  login
};
