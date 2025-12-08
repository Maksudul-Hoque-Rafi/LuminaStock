import { createBrowserRouter } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import StockDetails from "./pages/StockDetails";
import Portfolio from "./pages/Portfolio";
import Screener from "./pages/Screener";
import Learn from "./pages/Learn";
import News from "./pages/News";
import Watchlist from "./pages/Watchlist";
import Login from "./pages/Login";
import Register from "./pages/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    errorElement: <div>Not Found 404</div>,
    children: [
      { index: true, Component: Home },
      { path: "stock/:ticker", Component: StockDetails },
      { path: "portfolio", Component: Portfolio },
      { path: "screener", Component: Screener },
      { path: "learn", Component: Learn },
      { path: "news", Component: News },
      { path: "watchlist", Component: Watchlist },
      { path: "login", Component: Login },
      { path: "register", Component: Register },
    ],
  },
]);
