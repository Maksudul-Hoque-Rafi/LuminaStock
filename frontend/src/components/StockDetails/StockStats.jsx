import React from "react";

const StockStats = ({ stock, currentHolding }) => {
  return (
    <div className="space-y-6">
      {/* Current Position */}
      {currentHolding && (
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
          <h3 className="text-sm font-bold text-blue-900 uppercase tracking-wide mb-3">
            Your Position
          </h3>
          <div className="flex justify-between items-end mb-2">
            <span className="text-slate-600">Shares</span>
            <span className="text-xl font-bold text-slate-900">
              {currentHolding.quantity}
            </span>
          </div>
          <div className="flex justify-between items-end">
            <span className="text-slate-600">Avg Cost</span>
            <span className="font-medium text-slate-900">
              ${currentHolding.avgBuyPrice.toFixed(2)}
            </span>
          </div>
        </div>
      )}

      {/* Key Stats */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <h3 className="text-lg font-bold text-slate-900 mb-4">
          Key Statistics
        </h3>
        <div className="space-y-4 text-sm">
          <div className="flex justify-between border-b border-slate-50 pb-2">
            <span className="text-slate-500">Market Cap</span>
            <span className="font-medium text-slate-900">
              {stock.marketCap}
            </span>
          </div>
          <div className="flex justify-between border-b border-slate-50 pb-2">
            <span className="text-slate-500">P/E Ratio</span>
            <span className="font-medium text-slate-900">{stock.peRatio}</span>
          </div>
          <div className="flex justify-between border-b border-slate-50 pb-2">
            <span className="text-slate-500">Volume</span>
            <span className="font-medium text-slate-900">{stock.volume}</span>
          </div>
          <div className="flex justify-between border-b border-slate-50 pb-2">
            <span className="text-slate-500">52W High</span>
            <span className="font-medium text-slate-900">${stock.high52}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">52W Low</span>
            <span className="font-medium text-slate-900">${stock.low52}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockStats;
