import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/products'.)

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
