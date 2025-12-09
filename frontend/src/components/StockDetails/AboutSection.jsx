import React from "react";

const AboutSection = ({ stock }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
      <h3 className="text-lg font-bold text-slate-900 mb-3">
        About {stock.name}
      </h3>
      <p className="text-slate-600 leading-relaxed">{stock.description}</p>
    </div>
  );
};

export default AboutSection;
