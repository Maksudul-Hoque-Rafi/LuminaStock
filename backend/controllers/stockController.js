import { getStock } from "../services/stockService.js";

export const fetchStock = async (req, res) => {
  try {
    const stockData = await getStock(req.params.symbol);
    res.status(200).json(stockData);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch stock data" });
  }
};
