import React, { useContext, useEffect, useState } from "react";
import {
  getPortfolio,
  savePortfolio,
  executeTrade,
  getCashBalance,
} from "../services/portfolioService";
import { TradeModal } from "../components/TradeModal";
import SummaryCards from "../components/Portfolio/SummaryCards";
import GrowthChart from "../components/Portfolio/GrowthChart";
import AllocationChart from "../components/Portfolio/AllocationChart";
import HoldingsTable from "../components/Portfolio/HoldingsTable";
import { StockContext } from "../contexts/StockContext";

const Portfolio = () => {
  const { stocks } = useContext(StockContext);
  const [holdings, setHoldings] = useState([]);
  const [currentPrices, setCurrentPrices] = useState({});
  const [cashBalance, setCashBalance] = useState(0);
  const [showTradeModal, setShowTradeModal] = useState(false);
  const [selectedStockForTrade, setSelectedStockForTrade] = useState(null);

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
      const stock = stocks.find((s) => s.symbol === item.symbol);
      if (stock) {
        prices[item.symbol] = stock.price;
      }
    });
    setCurrentPrices(prices);
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

  return (
    <div className="space-y-8 relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold text-slate-900">My Portfolio</h1>
        <div className="text-sm text-slate-500 bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
          Starting Balance: $10,000.00
        </div>
      </div>

      <SummaryCards
        totalAccountValue={totalAccountValue}
        cashBalance={cashBalance}
        totalReturn={totalReturn}
        totalReturnPercent={totalReturnPercent}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* <GrowthChart growthData={growthData} /> */}
        <AllocationChart
          pieData={pieData}
          totalAccountValue={totalAccountValue}
        />
      </div>

      <HoldingsTable
        holdings={holdings}
        currentPrices={currentPrices}
        cashBalance={cashBalance}
        onOpenTradeModal={openTradeModal}
        onRemoveHolding={removeHolding}
      />

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
