import React, { createContext, useState } from "react";

// Create the context
export const StockContext = createContext();

// Provider component
export const StockProvider = ({ children }) => {
  const [stockInfo, setStockInfo] = useState([]);

  // Function to update stock info
  const updateStockInfo = (newStockInfo) => {
    setStockInfo(newStockInfo);
  };

  const value = {
    stockInfo,
    setStockInfo: updateStockInfo,
  };

  return (
    <StockContext.Provider value={value}>{children}</StockContext.Provider>
  );
};
