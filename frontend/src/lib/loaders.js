import apiRequest from "./apiRequest";

export const stockDetailsLoader = async ({ params }) => {
  const res = await apiRequest.get("/stocks/history/" + params.ticker);
  return res.data;
};
