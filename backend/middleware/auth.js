const jwt = require("jsonwebtoken");
const { getDB } = require("../config/db");

const JWT_SECRET = process.env.JWT_SECRET || "change_this_to_a_long_random_secret";

function protect(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: "Authentication required." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const db = getDB();
    
    if (!db) {
      return res.status(500).json({ message: "Database not ready." });
    }
    
    const userData = db.exec(`SELECT * FROM users WHERE id = ${decoded.id}`);
    if (!userData.length || !userData[0].values.length) {
      return res.status(401).json({ message: "User not found." });
    }

    const user = userData[0].values[0];
    req.user = {
      id: user[0],
      name: user[1],
      email: user[2],
      currency: user[4],
      monthly_income_goal: user[5]
    };
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
}

module.exports = { protect };