const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5000;

// test
app.get("/", (req, res) => {
  res.send("Backend Running 🚀");
});

// login
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "admin@gmail.com" && password === "1234") {
    return res.json({
      success: true,
      token: "12345"
    });
  }

  res.json({ success: false });
});

// transaction
app.post("/transaction", (req, res) => {
  const { amount, category } = req.body;

  res.json({
    message: "Transaction added",
    amount,
    category
  });
});

app.listen(PORT, () => {
  console.log("Server running on http://localhost:5000");
});