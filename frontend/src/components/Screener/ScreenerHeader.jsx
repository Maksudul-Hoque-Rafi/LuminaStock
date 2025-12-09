import React from "react";

const ScreenerHeader = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <h1 className="text-3xl font-bold text-slate-900">Stock Screener</h1>
      <p className="text-slate-500">Find your next investment opportunity.</p>
    </div>
  );
};

export default ScreenerHeader;
