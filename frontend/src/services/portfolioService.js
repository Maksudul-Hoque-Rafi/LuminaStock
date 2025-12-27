import apiRequest from "../lib/apiRequest";

const STORAGE_KEY = "portfolio";
const CASH_KEY = "user_cash_balance";
const INITIAL_CASH = 10000;

export const getPortfolio = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
};

export const savePortfolio = (portfolio) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(portfolio));
};

export const getCashBalance = () => {
  const stored = localStorage.getItem(CASH_KEY);
  return stored ? parseFloat(stored) : INITIAL_CASH;
};

export const updateCashBalance = (amount) => {
  localStorage.setItem(CASH_KEY, amount.toString());
};

export const executeTrade = async (symbol, quantity, price, type) => {
  try {
    const response = await apiRequest.post("/stock-action/trade", {
      type,
      quantity,
      symbol,
      price,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getHolding = (symbol) => {
  const portfolio = getPortfolio();
  return portfolio.find((p) => p.symbol === symbol);
};
