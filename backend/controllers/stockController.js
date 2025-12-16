import { getStockList, priceHistory } from "../services/stockService.js";

export const fetchStock = async (req, res) => {
  try {
    const stocksData = await getStockList();
    res.status(200).json(stocksData);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch stock data" });
  }
};

export const fetchPriceHistory = async (req, res) => {
  try {
    const stocksHistory = await priceHistory(req.params.symbol);
    res.status(200).json(stocksHistory);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch stock history data" });
  }
};
