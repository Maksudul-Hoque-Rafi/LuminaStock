import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import stockRoutes from "./routes/stockRoutes.js";
import authRoute from "./routes/authRoutes.js";
import stockActionRoute from "./routes/stockActionRoute.js";
import geminiAiRoute from "./routes/geminiAiRoutes.js";

dotenv.config();

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello from Backend");
});

app.use("/api/stocks", stockRoutes);
app.use("/api/auth", authRoute);
app.use("/api/stock-action", stockActionRoute);
app.use("/api/gemini-ai", geminiAiRoute);

app.listen(8000, () => {
  console.log("Server is running at 8000");
});
