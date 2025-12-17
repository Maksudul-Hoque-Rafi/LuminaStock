import React, { useContext, useState } from "react";
import { MOCK_STOCKS } from "../services/mockData";
import ScreenerHeader from "../components/Screener/ScreenerHeader";
import FilterBar from "../components/Screener/FilterBar";
import StocksTable from "../components/Screener/StocksTable";
import { StockContext } from "../contexts/StockContext";

const Screener = () => {
  const { stockInfo } = useContext(StockContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [sectorFilter, setSectorFilter] = useState("All");
  const [priceFilter, setPriceFilter] = useState("All");

  console.log("From Screener Page, StockInfo is ", stockInfo);

  const sectors = [
    "All",
    ...Array.from(new Set(MOCK_STOCKS.map((s) => s.sector))),
  ];

  const filteredStocks = MOCK_STOCKS.filter((stock) => {
    const matchesSearch =
      stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector =
      sectorFilter === "All" || stock.sector === sectorFilter;

    let matchesPrice = true;
    if (priceFilter === "Under $100") matchesPrice = stock.price < 100;
    if (priceFilter === "$100 - $300")
      matchesPrice = stock.price >= 100 && stock.price <= 300;
    if (priceFilter === "Over $300") matchesPrice = stock.price > 300;

    return matchesSearch && matchesSector && matchesPrice;
  });

  return (
    <div className="space-y-6">
      <ScreenerHeader />
      <FilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        sectorFilter={sectorFilter}
        onSectorChange={setSectorFilter}
        priceFilter={priceFilter}
        onPriceChange={setPriceFilter}
      />
      <StocksTable
        filteredStocks={filteredStocks}
        onClearFilters={() => {
          setSearchTerm("");
          setSectorFilter("All");
          setPriceFilter("All");
        }}
      />
    </div>
  );
};

export default Screener;
