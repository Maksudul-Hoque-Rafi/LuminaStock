import Navbar from "./Navbar";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
      <footer className="bg-white border-t border-slate-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-slate-500 text-sm">
            © {new Date().getFullYear()} LuminaStock. For educational purposes
            only. Market data is simulated.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
