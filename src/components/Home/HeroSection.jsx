import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 sm:p-12 text-white overflow-hidden shadow-lg">
      <div className="relative z-10 max-w-2xl">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">
          Master the Markets with AI Precision
        </h1>
        <p className="text-blue-100 text-lg mb-8">
          Real-time tracking, intelligent portfolio management, and AI-driven
          insights to help you make smarter investment decisions.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/screener"
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Find Stocks
          </Link>
          <Link
            to="/learn"
            className="bg-blue-500 bg-opacity-30 backdrop-blur-sm border border-blue-400 text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-40 transition-colors"
          >
            Start Learning
          </Link>
        </div>
      </div>
      {/* Abstract shapes */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-0 right-20 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
    </div>
  );
};

export default HeroSection;
