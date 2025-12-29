import React, { useContext } from "react";
import { Link } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";

const QuickLinks = () => {
  const { currentUser } = useContext(AuthContext);
  const links = [
    {
      to: "/portfolio",
      title: "Your Portfolio",
      desc: "Track your investments and visualize wealth growth.",
    },
    {
      to: "/news",
      title: "Market News",
      desc: "Stay updated with the latest headlines and trends.",
    },
    {
      to: "/learn",
      title: "Learn to Trade",
      desc: "Educational resources to improve your strategy.",
    },
  ];

  const handleClick = (e, link) => {
    if (link.to === "/portfolio" && !currentUser) {
      e.preventDefault();
      alert("Please log in first !!");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {links.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          onClick={(e) => handleClick(e, link)}
          className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all group"
        >
          <h3 className="font-bold text-slate-900 mb-2 group-hover:text-blue-600">
            {link.title}
          </h3>
          <p className="text-sm text-slate-600">{link.desc}</p>
        </Link>
      ))}
    </div>
  );
};

export default QuickLinks;
