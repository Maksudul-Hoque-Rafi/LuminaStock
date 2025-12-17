export const getStock = (stocksList, ticker) => {
  return stocksList.find((s) => s.symbol === ticker);
};
