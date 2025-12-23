import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import {
  LayoutDashboard,
  TrendingUp,
  PieChart,
  Search,
  BookOpen,
  Newspaper,
  Menu,
  X,
  Star,
  LogIn,
  UserPlus,
} from "lucide-react";
import { AuthContext } from "../contexts/AuthContext";
import apiRequest from "../lib/apiRequest";

const Navbar = () => {
  const { currentUser, updateUser } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", path: "/", icon: <LayoutDashboard size={18} /> },
    { name: "Screener", path: "/screener", icon: <Search size={18} /> },
    { name: "Portfolio", path: "/portfolio", icon: <PieChart size={18} /> },
    { name: "Watchlist", path: "/watchlist", icon: <Star size={18} /> },
    { name: "News", path: "/news", icon: <Newspaper size={18} /> },
    { name: "Learn", path: "/learn", icon: <BookOpen size={18} /> },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");
      updateUser(null);
      if (
        location.pathname === "/portfolio" ||
        location.pathname === "/watchlist"
      ) {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="shrink-0 flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                L
              </div>
              <span className="font-bold text-xl text-slate-900 tracking-tight">
                LuminaStock
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`${
                  (item.name === "Portfolio" || item.name === "Watchlist") &&
                  !currentUser
                    ? "hidden"
                    : "flex"
                } items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? "text-blue-600 bg-blue-50"
                    : "text-slate-600 hover:text-blue-600 hover:bg-slate-50"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            {currentUser ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <img src="/user.png" alt="user image" className="w-8 h-8" />
                  <p>{currentUser.username}</p>
                </div>
                <button
                  className="cursor-pointer px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors shadow-sm"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-md transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors shadow-sm"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`${
                  (item.name === "Portfolio" || item.name === "Watchlist") &&
                  !currentUser
                    ? "hidden"
                    : "flex"
                } items-center gap-3 px-3 py-3 rounded-md text-base font-medium ${
                  isActive(item.path)
                    ? "text-blue-600 bg-blue-50"
                    : "text-slate-600 hover:text-blue-600 hover:bg-slate-50"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
            <div className="border-t border-slate-100 my-2 pt-2">
              {currentUser ? (
                <div className="flex flex-col items-start  gap-4">
                  <div className="flex items-center gap-1.5">
                    <img src="/user.png" alt="user image" className="w-8 h-8" />
                    <p>{currentUser.username}</p>
                  </div>
                  <button
                    className="cursor-pointer px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors shadow-sm"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div>
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-3 py-3 rounded-md text-base font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-50"
                  >
                    <LogIn size={18} /> Sign In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-3 py-3 rounded-md text-base font-medium text-blue-600 hover:bg-blue-50"
                  >
                    <UserPlus size={18} /> Create Account
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
