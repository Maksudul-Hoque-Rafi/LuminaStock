import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const MarketCard = ({ title, value, change, isPositive }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
    <div className="text-slate-500 text-sm font-medium mb-1">{title}</div>
    <div className="text-2xl font-bold text-slate-900 mb-2">{value}</div>
    <div
      className={`flex items-center text-sm font-semibold ${
        isPositive ? "text-emerald-600" : "text-rose-600"
      }`}
    >
      {isPositive ? (
        <ArrowUpRight size={16} className="mr-1" />
      ) : (
        <ArrowDownRight size={16} className="mr-1" />
      )}
      {change}
    </div>
  </div>
);

const MarketOverview = () => {
  return (
    <div>
      <h2 className="text-xl font-bold text-slate-900 mb-4">Market Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MarketCard
          title="S&P 500"
          value="4,450.32"
          change="+1.25%"
          isPositive={true}
        />
        <MarketCard
          title="NASDAQ"
          value="13,780.45"
          change="+0.98%"
          isPositive={true}
        />
        <MarketCard
          title="DOW JONES"
          value="34,500.10"
          change="-0.45%"
          isPositive={false}
        />
        <MarketCard
          title="Gold"
          value="$1,920.50"
          change="+0.10%"
          isPositive={true}
        />
      </div>
    </div>
  );
};

export default MarketOverview;
