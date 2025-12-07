import React from "react";
import { Cpu } from "lucide-react";

const AIAnalysis = ({ aiAnalysis, loadingAnalysis, onGenerateReport }) => {
  return (
    <div className="bg-linear-to-br from-indigo-50 to-blue-50 p-6 rounded-xl border border-indigo-100">
      <h3 className="text-lg font-bold text-indigo-900 mb-2 flex items-center gap-2">
        <Cpu size={20} className="text-indigo-600" />
        Gemini AI Insight
      </h3>

      {!aiAnalysis && !loadingAnalysis && (
        <div className="text-center py-4">
          <p className="text-sm text-indigo-700 mb-3">
            Get a quick AI-powered breakdown of this stock's potential.
          </p>
          <button
            onClick={onGenerateReport}
            className="px-4 py-2 bg-white text-indigo-600 border border-indigo-200 rounded-lg text-sm font-semibold hover:bg-indigo-50 transition-colors shadow-sm"
          >
            Generate Report
          </button>
        </div>
      )}

      {loadingAnalysis && (
        <div className="flex flex-col items-center justify-center py-6 text-indigo-500">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mb-2" />
          <span className="text-sm">Analyzing market data...</span>
        </div>
      )}

      {aiAnalysis && (
        <div className="prose prose-sm prose-indigo text-slate-700 mt-2">
          <div className="whitespace-pre-line leading-relaxed text-sm">
            {aiAnalysis}
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAnalysis;
