import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.FINNHUB_API_KEY;
const BASE_URL = "https://finnhub.io/api/v1";

export const getStock = async (ticker) => {
  try {
    const [quoteRes, profileRes] = await Promise.all([
      axios.get(`${BASE_URL}/quote`, {
        params: { symbol: ticker, token: API_KEY },
      }),
      axios.get(`${BASE_URL}/stock/profile2`, {
        params: { symbol: ticker, token: API_KEY },
      }),
    ]);

    const quote = quoteRes.data;
    const profile = profileRes.data;

    // Finnhub returns empty objects for invalid symbols
    if (!quote || quote.c === undefined || !profile || !profile.name) {
      throw new Error("Invalid ticker or empty data from Finnhub");
    }

    return {
      symbol: ticker,
      name: profile.name,
      price: quote.c,
      change: quote.d,
      changePercent: quote.dp,
      marketCap: profile.marketCapitalization + "B",
      sector: profile.finnhubIndustry,
    };
  } catch (error) {
    console.error("getStock error: ", error.message);

    // rethrow so controller can catch it
    throw new Error("Failed to fetch stock from Finnhub");
  }
};

// const data = async (symbol) => {
//   try {
//     const stock = await getStock(symbol);
//     console.log(stock);
//   } catch (err) {
//     console.error(err);
//   }
// };

// data("AAPL");
