import { executeTrade, getCashBalance } from "../services/portfolioService";

export const useStockAction = (
  ticker,
  stock,
  inWatchlist,
  setInWatchlist,
  setIsTradeModalOpen,
  setCashBalance
) => {
  const toggleWatchlist = () => {
    if (!ticker) return;
    const current = JSON.parse(localStorage.getItem("watchlist") || "[]");
    let updated;
    if (inWatchlist) {
      updated = current.filter((t) => t !== ticker.toUpperCase());
    } else {
      updated = [...current, ticker.toUpperCase()];
    }
    localStorage.setItem("watchlist", JSON.stringify(updated));
    setInWatchlist(!inWatchlist);
  };

  const handleTrade = (type, quantity) => {
    if (!stock) return;
    try {
      executeTrade(stock.symbol, quantity, stock.price, type);
      setIsTradeModalOpen(false);
      setCashBalance(getCashBalance()); // Refresh cash
      alert(
        `Successfully ${
          type === "buy" ? "bought" : "sold"
        } ${quantity} shares of ${stock.symbol}`
      );
    } catch (e) {
      alert(e.message);
    }
  };

  return { toggleWatchlist, handleTrade };
};
