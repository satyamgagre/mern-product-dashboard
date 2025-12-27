import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Product from './models/product.model.js';

dotenv.config();

const app = express();

app.use(express.json()); // allow to accept JSON data in request body

  app.get('/api/products', async (req, res) => {
    try {
      const products = await Product.find({});
      res.status(200).json({success: true, data : products});
    } catch (error) {
      console.log("Error in Get Products:", error.message);
      res.status(500).json({success: false, message: "Failed to fetch products."});
    }
  });

app.post('/api/products', async (req, res) => {
  const product = req.body; // user will send product data in request body

  if (!product.name|| !product.price || !product.description || !product.imageUrl) {
    return res.status(400).json({success: false, message: "All product fields are required."});
  }

  const newProduct = new Product(product)

  try {
    await newProduct.save();
    res.status(201).json({success: true, data : newProduct});
  } catch (error) {
    console.log("Error in Create Product:", error.message);
    res.status(500).json({success: false, message: "Failed to create product."});  
  }

});

  app.delete('/api/products/:id', async (req, res) => {
    const {id} = req.params;
    try {
      await Product.findByIdAndDelete(id);
      res.status(200).json({success: true, message: "Product deleted successfully."});
    } catch (error) {
      console.log("Error in Delete Product:", error.message);
      res.status(500).json({success: false, message: "Product not found."});
    }
  });

const PORT = process.env.PORT || 5000;
// Connect DB → then start server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect DB:", error);
    process.exit(1);
  });
