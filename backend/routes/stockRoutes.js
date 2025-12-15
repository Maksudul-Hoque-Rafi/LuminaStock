import express from "express";
import {
  fetchStock,
  fetchPriceHistory,
} from "../controllers/stockController.js";

const router = express.Router();

router.get("/", fetchStock);
router.get("/history/:symbol", fetchPriceHistory);

export default router;
