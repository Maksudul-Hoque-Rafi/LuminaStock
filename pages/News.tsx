import React, { useEffect, useState } from 'react';
import { Newspaper, Clock, ExternalLink } from 'lucide-react';
import { getAIMarketNewsSummary } from '../services/geminiService';
import { NewsArticle } from '../types';

const News: React.FC = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const fetchedArticles = await getAIMarketNewsSummary();
        if (fetchedArticles.length > 0) {
          setArticles(fetchedArticles);
        } else {
          // Fallback if AI/Search fails
           throw new Error("No articles found");
        }
      } catch (e) {
        setArticles([
          {
            title: "Market Data Unavailable",
            summary: "Unable to retrieve real-time news at this moment. Please check your connection or API key.",
            source: "System",
            time: "Now",
            url: "#"
          }
        ]);
      }
      setLoading(false);
    };

    fetchNews();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
         <div className="p-3 bg-blue-100 rounded-xl text-blue-600">
            <Newspaper size={24} />
         </div>
         <div>
            <h1 className="text-3xl font-bold text-slate-900">Market News</h1>
            <p className="text-slate-500">Real-time updates powered by Google Search.</p>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
           // Skeletons
           Array(3).fill(0).map((_, i) => (
             <div key={i} className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm animate-pulse">
               <div className="h-4 bg-slate-200 rounded w-1/4 mb-4"></div>
               <div className="h-6 bg-slate-200 rounded w-3/4 mb-3"></div>
               <div className="h-4 bg-slate-200 rounded w-full mb-2"></div>
               <div className="h-4 bg-slate-200 rounded w-2/3"></div>
             </div>
           ))
        ) : (
          articles.map((article, index) => (
            <div key={index} className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col h-full">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-3 uppercase tracking-wide font-semibold">
                <span className="truncate max-w-[150px]">{article.source}</span>
                <span className="flex items-center gap-1 flex-shrink-0"><Clock size={12} /> {article.time}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3 leading-snug line-clamp-3">{article.title}</h3>
              <p className="text-sm text-slate-600 mb-6 flex-grow line-clamp-4">{article.summary}</p>
              <div className="pt-4 border-t border-slate-50">
                <a 
                  href={article.url || `https://www.google.com/search?q=${encodeURIComponent(article.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-sm font-medium flex items-center gap-1 hover:underline inline-flex"
                >
                  Read Full Story <ExternalLink size={14} />
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default News;
