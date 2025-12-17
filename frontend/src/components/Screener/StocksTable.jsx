import React from "react";
import { Link } from "react-router";
import { Filter } from "lucide-react";

const StocksTable = ({ filteredStocks, onClearFilters }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <th className="px-6 py-4">Symbol</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Sector</th>
              <th className="px-6 py-4 text-right">Price</th>
              <th className="px-6 py-4 text-right">Change</th>
              <th className="px-6 py-4 text-right">Change %</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredStocks.length > 0 ? (
              filteredStocks.map((stock) => (
                <tr
                  key={stock.symbol}
                  className="hover:bg-slate-50 transition-colors group"
                >
                  <td className="px-6 py-4 font-bold text-slate-900">
                    <Link
                      to={`/stock/${stock.symbol}`}
                      className="hover:text-blue-600 block"
                    >
                      {stock.symbol}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{stock.name}</td>
                  <td className="px-6 py-4 text-slate-600">
                    <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                      {stock.sector}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-medium text-slate-900">
                    ${stock.price.toFixed(2)}
                  </td>
                  <td
                    className={`px-6 py-4 text-right font-medium ${
                      stock.change >= 0 ? "text-emerald-600" : "text-rose-600"
                    }`}
                  >
                    {stock.change > 0 ? "+" : "-"}${Math.abs(stock.change)}
                  </td>
                  <td
                    className={`px-6 py-4 text-right font-medium ${
                      stock.changePercent >= 0
                        ? "text-emerald-600"
                        : "text-rose-600"
                    }`}
                  >
                    {stock.changePercent > 0 ? "+" : ""}
                    {stock.changePercent}%
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-12 text-center text-slate-500"
                >
                  <div className="flex flex-col items-center justify-center">
                    <Filter className="text-slate-300 mb-2" size={32} />
                    <p>No stocks match your current filters.</p>
                    <button
                      onClick={onClearFilters}
                      className="text-blue-600 text-sm font-medium hover:underline mt-2"
                    >
                      Clear all filters
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StocksTable;
