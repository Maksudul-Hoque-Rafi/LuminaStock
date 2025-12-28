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
              ${Number(currentHolding.avgBuyPrice).toFixed(2)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockStats;
