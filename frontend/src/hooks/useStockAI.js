import { useState } from "react";
import { getAIStockAnalysis, getAIStockNews } from "../services/geminiService";

export const useStockAI = () => {
  const [aiAnalysis, setAiAnalysis] = useState("");
  const [stockNews, setStockNews] = useState([]);
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);
  const [loadingNews, setLoadingNews] = useState(false);

  const fetchStockNews = async (symbol) => {
    setLoadingNews(true);
    try {
      const result = await getAIStockNews(symbol);
      if (result && result.length > 0) {
        setStockNews(result);
      } else {
        // Fallback manual news if search returns empty for demo purposes
        setStockNews([
          {
            title: `${symbol} Market Movement`,
            summary: "Latest trading data shows active volume.",
            source: "MarketWatch",
            time: "Today",
            url: `https://www.google.com/search?q=${symbol}+stock+news`,
          },
        ]);
      }
    } catch {
      setStockNews([]);
    }
    setLoadingNews(false);
  };

  const handleAIAnalysis = async () => {
    setLoadingAnalysis(true);
    const analysis = await getAIStockAnalysis(stock);
    setAiAnalysis(analysis);
    setLoadingAnalysis(false);
  };

  return {
    aiAnalysis,
    stockNews,
    loadingAnalysis,
    loadingNews,
    fetchStockNews,
    handleAIAnalysis,
  };
};
