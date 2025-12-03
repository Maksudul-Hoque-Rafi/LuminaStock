import React from "react";
import { Search } from "lucide-react";
import { MOCK_STOCKS } from "../../services/mockData";

const FilterBar = ({
  searchTerm,
  onSearchChange,
  sectorFilter,
  onSectorChange,
  priceFilter,
  onPriceChange,
}) => {
  const sectors = [
    "All",
    ...Array.from(new Set(MOCK_STOCKS.map((s) => s.sector))),
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 space-y-4">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search symbol or company..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all focus:border-blue-500"
        />
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          size={18}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <label className="block text-xs font-semibold text-slate-500 mb-1">
            Sector
          </label>
          <select
            value={sectorFilter}
            onChange={(e) => onSectorChange(e.target.value)}
            className="w-full appearance-none px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white cursor-pointer"
          >
            {sectors.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="relative">
          <label className="block text-xs font-semibold text-slate-500 mb-1">
            Price Range
          </label>
          <select
            value={priceFilter}
            onChange={(e) => onPriceChange(e.target.value)}
            className="w-full appearance-none px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white cursor-pointer"
          >
            <option value="All">Any</option>
            <option value="Under $100">Under $100</option>
            <option value="$100 - $300">$100 - $300</option>
            <option value="Over $300">Over $300</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
