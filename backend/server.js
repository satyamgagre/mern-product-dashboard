import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDB } from './config/db.js';
import Product from './models/product.model.js';

dotenv.config();

const app = express();
app.use(express.json());

/* ================= GET ALL PRODUCTS ================= */
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error("Error in Get Products:", error.message);
    res.status(500).json({ success: false, message: "Failed to fetch products." });
  }
});

/* ================= CREATE PRODUCT ================= */
app.post('/api/products', async (req, res) => {
  const { name, price, description, imageUrl } = req.body;

  if (!name || !price || !description || !imageUrl) {
    return res.status(400).json({
      success: false,
      message: "All product fields are required."
    });
  }

  try {
    const newProduct = new Product({ name, price, description, imageUrl });
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error in Create Product:", error.message);
    res.status(500).json({ success: false, message: "Failed to create product." });
  }
});

/* ================= UPDATE PRODUCT ================= */
app.put('/api/products/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid product ID." });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: "Product not found." });
    }

    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.error("Error in Update Product:", error.message);
    res.status(500).json({ success: false, message: "Failed to update product." });
  }
});

/* ================= DELETE PRODUCT ================= */
app.delete('/api/products/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid product ID." });
  }

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ success: false, message: "Product not found." });
    }

    res.status(200).json({ success: true, message: "Product deleted successfully." });
  } catch (error) {
    console.error("Error in Delete Product:", error.message);
    res.status(500).json({ success: false, message: "Failed to delete product." });
  }
});

/* ================= SERVER ================= */
const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Failed to connect DB:", error);
    process.exit(1);
  });
