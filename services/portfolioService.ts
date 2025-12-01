import { PortfolioItem } from '../types';

const STORAGE_KEY = 'portfolio';
const CASH_KEY = 'user_cash_balance';
const INITIAL_CASH = 10000;

export const getPortfolio = (): PortfolioItem[] => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
};

export const savePortfolio = (portfolio: PortfolioItem[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(portfolio));
};

export const getCashBalance = (): number => {
  const stored = localStorage.getItem(CASH_KEY);
  return stored ? parseFloat(stored) : INITIAL_CASH;
};

export const updateCashBalance = (amount: number) => {
  localStorage.setItem(CASH_KEY, amount.toString());
};

export const executeTrade = (symbol: string, quantity: number, price: number, type: 'buy' | 'sell'): PortfolioItem[] => {
  const portfolio = getPortfolio();
  const cashBalance = getCashBalance();
  const tradeValue = quantity * price;
  const existingIndex = portfolio.findIndex(p => p.symbol === symbol);

  if (type === 'buy') {
    if (tradeValue > cashBalance) {
      throw new Error("Insufficient funds to complete this purchase.");
    }

    // Deduct cash
    updateCashBalance(cashBalance - tradeValue);

    if (existingIndex >= 0) {
      // Average down logic
      const item = portfolio[existingIndex];
      const totalCost = (item.quantity * item.avgBuyPrice) + tradeValue;
      const newQty = item.quantity + quantity;
      portfolio[existingIndex] = {
        ...item,
        quantity: newQty,
        avgBuyPrice: totalCost / newQty
      };
    } else {
      // New position
      portfolio.push({
        symbol,
        quantity,
        avgBuyPrice: price
      });
    }
  } else {
    // Sell logic
    if (existingIndex < 0) {
      throw new Error("You do not own this stock.");
    }

    const item = portfolio[existingIndex];
    
    if (quantity > item.quantity) {
      throw new Error("Cannot sell more shares than you own.");
    }

    // Add cash
    updateCashBalance(cashBalance + tradeValue);

    const newQty = item.quantity - quantity;
    
    if (newQty <= 0) {
      // Closed position
      portfolio.splice(existingIndex, 1);
    } else {
      // Reduced position
      portfolio[existingIndex] = { ...item, quantity: newQty };
    }
  }
  
  savePortfolio(portfolio);
  return portfolio;
};

export const getHolding = (symbol: string): PortfolioItem | undefined => {
    const portfolio = getPortfolio();
    return portfolio.find(p => p.symbol === symbol);
}