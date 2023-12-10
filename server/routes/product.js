import express from "express";
import Product from "../models/Product.js"; 
const productRoutes = express.Router();

productRoutes.get("/Products", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export default productRoutes;
