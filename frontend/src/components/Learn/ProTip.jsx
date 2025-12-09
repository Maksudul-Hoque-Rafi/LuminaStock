import React from "react";
import { Zap } from "lucide-react";

const ProTip = () => {
  return (
    <div className="bg-blue-600 rounded-xl p-6 text-white mt-8">
      <div className="flex items-center gap-2 mb-3">
        <Zap size={24} className="text-yellow-300" />
        <h3 className="text-lg font-bold">Pro Tip</h3>
      </div>
      <p className="text-blue-100 text-sm leading-relaxed">
        Consistent investing over time (Dollar Cost Averaging) often beats
        trying to time the market. Focus on long-term value!
      </p>
    </div>
  );
};

export default ProTip;
