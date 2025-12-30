import apiRequest from "../lib/apiRequest";
import { formatMarketCap } from "../lib/stockInfo";

export const getAIStockAnalysis = async (stock) => {
  try {
    const response = await apiRequest.post("/gemini-ai/stock-analysis", {
      ...stock,
      marketCap: formatMarketCap(stock.marketCap),
    });
    return response.data;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Unable to generate analysis at this time.";
  }
};

export const getAILearningContent = async (topic) => {
  try {
    const response = await apiRequest.post("/gemini-ai/learning-content", {
      topic,
    });
    return response.data;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Unable to fetch content.";
  }
};

export const getAIMarketNewsSummary = async () => {
  try {
    const response = await apiRequest.get("/gemini-ai/market-news");
    return response.data;
  } catch (error) {
    console.error("Gemini Error:", error);
    return [];
  }
};

export const getAIStockNews = async (symbol) => {
  try {
    const response = await apiRequest.post("/gemini-ai/stock-news", { symbol });
    return response.data;
  } catch (error) {
    console.error("Gemini Error:", error);
    return [];
  }
};
