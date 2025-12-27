import { useContext, useEffect, useState } from "react";
import { StockContext } from "../contexts/StockContext";
import { useParams } from "react-router";
import { getStock } from "../lib/stockInfo";
import { AuthContext } from "../contexts/AuthContext";

export const useStockDetails = () => {
  const { stocks: stocksList } = useContext(StockContext);
  const { currentUser } = useContext(AuthContext);
  const { ticker } = useParams();
  const [stock, setStock] = useState(undefined);
  const [inWatchlist, setInWatchlist] = useState(false);

  useEffect(() => {
    if (ticker) {
      const foundStock = getStock(stocksList, ticker.toUpperCase());
      setStock(foundStock);

      const tickers = currentUser.watchlist.map((item) => item.symbol);
      setInWatchlist(tickers.includes(ticker.toUpperCase()));
    }
  }, [ticker, currentUser]);

  return {
    stocksList,
    stock,
    ticker,
    inWatchlist,
  };
};
