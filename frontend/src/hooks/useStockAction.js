import { useContext } from "react";
import { executeTrade } from "../services/portfolioService";
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

  const handleTrade = async (type, quantity) => {
    if (!stock) return;
    try {
      const response = await executeTrade(
        stock.symbol,
        quantity,
        stock.price,
        type
      );

      if (response.errorMessage) {
        alert(response.errorMessage);
        return;
      }

      updateUser(response.userInfo);

      alert(
        `Successfully ${
          type === "buy" ? "bought" : "sold"
        } ${quantity} shares of ${stock.symbol}`
      );
    } catch (error) {
      console.error(error);
    } finally {
      setIsTradeModalOpen(false);
    }
  };

  return { toggleWatchlist, handleTrade };
};
