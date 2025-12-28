export const getStock = (stocksList, ticker) => {
  return stocksList.find((s) => s.symbol === ticker);
};

export const formatMarketCap = (valueInMillions) => {
  if (typeof valueInMillions === "string") {
    return valueInMillions;
  }

  const units = ["M", "B", "T"];
  let unitIndex = 0;
  let value = valueInMillions;

  while (value >= 1000 && unitIndex < units.length - 1) {
    value /= 1000;
    unitIndex++;
  }

  return `${value.toFixed(2)} ${units[unitIndex]}`;
};
