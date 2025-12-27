import express from "express";
import {
  toggleWatchList,
  trade,
} from "../controllers/stockActionController.js";
import { verifyToken } from "../middleware/verifyToken.js";
const router = express.Router();

router.post("/watchlist", verifyToken, toggleWatchList);
router.post("/trade", verifyToken, trade);

export default router;
