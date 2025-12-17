import React, { createContext, useState } from "react";

// Create the context
export const StockContext = createContext();

// Provider component
export const StockProvider = ({ children }) => {
  const [stocks, setStocks] = useState([]);

  const value = {
    stocks,
    setStocks,
  };

  return (
    <StockContext.Provider value={value}>{children}</StockContext.Provider>
  );
};
