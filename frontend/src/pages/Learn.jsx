import React, { useState } from "react";
import { getAILearningContent } from "../services/geminiService";
import TopicsList from "../components/Learn/TopicsList";
import ContentViewer from "../components/Learn/ContentViewer";
import ProTip from "../components/Learn/ProTip";

const Learn = () => {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTopicClick = async (topic) => {
    setSelectedTopic(topic);
    setLoading(true);
    setContent(""); // Clear previous
    const result = await getAILearningContent(topic);
    setContent(result);
    setLoading(false);
  };

  const topics = [
    {
      title: "Stock Market Basics",
      desc: "What is a stock? How do exchanges work?",
    },
    {
      title: "Dividends vs. Growth",
      desc: "Understanding different investing strategies.",
    },
    {
      title: "Market Capitalization",
      desc: "Large cap, mid cap, and small cap explained.",
    },
    {
      title: "P/E Ratio",
      desc: "How to value a company relative to its earnings.",
    },
    {
      title: "Bull vs. Bear Markets",
      desc: "Understanding market cycles and trends.",
    },
    {
      title: "Risk Management",
      desc: "Diversification and protecting your portfolio.",
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-8rem)]">
      {/* Left: Topics List */}
      <div className="overflow-y-auto pr-2 space-y-6">
        <TopicsList topics={topics} onSelectTopic={handleTopicClick} />
        <ProTip />
      </div>

      {/* Right: Content Viewer */}
      <ContentViewer
        selectedTopic={selectedTopic}
        content={content}
        loading={loading}
      />
    </div>
  );
};

export default Learn;
