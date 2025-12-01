import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Filter, Search } from 'lucide-react';
import { MOCK_STOCKS } from '../services/mockData';

const Screener: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sectorFilter, setSectorFilter] = useState('All');
  const [priceFilter, setPriceFilter] = useState('All');
  
  const sectors = ['All', ...Array.from(new Set(MOCK_STOCKS.map(s => s.sector)))];

  const filteredStocks = MOCK_STOCKS.filter(stock => {
    const matchesSearch = stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          stock.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = sectorFilter === 'All' || stock.sector === sectorFilter;
    
    let matchesPrice = true;
    if (priceFilter === 'Under $100') matchesPrice = stock.price < 100;
    if (priceFilter === '$100 - $300') matchesPrice = stock.price >= 100 && stock.price <= 300;
    if (priceFilter === 'Over $300') matchesPrice = stock.price > 300;

    return matchesSearch && matchesSector && matchesPrice;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold text-slate-900">Stock Screener</h1>
        <p className="text-slate-500">Find your next investment opportunity.</p>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 space-y-4">
        <div className="relative w-full">
            <input
              type="text"
              placeholder="Search symbol or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all focus:border-blue-500"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
             <label className="block text-xs font-semibold text-slate-500 mb-1">Sector</label>
             <select 
               value={sectorFilter} 
               onChange={(e) => setSectorFilter(e.target.value)}
               className="w-full appearance-none px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white cursor-pointer"
             >
               {sectors.map(s => <option key={s} value={s}>{s}</option>)}
             </select>
          </div>

          <div className="relative">
             <label className="block text-xs font-semibold text-slate-500 mb-1">Price Range</label>
             <select 
               value={priceFilter} 
               onChange={(e) => setPriceFilter(e.target.value)}
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

      {/* Results Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="px-6 py-4">Symbol</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Sector</th>
                <th className="px-6 py-4 text-right">Price</th>
                <th className="px-6 py-4 text-right">Change %</th>
                <th className="px-6 py-4 text-right">Market Cap</th>
                <th className="px-6 py-4 text-right">P/E</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStocks.length > 0 ? (
                filteredStocks.map((stock) => (
                  <tr key={stock.symbol} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4 font-bold text-slate-900">
                       <Link to={`/stock/${stock.symbol}`} className="hover:text-blue-600 block">
                         {stock.symbol}
                       </Link>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{stock.name}</td>
                    <td className="px-6 py-4 text-slate-600">
                       <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                         {stock.sector}
                       </span>
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-slate-900">${stock.price.toFixed(2)}</td>
                    <td className={`px-6 py-4 text-right font-medium ${stock.changePercent >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {stock.changePercent > 0 ? '+' : ''}{stock.changePercent}%
                    </td>
                    <td className="px-6 py-4 text-right text-slate-600">{stock.marketCap}</td>
                    <td className="px-6 py-4 text-right text-slate-600">{stock.peRatio}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center">
                        <Filter className="text-slate-300 mb-2" size={32} />
                        <p>No stocks match your current filters.</p>
                        <button 
                           onClick={() => {
                               setSearchTerm('');
                               setSectorFilter('All');
                               setPriceFilter('All');
                           }}
                           className="text-blue-600 text-sm font-medium hover:underline mt-2"
                        >
                            Clear all filters
                        </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Screener;
