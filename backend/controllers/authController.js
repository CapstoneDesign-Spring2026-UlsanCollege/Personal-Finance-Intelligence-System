const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getDB, saveDB } = require("../config/db");

const JWT_SECRET = process.env.JWT_SECRET || "change_this_to_a_long_random_secret";

function signToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "7d" });
}

function sanitizeUser(row) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    currency: row.currency || "USD",
    monthlyIncomeGoal: row.monthly_income_goal || 0,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

async function register(req, res) {
  try {
    const db = getDB();
    const { name, email, password } = req.body;
    
    const existing = db.exec(`SELECT id FROM users WHERE email = '${email.toLowerCase()}'`);
    if (existing.length > 0 && existing[0].values.length > 0) {
      return res.status(409).json({ message: "An account with this email already exists." });
    }

    const passwordHash = bcrypt.hashSync(password, 10);
    const now = new Date().toISOString();

    db.run(`INSERT INTO users (name, email, password_hash, currency, monthly_income_goal, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)`, 
      [name.trim(), email.toLowerCase().trim(), passwordHash, "USD", 0, now, now]);
    
    saveDB();

    const result = db.exec("SELECT last_insert_rowid() as id");
    const userId = result[0].values[0][0];
    
    const userRow = db.exec(`SELECT * FROM users WHERE id = ${userId}`);

    res.status(201).json({
      user: sanitizeUser(userRow[0]?.values[0]),
      token: signToken({ id: userId, email: email.toLowerCase() })
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Unable to create account." });
  }
}

async function login(req, res) {
  try {
    const db = getDB();
    const { email, password } = req.body;
    
    const userData = db.exec(`SELECT * FROM users WHERE email = '${email.toLowerCase()}'`);
    if (!userData.length || !userData[0].values.length) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const user = userData[0].values[0];
    const passwordHash = user[3];
    
    const valid = bcrypt.compareSync(password, passwordHash);
    if (!valid) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    res.json({
      user: sanitizeUser(user),
      token: signToken({ id: user[0], email: user[2] })
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Login failed." });
  }
}

module.exports = { register, login };