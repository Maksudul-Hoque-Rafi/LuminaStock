import { useContext, useEffect, useState } from "react";
import { StockContext } from "../contexts/StockContext";
import { useParams } from "react-router";
import { getStock } from "../lib/stockInfo";
import { getCashBalance } from "../services/portfolioService";

export const useStockDetails = () => {
  const { stocks: stocksList } = useContext(StockContext);
  const { ticker } = useParams();
  const [stock, setStock] = useState(undefined);
  const [inWatchlist, setInWatchlist] = useState(false);
  const [cashBalance, setCashBalance] = useState(0);

  useEffect(() => {
    if (ticker) {
      const foundStock = getStock(stocksList, ticker.toUpperCase());
      setStock(foundStock);

      // Check watchlist
      const watchlist = JSON.parse(localStorage.getItem("watchlist") || "[]");
      setInWatchlist(watchlist.includes(ticker.toUpperCase()));

      setCashBalance(getCashBalance());
    }
  }, [ticker]);

  return {
    stocksList,
    stock,
    ticker,
    inWatchlist,
    setInWatchlist,
    cashBalance,
    setCashBalance,
  };
};
