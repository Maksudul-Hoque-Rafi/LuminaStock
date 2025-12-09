import React from "react";
import { Star, DollarSign } from "lucide-react";

const StockHeader = ({
  stock,
  inWatchlist,
  onToggleWatchlist,
  onOpenTradeModal,
}) => {
  const isPositive = stock.change >= 0;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <div className="flex items-center gap-3 mb-1">
          <h1 className="text-3xl font-bold text-slate-900">{stock.symbol}</h1>
          <span className="text-slate-500 text-lg">{stock.name}</span>
          <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-full font-medium">
            {stock.sector}
          </span>
        </div>
        <div className="flex items-end gap-3">
          <span className="text-4xl font-bold text-slate-900">
            ${stock.price.toFixed(2)}
          </span>
          <span
            className={`text-lg font-medium mb-1 ${
              isPositive ? "text-emerald-600" : "text-rose-600"
            }`}
          >
            {isPositive ? "+" : ""}
            {stock.change} ({isPositive ? "+" : ""}
            {stock.changePercent}%)
          </span>
        </div>
      </div>
      <div className="flex gap-3 w-full md:w-auto">
        <button
          onClick={onToggleWatchlist}
          className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg border font-medium transition-colors ${
            inWatchlist
              ? "bg-yellow-50 border-yellow-200 text-yellow-700"
              : "bg-white border-slate-300 text-slate-700 hover:bg-slate-50"
          }`}
        >
          <Star size={18} fill={inWatchlist ? "currentColor" : "none"} />
          {inWatchlist ? "Watchlisted" : "Watchlist"}
        </button>
        <button
          onClick={onOpenTradeModal}
          className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm"
        >
          <DollarSign size={18} />
          Buy / Sell
        </button>
      </div>
    </div>
  );
};

export default StockHeader;
