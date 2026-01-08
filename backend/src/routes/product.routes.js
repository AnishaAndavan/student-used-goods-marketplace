import express from "express";
import protect from "../middleware/auth.middleware.js";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  getMyProducts,
  buyProduct
} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/mine", protect, getMyProducts);
router.get("/:id", getProductById);
router.post("/", protect, createProduct);
router.put("/:id", protect, updateProduct);
router.post("/:id/buy", protect, buyProduct);


export default router;
