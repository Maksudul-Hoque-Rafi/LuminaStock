import express from "express";
import {
  learningContent,
  marketNews,
  stockAnalysis,
  stockNews,
} from "../controllers/geminiAiController.js";
const router = express.Router();

router.post("/stock-analysis", stockAnalysis);
router.post("/learning-content", learningContent);
router.get("/market-news", marketNews);
router.post("/stock-news", stockNews);

export default router;
