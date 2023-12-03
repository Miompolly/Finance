import express from "express";
import KPI from "../models/KPI"; 
const KpiRoutes = express.Router();

KpiRoutes.get("/kpis", async (req, res) => {
  try {
    const kpis = await KPI.find();
    res.status(200).json(kpis);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export default KpiRoutes;
