import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import protect from "./middleware/auth.middleware.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Gradious Used Goods API Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use("/api/auth", authRoutes);

app.get("/api/test/protected", protect, (req, res) => {
  res.json({
    message: "You are authorized",
    user: req.user,
  });
});

app.use("/api/products", productRoutes);
