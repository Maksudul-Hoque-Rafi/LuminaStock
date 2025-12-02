import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
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

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stock/:ticker" element={<StockDetails />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/screener" element={<Screener />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/news" element={<News />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;


