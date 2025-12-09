import React from "react";
import { Link } from "react-router";
import { TrendingUp, TrendingDown, ChevronRight } from "lucide-react";

const StockTable = ({ title, icon: Icon, stocks, isGainer }) => {
  const iconColor = isGainer ? "text-emerald-600" : "text-rose-600";
  const badgeColor = isGainer
    ? "bg-emerald-100 text-emerald-800"
    : "bg-rose-100 text-rose-800";

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Icon className={iconColor} size={20} />
          {title}
        </h2>
        <Link
          to="/screener"
          className="text-blue-600 text-sm font-medium hover:underline flex items-center"
        >
          View All <ChevronRight size={16} />
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100">
              <th className="pb-3 pl-2">Symbol</th>
              <th className="pb-3 text-right">Price</th>
              <th className="pb-3 text-right">Change</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {stocks.map((stock) => (
              <tr
                key={stock.symbol}
                className="hover:bg-slate-50 transition-colors group"
              >
                <td className="py-4 pl-2 font-medium text-slate-900">
                  <Link
                    to={`/stock/${stock.symbol}`}
                    className="hover:text-blue-600"
                  >
                    {stock.symbol}
                  </Link>
                  <div className="text-xs text-slate-500 font-normal">
                    {stock.name}
                  </div>
                </td>
                <td className="py-4 text-right font-medium">
                  ${stock.price.toFixed(2)}
                </td>
                <td className="py-4 text-right">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badgeColor}`}
                  >
                    {isGainer ? "+" : ""}
                    {stock.changePercent}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockTable;
