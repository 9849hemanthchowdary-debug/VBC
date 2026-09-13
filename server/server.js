const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const contactRoutes = require("./routes/contactRoutes");

const app = express();

// Middleware
app.use(cors());

// IMPORTANT
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/contact", contactRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "VBC Bricks API is running" });
});

// Home
app.get("/", (req, res) => {
  res.json({
    message: "VBC Bricks Backend is Running"
  });
});

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
