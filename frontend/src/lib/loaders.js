import apiRequest from "./apiRequest";

export const priceHistoryLoader = async ({ params }) => {
  const res = await apiRequest.get("/stocks/history/" + params.ticker);
  return res.data;
};

export const stockInfoLoader = async () => {
  const res = await apiRequest.get("/stocks");
  return res.data;
};
