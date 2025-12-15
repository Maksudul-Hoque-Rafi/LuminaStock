import { getStockList } from "../services/stockService.js";

export const fetchStock = async (req, res) => {
  try {
    const stocksData = await getStockList();
    res.status(200).json(stocksData);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch stock data" });
  }
};
