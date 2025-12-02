import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import {
  Star,
  DollarSign,
  Activity,
  Cpu,
  Newspaper,
  Scale,
  Clock,
} from "lucide-react";
import { getStock, MOCK_STOCKS } from "../services/mockData";
import {
  getAIStockAnalysis,
  getAIStockNews,
} from "../services/geminiService";
import {
  executeTrade,
  getHolding,
  getCashBalance,
} from "../services/portfolioService";
import { TradeModal } from "../components/TradeModal";

const StockDetails = () => {
  const { ticker } = useParams();
  const [stock, setStock] = useState(undefined);
  const [aiAnalysis, setAiAnalysis] = useState("");
  const [stockNews, setStockNews] = useState([]);
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);
  const [loadingNews, setLoadingNews] = useState(false);
  const [inWatchlist, setInWatchlist] = useState(false);
  const [isTradeModalOpen, setIsTradeModalOpen] = useState(false);
  const [cashBalance, setCashBalance] = useState(0);
  const [chartData, setChartData] = useState([]);

  // Mock Chart Data
  const generateChartData = (currentStock) => {
    if (!currentStock) return [];

    const points = [];
    let currentPrice = currentStock.price;
    const today = new Date();

    // Generate 30 days of data backwards from today to ensure the chart ends at current price
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);

      points.push({
        date: date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        price: currentPrice,
      });

      // Calculate previous day's price (reverse random walk)
      // volatility factor approx 2-3%
      const volatility = 0.03;
      const change = 1 + (Math.random() - 0.5) * volatility;
      currentPrice = currentPrice / change;
    }

    return points.reverse();
  };

  useEffect(() => {
    if (ticker) {
      const foundStock = getStock(ticker.toUpperCase());
      setStock(foundStock);

      // Check watchlist
      const watchlist = JSON.parse(localStorage.getItem("watchlist") || "[]");
      setInWatchlist(watchlist.includes(ticker.toUpperCase()));

      // Reset states
      setAiAnalysis("");
      setStockNews([]);
      setCashBalance(getCashBalance());
    }
  }, [ticker]);

  useEffect(() => {
    if (stock) {
      setChartData(generateChartData(stock));
      fetchStockNews(stock.symbol);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stock]);

  const fetchStockNews = async (symbol) => {
    setLoadingNews(true);
    try {
      const result = await getAIStockNews(symbol);
      if (result && result.length > 0) {
        setStockNews(result);
      } else {
        // Fallback manual news if search returns empty for demo purposes
        setStockNews([
          {
            title: `${symbol} Market Movement`,
            summary: "Latest trading data shows active volume.",
            source: "MarketWatch",
            time: "Today",
            url: `https://www.google.com/search?q=${symbol}+stock+news`,
          },
        ]);
      }
    } catch {
      setStockNews([]);
    }
    setLoadingNews(false);
  };

  const handleAIAnalysis = async () => {
    if (!stock) return;
    setLoadingAnalysis(true);
    const analysis = await getAIStockAnalysis(stock);
    setAiAnalysis(analysis);
    setLoadingAnalysis(false);
  };

  const toggleWatchlist = () => {
    if (!ticker) return;
    const current = JSON.parse(localStorage.getItem("watchlist") || "[]");
    let updated;
    if (inWatchlist) {
      updated = current.filter((t) => t !== ticker.toUpperCase());
    } else {
      updated = [...current, ticker.toUpperCase()];
    }
    localStorage.setItem("watchlist", JSON.stringify(updated));
    setInWatchlist(!inWatchlist);
  };

  const handleTrade = (type, quantity) => {
    if (!stock) return;
    try {
      executeTrade(stock.symbol, quantity, stock.price, type);
      setIsTradeModalOpen(false);
      setCashBalance(getCashBalance()); // Refresh cash
      alert(
        `Successfully ${type === "buy" ? "bought" : "sold"} ${quantity} shares of ${
          stock.symbol
        }`
      );
    } catch (e) {
      alert(e.message);
    }
  };

  if (!stock) {
    return (
      <div className="text-center py-20 text-slate-500">
        Stock not found or loading...
      </div>
    );
  }

  const isPositive = stock.change >= 0;
  const peerStocks = MOCK_STOCKS.filter(
    (s) => s.sector === stock.sector && s.symbol !== stock.symbol
  ).slice(0, 3);
  const currentHolding = getHolding(stock.symbol);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-3xl font-bold text-slate-900">
              {stock.symbol}
            </h1>
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
            onClick={toggleWatchlist}
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
            onClick={() => {
              setCashBalance(getCashBalance());
              setIsTradeModalOpen(true);
            }}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm"
          >
            <DollarSign size={18} />
            Buy / Sell
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Chart Section */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Activity size={20} className="text-blue-600" />
              Price History (30 Days)
            </h3>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData}
                  margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="colorPrice"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor={isPositive ? "#10b981" : "#f43f5e"}
                        stopOpacity={0.1}
                      />
                      <stop
                        offset="95%"
                        stopColor={isPositive ? "#10b981" : "#f43f5e"}
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
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
                    orientation="right"
                    tick={{ fontSize: 12, fill: "#64748b" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "8px",
                      border: "none",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                    formatter={(value) => [`$${value.toFixed(2)}`, "Price"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="price"
                    stroke={isPositive ? "#059669" : "#e11d48"}
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorPrice)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* About / Description */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-3">
              About {stock.name}
            </h3>
            <p className="text-slate-600 leading-relaxed">
              {stock.description}
            </p>
          </div>

          {/* Peer Comparison */}
          {peerStocks.length > 0 && (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Scale size={20} className="text-blue-600" />
                Peer Comparison
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-xs font-semibold text-slate-500 uppercase border-b border-slate-100">
                      <th className="pb-2">Company</th>
                      <th className="pb-2 text-right">Price</th>
                      <th className="pb-2 text-right">Market Cap</th>
                      <th className="pb-2 text-right">P/E</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {peerStocks.map((peer) => (
                      <tr key={peer.symbol}>
                        <td className="py-3 font-medium text-slate-900">
                          <Link
                            to={`/stock/${peer.symbol}`}
                            className="hover:text-blue-600"
                          >
                            {peer.name} ({peer.symbol})
                          </Link>
                        </td>
                        <td className="py-3 text-right">
                          ${peer.price.toFixed(2)}
                        </td>
                        <td className="py-3 text-right text-slate-600">
                          {peer.marketCap}
                        </td>
                        <td className="py-3 text-right text-slate-600">
                          {peer.peRatio}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Column */}
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
                <span className="font-medium text-slate-900">
                  {stock.peRatio}
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-50 pb-2">
                <span className="text-slate-500">Volume</span>
                <span className="font-medium text-slate-900">
                  {stock.volume}
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-50 pb-2">
                <span className="text-slate-500">52W High</span>
                <span className="font-medium text-slate-900">
                  ${stock.high52}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">52W Low</span>
                <span className="font-medium text-slate-900">
                  ${stock.low52}
                </span>
              </div>
            </div>
          </div>

          {/* AI Analysis */}
          <div className="bg-linear-to-br from-indigo-50 to-blue-50 p-6 rounded-xl border border-indigo-100">
            <h3 className="text-lg font-bold text-indigo-900 mb-2 flex items-center gap-2">
              <Cpu size={20} className="text-indigo-600" />
              Gemini AI Insight
            </h3>

            {!aiAnalysis && !loadingAnalysis && (
              <div className="text-center py-4">
                <p className="text-sm text-indigo-700 mb-3">
                  Get a quick AI-powered breakdown of this stock's potential.
                </p>
                <button
                  onClick={handleAIAnalysis}
                  className="px-4 py-2 bg-white text-indigo-600 border border-indigo-200 rounded-lg text-sm font-semibold hover:bg-indigo-50 transition-colors shadow-sm"
                >
                  Generate Report
                </button>
              </div>
            )}

            {loadingAnalysis && (
              <div className="flex flex-col items-center justify-center py-6 text-indigo-500">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mb-2" />
                <span className="text-sm">Analyzing market data...</span>
              </div>
            )}

            {aiAnalysis && (
              <div className="prose prose-sm prose-indigo text-slate-700 mt-2">
                <div className="whitespace-pre-line leading-relaxed text-sm">
                  {aiAnalysis}
                </div>
              </div>
            )}
          </div>

          {/* Company News */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Newspaper size={20} className="text-blue-600" />
              Recent News
            </h3>
            <div className="space-y-4">
              {loadingNews ? (
                <div className="animate-pulse space-y-4">
                  <div className="h-16 bg-slate-100 rounded-lg" />
                  <div className="h-16 bg-slate-100 rounded-lg" />
                </div>
              ) : stockNews.length > 0 ? (
                stockNews.map((news, i) => (
                  <a
                    key={i}
                    href={
                      news.url ||
                      `https://www.google.com/search?q=${encodeURIComponent(
                        news.title
                      )}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group cursor-pointer block"
                  >
                    <h4 className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 mb-1 leading-snug hover:underline">
                      {news.title}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span>{news.source}</span>
                      <span>•</span>
                      <span className="flex items-center gap-0.5">
                        <Clock size={10} /> {news.time}
                      </span>
                    </div>
                  </a>
                ))
              ) : (
                <div className="text-sm text-slate-500">
                  No recent news available.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <TradeModal
        isOpen={isTradeModalOpen}
        onClose={() => setIsTradeModalOpen(false)}
        symbol={stock.symbol}
        currentPrice={stock.price}
        cashBalance={cashBalance}
        onTrade={handleTrade}
      />
    </div>
  );
};

export default StockDetails;


