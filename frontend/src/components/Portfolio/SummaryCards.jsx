import React from "react";
import { Wallet, DollarSign } from "lucide-react";

const SummaryCards = ({
  totalAccountValue,
  cashBalance,
  totalReturn,
  totalReturnPercent,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Net Worth */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <DollarSign size={64} className="text-blue-600" />
        </div>
        <div className="text-slate-500 text-sm font-medium mb-1">
          Net Worth (Cash + Stocks)
        </div>
        <div className="text-3xl font-bold text-slate-900">
          $
          {totalAccountValue.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </div>
      </div>

      {/* Cash Balance */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Wallet size={64} className="text-emerald-600" />
        </div>
        <div className="text-slate-500 text-sm font-medium mb-1">
          Cash Balance
        </div>
        <div className="text-2xl font-bold text-emerald-600">
          $
          {cashBalance.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </div>
        <div className="text-xs text-slate-400 mt-1">
          Available Buying Power
        </div>
      </div>

      {/* Profit/Loss */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <div className="text-slate-500 text-sm font-medium mb-1">
          Unrealized Profit/Loss
        </div>
        <div
          className={`text-2xl font-bold flex items-center gap-2 ${
            totalReturn >= 0 ? "text-emerald-600" : "text-rose-600"
          }`}
        >
          {totalReturn >= 0 ? "+" : "-"}$
          {Math.abs(totalReturn).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </div>
        <div
          className={`text-sm font-semibold mt-1 ${
            totalReturn >= 0 ? "text-emerald-600" : "text-rose-600"
          }`}
        >
          {totalReturnPercent.toFixed(2)}% Return
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;
