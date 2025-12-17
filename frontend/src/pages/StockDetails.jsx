import React, { useContext, useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router";
import { getAIStockAnalysis, getAIStockNews } from "../services/geminiService";
import {
  executeTrade,
  getHolding,
  getCashBalance,
} from "../services/portfolioService";
import { TradeModal } from "../components/TradeModal";
import StockHeader from "../components/StockDetails/StockHeader";
import PriceChart from "../components/StockDetails/PriceChart";
import PeerComparison from "../components/StockDetails/PeerComparison";
import StockStats from "../components/StockDetails/StockStats";
import AIAnalysis from "../components/StockDetails/AIAnalysis";
import NewsSection from "../components/StockDetails/NewsSection";
import { getStock } from "../lib/stockInfo";
import { StockContext } from "../contexts/StockContext";

const StockDetails = () => {
  const chartData = useLoaderData();
  const { stocks } = useContext(StockContext);
  const { ticker } = useParams();
  const [stock, setStock] = useState(undefined);
  const [aiAnalysis, setAiAnalysis] = useState("");
  const [stockNews, setStockNews] = useState([]);
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);
  const [loadingNews, setLoadingNews] = useState(false);
  const [inWatchlist, setInWatchlist] = useState(false);
  const [isTradeModalOpen, setIsTradeModalOpen] = useState(false);
  const [cashBalance, setCashBalance] = useState(0);

  useEffect(() => {
    if (ticker) {
      const foundStock = getStock(stocks, ticker.toUpperCase());
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
        `Successfully ${
          type === "buy" ? "bought" : "sold"
        } ${quantity} shares of ${stock.symbol}`
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
  const peerStocks = stocks
    .filter((s) => s.sector === stock.sector && s.symbol !== stock.symbol)
    .slice(0, 3);
  const currentHolding = getHolding(stock.symbol);

  return (
    <div className="space-y-8">
      <StockHeader
        stock={stock}
        inWatchlist={inWatchlist}
        onToggleWatchlist={toggleWatchlist}
        onOpenTradeModal={() => {
          setCashBalance(getCashBalance());
          setIsTradeModalOpen(true);
        }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-6">
          <PriceChart
            chartData={chartData}
            isPositive={isPositive}
            stock={stock}
          />
          <PeerComparison peerStocks={peerStocks} />
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          <StockStats stock={stock} currentHolding={currentHolding} />
          <AIAnalysis
            aiAnalysis={aiAnalysis}
            loadingAnalysis={loadingAnalysis}
            onGenerateReport={handleAIAnalysis}
          />
          <NewsSection
            stockNews={stockNews}
            loadingNews={loadingNews}
            stock={stock}
          />
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
