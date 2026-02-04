import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "../data/products";
import {
  StarIcon,
  MinusIcon,
  PlusIcon,
  HeartIcon,
  ArrowLongLeftIcon,
} from "@heroicons/react/24/solid";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description"); // description, ingredients, nutrition

  // 1. Fetch Product
  useEffect(() => {
    // In a real app, this would be an API call
    const found = products.find((p) => p.id === parseInt(id));
    setProduct(found);
    window.scrollTo(0, 0); // Reset scroll on load
  }, [id]);

  if (!product)
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  const bg = product.bg;
  const bgColorStyle = { backgroundColor: bg }; // Use inline style instead

  // 2. DYNAMIC BRAND THEMING
  const isAffinito = product.brand === "affinito";

  const theme = {
    bgStyle: bgColorStyle,
    textMain: isAffinito ? "text-rose-950" : "text-stone-900",
    textAccent: isAffinito ? "text-rose-600" : "text-orange-600",
    btnPrimary: isAffinito
      ? "bg-rose-600 hover:bg-rose-500"
      : "bg-orange-600 hover:bg-orange-500",
    btnSecondary: isAffinito
      ? "bg-rose-100 text-rose-800"
      : "bg-orange-100 text-orange-800",
    fontHead: isAffinito ? "font-sans tracking-tighter" : "font-serif",
    shape: isAffinito ? "rounded-3xl" : "rounded-xl", // Soft vs Sharp
  };

  return (
    <div
      className="min-h-screen pt-24 pb-12 transition-colors duration-500"
      style={theme.bgStyle}
    >
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <Link
          to="/shop"
          className={`inline-flex items-center gap-2 ${theme.textAccent} font-bold uppercase tracking-widest text-xs hover:gap-4 transition-all`}
        >
          <ArrowLongLeftIcon className="w-5 h-5" /> Back to Pantry
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* --- LEFT: VISUAL GALLERY --- */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="sticky top-32"
        >
          <div
            className={`relative aspect-square w-full overflow-hidden ${theme.shape} shadow-xl border-4 border-white`}
            style={theme.bgStyle}
          >
            {/* Brand Watermark */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl font-black opacity-[0.03] pointer-events-none uppercase whitespace-nowrap">
              {product.brand}
            </div>

            <img
              src={product.image1}
              alt={product.name}
              className="relative w-full h-full object-cover z-10 hover:scale-110 transition-transform duration-700 cursor-zoom-in"
            />

            {/* Floating Badge */}
            {product.isNew && (
              <div
                className={`absolute top-6 left-6 z-20 ${theme.btnPrimary} text-white px-4 py-1 font-bold uppercase text-xs tracking-widest shadow-lg`}
              >
                New Arrival
              </div>
            )}
          </div>

          {/* Thumbnail Strip (Placeholder logic) */}
          <div className="flex gap-4 mt-6">
            {[product.image1, product.image2].map((img, i) => (
              <div
                key={i}
                className={`w-24 h-24 border-2 ${i === 0 ? "border-stone-900" : "border-transparent"} rounded-lg overflow-hidden cursor-pointer opacity-80 hover:opacity-100`}
              >
                <img
                  src={img}
                  alt="Thumb"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* --- RIGHT: PRODUCT DETAILS --- */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Header */}
          <div className="mb-2 flex items-center gap-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="w-4 h-4" />
              ))}
            </div>
            <span className="text-xs font-bold opacity-50 uppercase tracking-widest">
              124 Reviews
            </span>
          </div>

          <h1
            className={`text-5xl md:text-7xl ${theme.fontHead} ${theme.textMain} mb-4 leading-none`}
          >
            {product.name}
          </h1>
          <p className="text-xl md:text-2xl text-stone-500 font-light mb-8 italic">
            {product.tagline}
          </p>

          {/* Price & Weight */}
          <div className="flex items-end gap-6 mb-8 border-b border-stone-200 pb-8">
            <span className={`text-4xl font-bold ${theme.textMain}`}>
              ₹{product.price}
            </span>
            <span className="text-lg text-stone-400 mb-1 line-through">
              ₹{product.price + 50}
            </span>
            <span
              className={`text-sm ${theme.btnSecondary} px-3 py-1 rounded-full font-bold mb-2`}
            >
              {product.weight}
            </span>
          </div>

          {/* Selector & Add to Cart */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            {/* Quantity */}
            <div className="flex items-center bg-white border border-stone-200 rounded-full px-4 py-2 w-fit shadow-sm">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 hover:text-orange-600 transition-colors"
              >
                <MinusIcon className="w-4 h-4" />
              </button>
              <span className="w-12 text-center font-bold text-lg">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 hover:text-orange-600 transition-colors"
              >
                <PlusIcon className="w-4 h-4" />
              </button>
            </div>

            {/* Add Button */}
            <button
              className={`flex-1 ${theme.btnPrimary} text-white font-bold text-lg py-4 px-8 rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex justify-center items-center gap-3`}
            >
              Add to Cart — ₹{product.price * quantity}
            </button>

            {/* Wishlist */}
            <button className="p-4 bg-white border border-stone-200 rounded-full hover:bg-red-50 hover:border-red-200 hover:text-red-500 transition-all group shadow-sm">
              <HeartIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </button>
          </div>

          {/* --- INFO TABS (Description / Ingredients) --- */}
          <div className="mb-12">
            <div className="flex gap-8 border-b border-stone-200 mb-6">
              {["description", "ingredients", "nutrition"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 text-sm font-bold uppercase tracking-widest transition-colors relative ${
                    activeTab === tab
                      ? theme.textMain
                      : "text-stone-400 hover:text-stone-600"
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div
                      layoutId="underline"
                      className={`absolute bottom-0 left-0 w-full h-1 ${theme.btnPrimary}`}
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="min-h-[150px] text-stone-600 leading-relaxed">
              {activeTab === "description" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <p className="mb-4">
                    Experience the authentic taste of {product.name}, crafted
                    using our advanced freeze-drying technology. We remove the
                    water but keep the cellular structure of the food intact.
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>No Preservatives</li>
                    <li>100% Natural Ingredients</li>
                    <li>Shelf Life: 12 Months</li>
                    <li>Ready in minutes (or seconds!)</li>
                  </ul>
                </motion.div>
              )}
              {activeTab === "ingredients" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <p>
                    Premium {product.name} (99%), A pinch of love (1%). Nothing
                    else.
                  </p>
                  <div className="mt-4 flex gap-4">
                    {/* Mock Icons */}
                    <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-xs font-bold border border-stone-100">
                      100%
                      <br />
                      Veg
                    </div>
                    <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-xs font-bold border border-stone-100">
                      No
                      <br />
                      MSG
                    </div>
                  </div>
                </motion.div>
              )}
              {activeTab === "nutrition" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <table className="w-full text-sm text-left">
                    <thead className="uppercase text-xs text-stone-400 border-b">
                      <tr>
                        <th className="py-2">Nutrient</th>
                        <th className="py-2">Per 100g</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-stone-100">
                        <td className="py-2 font-bold">Energy</td>
                        <td className="py-2">380 Kcal</td>
                      </tr>
                      <tr className="border-b border-stone-100">
                        <td className="py-2 font-bold">Protein</td>
                        <td className="py-2">12g</td>
                      </tr>
                      <tr className="border-b border-stone-100">
                        <td className="py-2 font-bold">Carbs</td>
                        <td className="py-2">64g</td>
                      </tr>
                    </tbody>
                  </table>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* --- RELATED PRODUCTS (Simple Grid) --- */}
      <div className="max-w-7xl mx-auto px-6 mt-24 border-t border-stone-200 pt-16">
        <h3 className={`text-3xl ${theme.fontHead} mb-8`}>
          You might also like
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Show 4 other products, excluding current */}
          {products
            .filter((p) => p.id !== product.id)
            .slice(0, 4)
            .map((p) => (
              <Link key={p.id} to={`/product/${p.id}`} className="group block">
                <div
                  className={`aspect-[4/5] bg-white rounded-xl overflow-hidden mb-4 relative ${theme.shape}`}
                >
                  <img
                    src={p.image1}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h4 className="font-bold text-lg">{p.name}</h4>
                <span className="text-stone-500">₹{p.price}</span>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
