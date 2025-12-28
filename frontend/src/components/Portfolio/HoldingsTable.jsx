import React from "react";
import { Link } from "react-router";
import { Plus, Trash2 } from "lucide-react";

const HoldingsTable = ({
  holdings,
  currentPrices,
  cashBalance,
  onOpenTradeModal,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center">
        <h2 className="text-lg font-bold text-slate-900">Holdings</h2>
        <Link
          to="/screener"
          className="text-blue-600 text-sm font-medium flex items-center gap-1 hover:underline"
        >
          <Plus size={16} /> Add Stock
        </Link>
      </div>

      {holdings.length === 0 ? (
        <div className="p-8 text-center text-slate-500">
          No stocks in portfolio. You have{" "}
          <strong>${cashBalance.toLocaleString()}</strong> available to trade.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr className="text-left text-xs font-semibold text-slate-500 uppercase">
                <th className="px-6 py-4">Symbol</th>
                <th className="px-6 py-4 text-right">Qty</th>
                <th className="px-6 py-4 text-right">Avg Price</th>
                <th className="px-6 py-4 text-right">Current</th>
                <th className="px-6 py-4 text-right">Return</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {holdings.map((item) => {
                const currPrice =
                  currentPrices[item.symbol] || Number(item.avgBuyPrice);
                const itemReturn =
                  (currPrice - Number(item.avgBuyPrice)) * item.quantity;
                const itemReturnPercent =
                  ((currPrice - Number(item.avgBuyPrice)) /
                    Number(item.avgBuyPrice)) *
                  100;
                const isPos = itemReturn >= 0;

                return (
                  <tr
                    key={item.symbol}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <Link
                        to={`/stock/${item.symbol}`}
                        className="font-bold text-slate-900 hover:text-blue-600"
                      >
                        {item.symbol}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-right text-slate-700">
                      {item.quantity}
                    </td>
                    <td className="px-6 py-4 text-right text-slate-700">
                      ${Number(item.avgBuyPrice).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-slate-900">
                      ${currPrice.toFixed(2)}
                    </td>
                    <td
                      className={`px-6 py-4 text-right font-medium ${
                        isPos ? "text-emerald-600" : "text-rose-600"
                      }`}
                    >
                      {isPos ? "+" : ""}
                      {itemReturnPercent.toFixed(2)}%
                    </td>
                    <td className="px-6 py-4 text-center flex items-center justify-center gap-3">
                      <button
                        onClick={() => onOpenTradeModal(item)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Trade
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default HoldingsTable;
