import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
  try {
    const { title, description, price, category, image } = req.body;

    if (!title || !description || !price || !category) {
      return res.status(400).json({
        message: "All required fields must be filled",
      });
    }

    const product = await Product.create({
      title,
      description,
      price,
      category,
      image,
      seller: req.user._id, // from JWT middleware
    });

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({ status: "available" })
      .populate("seller", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "seller",
      "name email"
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // 🔐 OWNERSHIP CHECK
    if (product.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You are not allowed to update this product",
      });
    }

    const { title, description, price, category, image, status } = req.body;

    product.title = title || product.title;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;
    product.image = image || product.image;
    product.status = status || product.status;

    const updatedProduct = await product.save();

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // 🔐 OWNERSHIP CHECK
    if (product.seller.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You are not allowed to delete this product",
      });
    }

    await product.deleteOne();

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const buyProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.status === "sold") {
      return res.status(400).json({ message: "Product already sold" });
    }

    // ❌ seller cannot buy own product
    if (product.seller.toString() === req.user._id.toString()) {
      return res.status(400).json({
        message: "You cannot buy your own product",
      });
    }

    product.status = "sold";
    product.buyer = req.user._id;

    await product.save();

    res.json({ message: "Product purchased successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getMyProducts = async (req, res) => {
  const products = await Product.find({ seller: req.user._id });
  res.json(products);
};
