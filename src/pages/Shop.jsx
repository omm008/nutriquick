import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom"; // Import Router hooks
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

const Shop = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 1. DERIVE FILTER STATE FROM URL (Source of Truth)
  const getActiveFilter = () => {
    if (location.pathname.includes("/nutriquick")) return "nutriquick";
    if (location.pathname.includes("/affinito")) return "affinito";
    return "all";
  };

  const activeFilter = getActiveFilter();
  const [filteredProducts, setFilteredProducts] = useState(products);

  // 2. SYNC PRODUCTS WHEN URL CHANGES
  useEffect(() => {
    if (activeFilter === "all") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((p) => p.brand === activeFilter));
    }
  }, [activeFilter]); // Re-run whenever URL derived filter changes

  // 3. HANDLER TO UPDATE URL
  const handleFilterClick = (filterType) => {
    if (filterType === "all") {
      navigate("/shop");
    } else {
      navigate(`/shop/${filterType}`);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 pt-32 pb-24 px-4 md:px-12">
      {/* --- HEADER & FILTERS --- */}
      <div className="max-w-7xl mx-auto mb-16 flex flex-col md:flex-row justify-between items-end gap-8">
        <div>
          <h1 className="text-5xl md:text-7xl font-serif text-stone-900 mb-4">
            {getActiveFilter() === "nutriquick"
              ? "NutriQuick"
              : getActiveFilter() === "affinito"
                ? "Affinito"
                : " All Products"}
          </h1>
          <p className="text-stone-500 max-w-md text-lg">
            Curated essentials for the modern traveler. Whether you need a full
            meal or a power snack, we've got you packed.
          </p>
        </div>

        {/* Filter Tabs (Now updates URL) */}
        <div className="flex gap-2 bg-stone-200 p-1 rounded-full">
          {["all", "nutriquick", "affinito"].map((f) => (
            <button
              key={f}
              onClick={() => handleFilterClick(f)}
              className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-widest transition-all duration-300 ${
                activeFilter === f
                  ? "bg-white text-stone-900 shadow-sm"
                  : "text-stone-500 hover:text-stone-700"
              }`}
            >
              {f === "all" ? "View All" : f}
            </button>
          ))}
        </div>
      </div>

      {/* --- PRODUCT GRID --- */}
      <div className="max-w-7xl mx-auto">
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-24 text-stone-400 flex flex-col items-center">
            <span className="text-4xl mb-2">🥕</span>
            <p>We are restocking the shelves!</p>
            <button
              onClick={() => navigate("/shop")}
              className="mt-4 text-orange-600 font-bold hover:underline"
            >
              View all products
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
