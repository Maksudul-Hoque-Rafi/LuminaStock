import React, { useState, useEffect, useContext } from "react";
import { X, Wallet, AlertCircle } from "lucide-react";
import { AuthContext } from "../contexts/AuthContext";

export const TradeModal = ({
  isOpen,
  onClose,
  symbol,
  currentPrice,
  onTrade,
}) => {
  const [type, setType] = useState("buy");
  const [quantity, setQuantity] = useState(1);

  const { currentUser } = useContext(AuthContext);
  const cashBalance = Number(currentUser.cashBalance);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setType("buy");
      setQuantity(1);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const totalCost = quantity * currentPrice;
  const canAfford = type === "sell" || totalCost <= cashBalance;

  const handleSubmit = () => {
    onTrade(type, quantity);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-lg max-w-sm w-full p-6 relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-slate-900">Trade {symbol}</h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Wallet Balance */}
        <div className="bg-slate-50 p-3 rounded-lg mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-600 text-sm font-medium">
            <Wallet size={16} />
            <span>Buying Power</span>
          </div>
          <span className="font-bold text-slate-900">
            $
            {cashBalance.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>

        {/* Type Toggle */}
        <div className="flex gap-2 mb-4 p-1 bg-slate-100 rounded-lg">
          <button
            className={`flex-1 py-1.5 rounded-md text-sm font-semibold transition-all ${
              type === "buy"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-900"
            }`}
            onClick={() => setType("buy")}
          >
            Buy
          </button>
          <button
            className={`flex-1 py-1.5 rounded-md text-sm font-semibold transition-all ${
              type === "sell"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-900"
            }`}
            onClick={() => setType("sell")}
          >
            Sell
          </button>
        </div>

        {/* Quantity Input */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Quantity
            </label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => {
                const value = parseInt(e.target.value, 10);
                setQuantity(Math.max(1, Number.isNaN(value) ? 0 : value));
              }}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>

          <div
            className={`p-3 rounded-lg space-y-2 border ${
              !canAfford && type === "buy"
                ? "bg-rose-50 border-rose-100"
                : "bg-slate-50 border-transparent"
            }`}
          >
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Price per share</span>
              <span className="font-medium text-slate-900">
                ${currentPrice.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-200/50">
              <span>Estimated Total</span>
              <span
                className={!canAfford && type === "buy" ? "text-rose-600" : ""}
              >
                $
                {totalCost.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
            {!canAfford && type === "buy" && (
              <div className="flex items-center gap-1 text-xs text-rose-600 pt-1">
                <AlertCircle size={12} />
                <span>Insufficient funds</span>
              </div>
            )}
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleSubmit}
          disabled={!canAfford && type === "buy"}
          className={`w-full py-3 rounded-lg font-bold text-white shadow-sm transition-colors 
              ${
                type === "buy"
                  ? canAfford
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-slate-300 cursor-not-allowed"
                  : "bg-rose-600 hover:bg-rose-700"
              }`}
        >
          Confirm {type === "buy" ? "Buy" : "Sell"}
        </button>
      </div>
    </div>
  );
};
