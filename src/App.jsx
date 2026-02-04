import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// --- COMPONENTS ---
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer";

// --- PAGES ---
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";

// --- PLACEHOLDER PAGE (For Shop, About, etc. until we build them) ---
const PlaceholderPage = ({ title }) => (
  <div className="min-h-screen bg-[#d7efff] flex flex-col items-center justify-center text-white pt-24">
    <h1 className="text-6xl md:text-9xl font-black tracking-tighter opacity-10">
      {title}
    </h1>
    <p className="mt-4 text-orange-500 font-mono text-sm uppercase tracking-widest animate-pulse">
      Coming Soon
    </p>
  </div>
);

const App = () => {
  return (
    <Router>
      {/* 1. Utility: Reset scroll position on route change */}
      <ScrollToTop />

      {/* 2. Persistent Navigation (Stays on all pages) */}
      <Navbar />

      {/* 3. Page Routing */}
      <Routes>
        {/* LANDING PAGE */}
        <Route path="/" element={<Home />} />

        {/* OTHER PAGES (Using Placeholders for now) */}
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/nutriquick" element={<Shop />} />
        <Route path="/shop/affinito" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/about" element={<PlaceholderPage title="OUR STORY" />} />
        <Route path="/contact" element={<PlaceholderPage title="CONTACT" />} />

        {/* ACTIONS */}
        <Route path="/cart" element={<PlaceholderPage title="YOUR CART" />} />
        <Route path="/register" element={<PlaceholderPage title="JOIN US" />} />

        {/* 404 - Fallback */}
        <Route path="*" element={<PlaceholderPage title="404" />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
