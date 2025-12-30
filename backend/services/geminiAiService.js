import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey });
const geminiModel = "gemini-2.5-flash-lite";

export const getAIStockAnalysis = async (stock) => {
  if (!apiKey) return "AI Insights unavailable (API Key missing).";

  try {
    const prompt = `
      Act as a senior financial analyst. Provide a brief, bulleted analysis (max 150 words) for ${stock.name} (${stock.symbol}).
      
      Current Data:
      Price: $${stock.price}
      Market Cap: ${stock.marketCap}
      Sector: ${stock.sector}
      
      Focus on potential growth drivers and risks based on general market knowledge for this sector and company type.
      Do not give financial advice. Keep it objective.
    `;

    const response = await ai.models.generateContent({
      model: geminiModel,
      contents: prompt,
    });

    return response.text || "Analysis currently unavailable.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Unable to generate analysis at this time.";
  }
};

export const getAILearningContent = async (topic) => {
  if (!apiKey) return "Learning content unavailable (API Key missing).";

  try {
    const prompt = `
      Explain the stock market concept "${topic}" to a beginner investor.
      Keep it simple, engaging, and under 200 words. Use an analogy if helpful.
      Format with markdown.
    `;

    const response = await ai.models.generateContent({
      model: geminiModel,
      contents: prompt,
    });

    return response.text || "Content unavailable.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Unable to fetch content.";
  }
};

const parseNewsResponse = (text) => {
  if (!text) return [];

  const articles = [];
  // Split by our defined separator
  const parts = text.split("START_ARTICLE");

  for (const part of parts) {
    if (!part.includes("END_ARTICLE")) continue;

    const titleMatch = part.match(/TITLE:\s*(.+)/);
    const sourceMatch = part.match(/SOURCE:\s*(.+)/);
    const timeMatch = part.match(/TIME:\s*(.+)/);
    const summaryMatch = part.match(/SUMMARY:\s*(.+)/);
    const urlMatch = part.match(/URL:\s*(.+)/);

    if (titleMatch) {
      articles.push({
        title: titleMatch[1].trim(),
        source: sourceMatch ? sourceMatch[1].trim() : "News",
        time: timeMatch ? timeMatch[1].trim() : "Today",
        summary: summaryMatch ? summaryMatch[1].trim() : "",
        url: urlMatch ? urlMatch[1].trim() : undefined,
      });
    }
  }
  return articles;
};

export const getAIMarketNewsSummary = async () => {
  if (!apiKey) return [];

  try {
    const prompt = `
      Find 4 latest trending financial news headlines today (US Markets).
      Format the output strictly as follows for each article (do not use markdown formatting like ** or []):
      
      START_ARTICLE
      TITLE: <Insert Title Here>
      SOURCE: <Insert Source Name Here>
      TIME: <Insert Relative Time, e.g. 2h ago>
      SUMMARY: <Insert 1 sentence summary here>
      URL: <Insert direct link to the article here>
      END_ARTICLE
    `;

    const response = await ai.models.generateContent({
      model: geminiModel,
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        // Note: responseMimeType is NOT allowed with googleSearch
      },
    });

    return parseNewsResponse(response.text);
  } catch (error) {
    console.error("Gemini Error:", error);
    return [];
  }
};

export const getAIStockNews = async (symbol) => {
  if (!apiKey) return [];

  try {
    const prompt = `
     Find 3 latest news stories specifically for ${symbol}.
     Format the output strictly as follows for each article (do not use markdown formatting):
     
     START_ARTICLE
     TITLE: <Insert Title Here>
     SOURCE: <Insert Source Name Here>
     TIME: <Insert Relative Time, e.g. 5h ago>
     SUMMARY: <Insert 1 sentence summary here>
     URL: <Insert direct link to the article here>
     END_ARTICLE
   `;

    const response = await ai.models.generateContent({
      model: geminiModel,
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    return parseNewsResponse(response.text);
  } catch (error) {
    console.error("Gemini Error:", error);
    return [];
  }
};
