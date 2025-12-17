import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import HeroSection from "../components/Home/HeroSection";
import MarketOverview from "../components/Home/MarketOverview";
import StockTable from "../components/Home/StockTable";
import QuickLinks from "../components/Home/QuickLinks";
import { useLoaderData } from "react-router";

const Home = () => {
  const stocksInfo = useLoaderData();
  const topGainers = [...stocksInfo]
    .sort((a, b) => b.changePercent - a.changePercent)
    .slice(0, 3);
  const topLosers = [...stocksInfo]
    .sort((a, b) => a.changePercent - b.changePercent)
    .slice(0, 3);

  return (
    <div className="space-y-8">
      <HeroSection />
      <MarketOverview />

      {/* Top Gainers & Losers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <StockTable
          title="Top Gainers"
          icon={TrendingUp}
          stocks={topGainers}
          isGainer={true}
        />
        <StockTable
          title="Top Losers"
          icon={TrendingDown}
          stocks={topLosers}
          isGainer={false}
        />
      </div>

      <QuickLinks />
    </div>
  );
};

export default Home;
