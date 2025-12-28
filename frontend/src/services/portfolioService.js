import apiRequest from "../lib/apiRequest";

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
