import React from "react";
import {
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  TrendingDown,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { MOCK_STOCKS } from "../services/mockData";

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

const Home = () => {
  const topGainers = [...MOCK_STOCKS]
    .sort((a, b) => b.changePercent - a.changePercent)
    .slice(0, 3);
  const topLosers = [...MOCK_STOCKS]
    .sort((a, b) => a.changePercent - b.changePercent)
    .slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 sm:p-12 text-white overflow-hidden shadow-lg">
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Master the Markets with AI Precision
          </h1>
          <p className="text-blue-100 text-lg mb-8">
            Real-time tracking, intelligent portfolio management, and AI-driven
            insights to help you make smarter investment decisions.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/screener"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Find Stocks
            </Link>
            <Link
              to="/learn"
              className="bg-blue-500 bg-opacity-30 backdrop-blur-sm border border-blue-400 text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-40 transition-colors"
            >
              Start Learning
            </Link>
          </div>
        </div>
        {/* Abstract shapes */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-0 right-20 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
      </div>

      {/* Market Indices */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-4">
          Market Overview
        </h2>
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

      {/* Top Gainers & Losers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Gainers */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="text-emerald-600" size={20} />
              Top Gainers
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
                {topGainers.map((stock) => (
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
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                        +{stock.changePercent}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Losers */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <TrendingDown className="text-rose-600" size={20} />
              Top Losers
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
                {topLosers.map((stock) => (
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
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-100 text-rose-800">
                        {stock.changePercent}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/portfolio"
          className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all group"
        >
          <h3 className="font-bold text-slate-900 mb-2 group-hover:text-blue-600">
            Your Portfolio
          </h3>
          <p className="text-sm text-slate-600">
            Track your investments and visualize wealth growth.
          </p>
        </Link>
        <Link
          to="/news"
          className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all group"
        >
          <h3 className="font-bold text-slate-900 mb-2 group-hover:text-blue-600">
            Market News
          </h3>
          <p className="text-sm text-slate-600">
            Stay updated with the latest headlines and trends.
          </p>
        </Link>
        <Link
          to="/learn"
          className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all group"
        >
          <h3 className="font-bold text-slate-900 mb-2 group-hover:text-blue-600">
            Learn to Trade
          </h3>
          <p className="text-sm text-slate-600">
            Educational resources to improve your strategy.
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Home;


