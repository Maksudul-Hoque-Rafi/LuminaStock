import { useContext } from "react";
import { executeTrade, getCashBalance } from "../services/portfolioService";
import { AuthContext } from "../contexts/AuthContext";
import apiRequest from "../lib/apiRequest";

export const useStockAction = (ticker, stock, setIsTradeModalOpen) => {
  const { updateUser } = useContext(AuthContext);

  const toggleWatchlist = async () => {
    if (!ticker) return;
    try {
      const response = await apiRequest.post("/stock-action/watchlist", {
        symbol: ticker,
      });
      updateUser(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleTrade = (type, quantity) => {
    if (!stock) return;
    try {
      executeTrade(stock.symbol, quantity, stock.price, type);
      setIsTradeModalOpen(false);
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
