import express from "express";
import dotenv from "dotenv";
import stockRoutes from "./routes/stockRoutes.js";

dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("Hello from Backend");
});

app.use("/api/stocks", stockRoutes);

app.listen(8000, () => {
  console.log("Server is running at 8000");
});
