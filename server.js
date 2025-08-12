import express from "express";
import fetch from "node-fetch";

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Environment variables
const TOKEN_KEY = process.env.TOKEN_KEY || "your_token_here";
const SECRET_KEY = process.env.SECRET_KEY || "your_secret_here";

// Create Order API
app.post("/create-order", async (req, res) => {
  try {
    const body = new URLSearchParams({
      token_key: TOKEN_KEY,
      secret_key: SECRET_KEY,
      amount: req.body.amount,
      order_id: req.body.order_id,
      custumer_mobile: req.body.custumer_mobile || "",
      redirect_url: req.body.redirect_url || "",
      remark: req.body.remark || "",
    });

    const r = await fetch("https://api.zapupi.com/api/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });

    const data = await r.json();
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Order Status API
app.post("/order-status", async (req, res) => {
  try {
    const body = new URLSearchParams({
      token_key: TOKEN_KEY,
      secret_key: SECRET_KEY,
      order_id: req.body.order_id,
    });

    const r = await fetch("https://api.zapupi.com/api/order-status", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });

    const data = await r.json();
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Root test route
app.get("/", (req, res) => {
  res.send("Server is running ✅");
});

// Start server (only once)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
