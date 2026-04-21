const path = require("path");
const fs = require("fs");
const bcrypt = require("bcryptjs");
require("dotenv").config({ path: path.resolve(process.cwd(), ".env") });

const db = require("../config/db");

const dataDir = path.dirname(path.resolve(process.cwd(), process.env.DB_PATH || "./data/budgetbrain.db"));
fs.mkdirSync(dataDir, { recursive: true });

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    currency TEXT NOT NULL DEFAULT 'USD',
    monthly_income_goal REAL NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS user_settings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL UNIQUE,
    email_notifications INTEGER NOT NULL DEFAULT 1,
    monthly_reports INTEGER NOT NULL DEFAULT 1,
    two_factor_enabled INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    amount REAL NOT NULL,
    type TEXT NOT NULL CHECK(type IN ('income', 'expense')),
    category TEXT NOT NULL,
    date TEXT NOT NULL,
    notes TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS budgets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    category TEXT NOT NULL,
    amount REAL NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    UNIQUE(user_id, category),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );
`);

const existingUser = db.prepare("SELECT id FROM users WHERE email = ?").get("demo@budgetbrain.app");

if (!existingUser) {
  const now = new Date().toISOString();
  const passwordHash = bcrypt.hashSync("Password123!", 10);

  const userInsert = db.prepare(`
    INSERT INTO users (name, email, password_hash, currency, monthly_income_goal, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run("Demo User", "demo@budgetbrain.app", passwordHash, "USD", 5000, now, now);

  const userId = userInsert.lastInsertRowid;

  db.prepare(`
    INSERT INTO user_settings (user_id, email_notifications, monthly_reports, two_factor_enabled)
    VALUES (?, 1, 1, 0)
  `).run(userId);

  const transactionStmt = db.prepare(`
    INSERT INTO transactions (user_id, title, amount, type, category, date, notes, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const transactions = [
    ["Salary", 4200, "income", "Salary", "2026-04-01", "Monthly salary"],
    ["Freelance Design", 780, "income", "Side Hustle", "2026-04-09", "Client project"],
    ["Rent", 1200, "expense", "Housing", "2026-04-03", "Apartment rent"],
    ["Groceries", 210, "expense", "Food", "2026-04-04", "Weekly shopping"],
    ["Transport", 95, "expense", "Transport", "2026-04-08", "Taxi and bus"],
    ["Streaming", 22, "expense", "Entertainment", "2026-04-11", "Monthly subscription"]
  ];

  transactions.forEach((item) => {
    transactionStmt.run(userId, item[0], item[1], item[2], item[3], item[4], item[5], now, now);
  });

  const budgetStmt = db.prepare(`
    INSERT INTO budgets (user_id, category, amount, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?)
  `);

  [
    ["Housing", 1400],
    ["Food", 500],
    ["Transport", 220],
    ["Entertainment", 250]
  ].forEach((item) => {
    budgetStmt.run(userId, item[0], item[1], now, now);
  });
}

console.log("Database initialized successfully.");
