import React from "react";
import { ChevronRight } from "lucide-react";

const TopicCard = ({ title, desc, onClick }) => (
  <div
    onClick={onClick}
    className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 cursor-pointer hover:shadow-md hover:border-blue-200 transition-all group"
  >
    <div className="flex items-center justify-between mb-3">
      <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
        {title}
      </h3>
      <ChevronRight
        className="text-slate-300 group-hover:text-blue-500"
        size={20}
      />
    </div>
    <p className="text-sm text-slate-500">{desc}</p>
  </div>
);

const TopicsList = ({ topics, onSelectTopic }) => {
  return (
    <>
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Investment Academy
        </h1>
        <p className="text-slate-500">
          Master the markets with simple, AI-curated lessons.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {topics.map((t) => (
          <TopicCard
            key={t.title}
            title={t.title}
            desc={t.desc}
            onClick={() => onSelectTopic(t.title)}
          />
        ))}
      </div>
    </>
  );
};

export default TopicsList;
