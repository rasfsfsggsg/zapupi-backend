import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const TOKEN_KEY = process.env.TOKEN_KEY;
const SECRET_KEY = process.env.SECRET_KEY;

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
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

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
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


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
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("Server running"));
EOF
