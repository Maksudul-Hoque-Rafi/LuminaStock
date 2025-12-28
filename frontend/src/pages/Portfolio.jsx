import React, { useContext, useEffect, useState } from "react";
import { executeTrade } from "../services/portfolioService";
import { TradeModal } from "../components/TradeModal";
import SummaryCards from "../components/Portfolio/SummaryCards";
import AllocationChart from "../components/Portfolio/AllocationChart";
import HoldingsTable from "../components/Portfolio/HoldingsTable";
import { StockContext } from "../contexts/StockContext";
import { AuthContext } from "../contexts/AuthContext";

const Portfolio = () => {
  const { stocks } = useContext(StockContext);
  const { currentUser, updateUser } = useContext(AuthContext);
  const [currentPrices, setCurrentPrices] = useState({});
  const [showTradeModal, setShowTradeModal] = useState(false);
  const [selectedStockForTrade, setSelectedStockForTrade] = useState(null);

  const cashBalance = Number(currentUser.cashBalance);
  const holdings = currentUser.portfolio;

  useEffect(() => {
    updateCurrentPrices();
  }, []);

  const updateCurrentPrices = () => {
    const prices = {};
    holdings.forEach((item) => {
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

  const handleTrade = async (type, quantity) => {
    if (!selectedStockForTrade) return;
    try {
      const currentPrice =
        currentPrices[selectedStockForTrade.symbol] ||
        selectedStockForTrade.avgBuyPrice;
      const response = await executeTrade(
        selectedStockForTrade.symbol,
        quantity,
        currentPrice,
        type
      );
      if (response.errorMessage) {
        alert(response.errorMessage);
        return;
      }
      updateUser(response.userInfo);
      alert(
        `Successfully ${
          type === "buy" ? "bought" : "sold"
        } ${quantity} shares of ${selectedStockForTrade.symbol}`
      );
    } catch (error) {
      console.error(error);
    } finally {
      setShowTradeModal(false);
    }
  };

  // Calculations
  const portfolioValue = holdings.reduce(
    (sum, item) =>
      sum +
      item.quantity * (currentPrices[item.symbol] || Number(item.avgBuyPrice)),
    0
  );
  const totalInvested = holdings.reduce(
    (sum, item) => sum + item.quantity * Number(item.avgBuyPrice),
    0
  );
  const totalAccountValue = portfolioValue + cashBalance;

  const totalReturn = portfolioValue - totalInvested;
  const totalReturnPercent =
    totalInvested > 0 ? (totalReturn / totalInvested) * 100 : 0;

  const pieData = holdings.map((h) => ({
    name: h.symbol,
    value: h.quantity * (currentPrices[h.symbol] || Number(h.avgBuyPrice)),
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
