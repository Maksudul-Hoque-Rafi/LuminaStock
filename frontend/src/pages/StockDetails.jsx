import React, { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import { getHolding } from "../services/portfolioService";
import { TradeModal } from "../components/TradeModal";
import StockHeader from "../components/StockDetails/StockHeader";
import PriceChart from "../components/StockDetails/PriceChart";
import PeerComparison from "../components/StockDetails/PeerComparison";
import StockStats from "../components/StockDetails/StockStats";
import AIAnalysis from "../components/StockDetails/AIAnalysis";
import NewsSection from "../components/StockDetails/NewsSection";
import { useStockDetails } from "../hooks/useStockDetails";
import { useStockAI } from "../hooks/useStockAI";
import { useStockAction } from "../hooks/useStockAction";
import { AuthContext } from "../contexts/AuthContext";

const StockDetails = () => {
  const chartData = useLoaderData();
  const [isTradeModalOpen, setIsTradeModalOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const { stocksList, stock, ticker, inWatchlist } = useStockDetails();
  const {
    aiAnalysis,
    loadingAnalysis,
    stockNews,
    loadingNews,
    fetchStockNews,
    handleAIAnalysis,
  } = useStockAI();

  const { toggleWatchlist, handleTrade } = useStockAction(
    ticker,
    stock,
    setIsTradeModalOpen
  );

  useEffect(() => {
    if (stock) {
      fetchStockNews(stock.symbol);
    }
  }, [stock]);

  if (!stock) {
    return (
      <div className="text-center py-20 text-slate-500">
        Stock not found or loading...
      </div>
    );
  }

  const isPositive = stock.change >= 0;
  const peerStocks = stocksList
    .filter((s) => s.sector === stock.sector && s.symbol !== stock.symbol)
    .slice(0, 3);

  const currentHolding = currentUser.portfolio.find(
    (p) => p.symbol === stock.symbol
  );

  return (
    <div className="space-y-8">
      <StockHeader
        stock={stock}
        inWatchlist={inWatchlist}
        onToggleWatchlist={toggleWatchlist}
        onOpenTradeModal={() => {
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
        onTrade={handleTrade}
      />
    </div>
  );
};

export default StockDetails;
