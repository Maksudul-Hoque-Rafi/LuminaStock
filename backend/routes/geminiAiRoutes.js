import express from "express";
import { stockAnalysis } from "../controllers/geminiAiController.js";
const router = express.Router();

router.post("/stock-analysis", stockAnalysis);

export default router;
