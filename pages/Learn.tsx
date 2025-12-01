import React, { useState } from 'react';
import { BookOpen, HelpCircle, GraduationCap, ChevronRight, Zap } from 'lucide-react';
import { getAILearningContent } from '../services/geminiService';

const TopicCard: React.FC<{ title: string; desc: string; onClick: () => void }> = ({ title, desc, onClick }) => (
  <div onClick={onClick} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 cursor-pointer hover:shadow-md hover:border-blue-200 transition-all group">
    <div className="flex items-center justify-between mb-3">
      <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{title}</h3>
      <ChevronRight className="text-slate-300 group-hover:text-blue-500" size={20} />
    </div>
    <p className="text-sm text-slate-500">{desc}</p>
  </div>
);

const Learn: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleTopicClick = async (topic: string) => {
    setSelectedTopic(topic);
    setLoading(true);
    setContent(""); // Clear previous
    const result = await getAILearningContent(topic);
    setContent(result);
    setLoading(false);
  };

  const topics = [
    { title: "Stock Market Basics", desc: "What is a stock? How do exchanges work?" },
    { title: "Dividends vs. Growth", desc: "Understanding different investing strategies." },
    { title: "Market Capitalization", desc: "Large cap, mid cap, and small cap explained." },
    { title: "P/E Ratio", desc: "How to value a company relative to its earnings." },
    { title: "Bull vs. Bear Markets", desc: "Understanding market cycles and trends." },
    { title: "Risk Management", desc: "Diversification and protecting your portfolio." }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-8rem)]">
      
      {/* Left: Topics List */}
      <div className="overflow-y-auto pr-2 space-y-6">
        <div>
           <h1 className="text-3xl font-bold text-slate-900 mb-2">Investment Academy</h1>
           <p className="text-slate-500">Master the markets with simple, AI-curated lessons.</p>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          {topics.map(t => (
            <TopicCard key={t.title} title={t.title} desc={t.desc} onClick={() => handleTopicClick(t.title)} />
          ))}
        </div>

        <div className="bg-blue-600 rounded-xl p-6 text-white mt-8">
           <div className="flex items-center gap-2 mb-3">
              <Zap size={24} className="text-yellow-300" />
              <h3 className="text-lg font-bold">Pro Tip</h3>
           </div>
           <p className="text-blue-100 text-sm leading-relaxed">
             Consistent investing over time (Dollar Cost Averaging) often beats trying to time the market. Focus on long-term value!
           </p>
        </div>
      </div>

      {/* Right: Content Viewer */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
         {selectedTopic ? (
           <div className="flex-1 p-8 overflow-y-auto">
             <div className="flex items-center gap-3 mb-6">
               <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                 <GraduationCap size={24} />
               </div>
               <h2 className="text-2xl font-bold text-slate-900">{selectedTopic}</h2>
             </div>
             
             {loading ? (
               <div className="space-y-4 animate-pulse">
                 <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                 <div className="h-4 bg-slate-200 rounded w-full"></div>
                 <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                 <div className="h-4 bg-slate-200 rounded w-full"></div>
               </div>
             ) : (
               <div className="prose prose-slate max-w-none">
                 <div className="markdown-content text-slate-700 leading-7">
                    {/* Basic Markdown rendering replacement for safety/simplicity */}
                    {content.split('\n').map((line, i) => {
                       if (line.startsWith('##')) return <h3 key={i} className="text-lg font-bold mt-6 mb-2 text-slate-900">{line.replace('##', '')}</h3>;
                       if (line.startsWith('*') || line.startsWith('-')) return <li key={i} className="ml-4 text-slate-600">{line.replace(/[*|-]/, '')}</li>;
                       return <p key={i} className="mb-4">{line}</p>;
                    })}
                 </div>
               </div>
             )}
           </div>
         ) : (
           <div className="flex-1 flex flex-col items-center justify-center text-center p-8 text-slate-400">
             <BookOpen size={48} className="mb-4 text-slate-300" />
             <p className="text-lg font-medium text-slate-500">Select a topic to start learning</p>
             <p className="text-sm">Content is generated by Gemini AI for personalized explanations.</p>
           </div>
         )}
      </div>

    </div>
  );
};

export default Learn;
