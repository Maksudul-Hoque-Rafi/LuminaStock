import express from "express";
import { toggleWatchList } from "../controllers/stockActionController.js";
const router = express.Router();

router.post("/watchlist", toggleWatchList);
// router.post("/trade", login);

export default router;
