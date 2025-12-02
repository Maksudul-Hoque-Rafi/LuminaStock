import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Star, Trash2 } from "lucide-react";
import { MOCK_STOCKS } from "../services/mockData";

const Watchlist = () => {
  const [watchlistStocks, setWatchlistStocks] = useState([]);

  useEffect(() => {
    const tickers = JSON.parse(localStorage.getItem("watchlist") || "[]");
    const stocks = tickers
      .map((t) => MOCK_STOCKS.find((s) => s.symbol === t))
      .filter((s) => !!s);
    setWatchlistStocks(stocks);
  }, []);

  const removeFromWatchlist = (symbol) => {
    const currentTickers = JSON.parse(localStorage.getItem("watchlist") || "[]");
    const newTickers = currentTickers.filter((t) => t !== symbol);
    localStorage.setItem("watchlist", JSON.stringify(newTickers));
    setWatchlistStocks(watchlistStocks.filter((s) => s.symbol !== symbol));
  };

  if (watchlistStocks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="p-4 bg-slate-100 rounded-full mb-4 text-slate-400">
          <Star size={32} />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          Your Watchlist is Empty
        </h2>
        <p className="text-slate-500 mb-6">
          Keep track of your favorite stocks by adding them here.
        </p>
        <Link
          to="/screener"
          className="text-blue-600 font-medium hover:underline"
        >
          Go to Screener
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900">Watchlist</h1>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50 text-left text-xs font-semibold text-slate-500 uppercase">
              <th className="px-6 py-4">Symbol</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4 text-right">Price</th>
              <th className="px-6 py-4 text-right">Change</th>
              <th className="px-6 py-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {watchlistStocks.map((stock) => (
              <tr
                key={stock.symbol}
                className="hover:bg-slate-50 transition-colors"
              >
                <td className="px-6 py-4 font-bold text-slate-900">
                  <Link
                    to={`/stock/${stock.symbol}`}
                    className="hover:text-blue-600"
                  >
                    {stock.symbol}
                  </Link>
                </td>
                <td className="px-6 py-4 text-slate-600">{stock.name}</td>
                <td className="px-6 py-4 text-right font-medium">
                  ${stock.price.toFixed(2)}
                </td>
                <td
                  className={`px-6 py-4 text-right font-medium ${
                    stock.change >= 0 ? "text-emerald-600" : "text-rose-600"
                  }`}
                >
                  {stock.changePercent > 0 ? "+" : ""}
                  {stock.changePercent}%
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => removeFromWatchlist(stock.symbol)}
                    className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Watchlist;


