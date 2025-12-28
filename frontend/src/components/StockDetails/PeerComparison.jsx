import React from "react";
import { Link } from "react-router";
import { Scale } from "lucide-react";
import { formatMarketCap } from "../../lib/stockInfo";

const PeerComparison = ({ peerStocks }) => {
  if (!peerStocks || peerStocks.length === 0) return null;

  return (
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
                <td className="py-3 text-right">${peer.price.toFixed(2)}</td>
                <td className="py-3 text-right text-slate-600">
                  {formatMarketCap(peer.marketCap)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PeerComparison;
