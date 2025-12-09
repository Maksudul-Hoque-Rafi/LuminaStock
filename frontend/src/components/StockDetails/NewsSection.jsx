import React from "react";
import { Newspaper, Clock } from "lucide-react";

const NewsSection = ({ stockNews, loadingNews, stock }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
      <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
        <Newspaper size={20} className="text-blue-600" />
        Recent News
      </h3>
      <div className="space-y-4">
        {loadingNews ? (
          <div className="animate-pulse space-y-4">
            <div className="h-16 bg-slate-100 rounded-lg" />
            <div className="h-16 bg-slate-100 rounded-lg" />
          </div>
        ) : stockNews.length > 0 ? (
          stockNews.map((news, i) => (
            <a
              key={i}
              href={
                news.url ||
                `https://www.google.com/search?q=${encodeURIComponent(
                  news.title
                )}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="group cursor-pointer block"
            >
              <h4 className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 mb-1 leading-snug hover:underline">
                {news.title}
              </h4>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span>{news.source}</span>
                <span>•</span>
                <span className="flex items-center gap-0.5">
                  <Clock size={10} /> {news.time}
                </span>
              </div>
            </a>
          ))
        ) : (
          <div className="text-sm text-slate-500">
            No recent news available.
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsSection;
