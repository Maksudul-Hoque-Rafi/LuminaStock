import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { Plus, Trash2, Wallet, DollarSign } from "lucide-react";
import { MOCK_STOCKS } from "../services/mockData";
import {
  getPortfolio,
  savePortfolio,
  executeTrade,
  getCashBalance,
} from "../services/portfolioService";
import { TradeModal } from "../components/TradeModal";

const Portfolio = () => {
  const [holdings, setHoldings] = useState([]);
  const [currentPrices, setCurrentPrices] = useState({});
  const [cashBalance, setCashBalance] = useState(0);

  const [showTradeModal, setShowTradeModal] = useState(false);
  const [selectedStockForTrade, setSelectedStockForTrade] = useState(null);

  // Mock Growth Data
  const [growthData, setGrowthData] = useState([]);

  useEffect(() => {
    loadPortfolio();
  }, []);

  const loadPortfolio = () => {
    const saved = getPortfolio();
    const cash = getCashBalance();
    setHoldings(saved);
    setCashBalance(cash);

    // Hydrate with current prices from mock data
    const prices = {};
    saved.forEach((item) => {
      const stock = MOCK_STOCKS.find((s) => s.symbol === item.symbol);
      if (stock) {
        prices[item.symbol] = stock.price;
      }
    });
    setCurrentPrices(prices);

    // Calculate Portfolio Value (Stocks only) for graph
    const portfolioVal = saved.reduce(
      (sum, item) =>
        sum + item.quantity * (prices[item.symbol] || item.avgBuyPrice),
      0
    );
    const totalAccountVal = portfolioVal + cash;

    const data = [];
    if (totalAccountVal > 0) {
      const today = new Date();
      let currentVal = totalAccountVal;
      const points = [];

      // Generate 30 days of data backwards from today
      for (let i = 0; i < 30; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);

        points.push({
          date: date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
          value: currentVal,
        });

        // Reverse random walk to simulate history
        // Volatility approx 1-2%
        const change = 1 + (Math.random() - 0.5) * 0.02;
        currentVal = currentVal / change;
      }
      data.push(...points.reverse());
    }
    setGrowthData(data);
  };

  const openTradeModal = (item) => {
    setSelectedStockForTrade(item);
    setShowTradeModal(true);
  };

  const handleTrade = (type, quantity) => {
    if (!selectedStockForTrade) return;
    try {
      const currentPrice =
        currentPrices[selectedStockForTrade.symbol] ||
        selectedStockForTrade.avgBuyPrice;
      const updated = executeTrade(
        selectedStockForTrade.symbol,
        quantity,
        currentPrice,
        type
      );
      setHoldings(updated);
      setShowTradeModal(false);
      loadPortfolio(); // Refresh data/charts and cash balance
    } catch (e) {
      alert(e.message);
    }
  };

  const removeHolding = (symbol) => {
    if (
      window.confirm(
        "Are you sure? This will remove the stock from your view but won't sell it for cash (use Trade > Sell for that)."
      )
    ) {
      const updated = holdings.filter((h) => h.symbol !== symbol);
      savePortfolio(updated);
      setHoldings(updated);
      loadPortfolio();
    }
  };

  // Calculations
  const portfolioValue = holdings.reduce(
    (sum, item) =>
      sum + item.quantity * (currentPrices[item.symbol] || item.avgBuyPrice),
    0
  );
  const totalInvested = holdings.reduce(
    (sum, item) => sum + item.quantity * item.avgBuyPrice,
    0
  );
  const totalAccountValue = portfolioValue + cashBalance;

  const totalReturn = portfolioValue - totalInvested;
  const totalReturnPercent =
    totalInvested > 0 ? (totalReturn / totalInvested) * 100 : 0;

  const pieData = holdings.map((h) => ({
    name: h.symbol,
    value: h.quantity * (currentPrices[h.symbol] || h.avgBuyPrice),
  }));
  // Add cash to pie chart for completeness
  if (cashBalance > 0) {
    pieData.push({ name: "Cash", value: cashBalance });
  }

  const COLORS = [
    "#3b82f6",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#ec4899",
    "#94a3b8",
  ];

  return (
    <div className="space-y-8 relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold text-slate-900">My Portfolio</h1>
        <div className="text-sm text-slate-500 bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
          Starting Balance: $10,000.00
        </div>
      </div>

      {/* Summary Cards */}
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

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Growth Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h2 className="text-lg font-bold text-slate-900 mb-6">
            Account Growth (30D)
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={growthData}
                margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0"
                />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12, fill: "#64748b" }}
                  axisLine={false}
                  tickLine={false}
                  minTickGap={30}
                />
                <YAxis
                  domain={["auto", "auto"]}
                  tick={{ fontSize: 12, fill: "#64748b" }}
                  axisLine={false}
                  tickLine={false}
                  width={50}
                />
                <Tooltip
                  formatter={(value) => [`$${value.toFixed(2)}`, "Value"]}
                  contentStyle={{
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Allocation Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h2 className="text-lg font-bold text-slate-900 mb-6">
            Asset Allocation
          </h2>
          <div className="flex flex-col sm:flex-row items-center">
            <div className="h-64 w-full sm:w-1/2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          entry.name === "Cash"
                            ? "#10b981"
                            : COLORS[index % COLORS.length]
                        }
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => `$${value.toFixed(2)}`}
                    contentStyle={{
                      borderRadius: "8px",
                      border: "none",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full sm:w-1/2 mt-4 sm:mt-0 space-y-2">
              {pieData.map((entry, index) => (
                <div
                  key={entry.name}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{
                        backgroundColor:
                          entry.name === "Cash"
                            ? "#10b981"
                            : COLORS[index % COLORS.length],
                      }}
                    />
                    <span className="text-slate-600">{entry.name}</span>
                  </div>
                  <span className="font-medium text-slate-900">
                    {((entry.value / totalAccountValue) * 100).toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Holdings Table */}
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
            <strong>${cashBalance.toLocaleString()}</strong> available to
            trade.
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
                    currentPrices[item.symbol] || item.avgBuyPrice;
                  const itemReturn =
                    (currPrice - item.avgBuyPrice) * item.quantity;
                  const itemReturnPercent =
                    ((currPrice - item.avgBuyPrice) / item.avgBuyPrice) * 100;
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
                        ${item.avgBuyPrice.toFixed(2)}
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
                          onClick={() => openTradeModal(item)}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          Trade
                        </button>
                        <button
                          onClick={() => removeHolding(item.symbol)}
                          className="text-slate-400 hover:text-rose-500 transition-colors"
                          title="Remove holding from list (Does not sell)"
                        >
                          <Trash2 size={18} />
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

      {selectedStockForTrade && (
        <TradeModal
          isOpen={showTradeModal}
          onClose={() => setShowTradeModal(false)}
          symbol={selectedStockForTrade.symbol}
          currentPrice={
            currentPrices[selectedStockForTrade.symbol] ||
            selectedStockForTrade.avgBuyPrice
          }
          cashBalance={cashBalance}
          onTrade={handleTrade}
        />
      )}
    </div>
  );
};

export default Portfolio;


