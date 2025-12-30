import {
  getAILearningContent,
  getAIMarketNewsSummary,
  getAIStockAnalysis,
  getAIStockNews,
} from "../services/geminiAiService.js";

export const stockAnalysis = async (req, res) => {
  try {
    const analysis = await getAIStockAnalysis(req.body);
    res.status(200).json(analysis);
  } catch (error) {
    console.error("error is ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const learningContent = async (req, res) => {
  try {
    const result = await getAILearningContent(req.body.topic);
    res.status(200).json(result);
  } catch (error) {
    console.error("error is ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const marketNews = async (req, res) => {
  try {
    const result = await getAIMarketNewsSummary();
    res.status(200).json(result);
  } catch (error) {
    console.error("error is ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const stockNews = async (req, res) => {
  try {
    const news = await getAIStockNews(req.body.symbol);
    res.status(200).json(news);
  } catch (error) {
    console.error("error is ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
