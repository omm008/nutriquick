import React, { useState } from "react";
import { motion } from "framer-motion";
import { PlusIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <Link to={`/product/${product.id}`} className="group relative block">
      {/* --- IMAGE CONTAINER --- */}
      <div
        className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-stone-100"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* New Badge */}
        {product.isNew && (
          <span className="absolute top-3 left-3 z-20 bg-orange-600 text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm">
            New
          </span>
        )}

        {/* Brand Tag */}
        <span className="absolute top-3 right-3 z-20 bg-white/80 backdrop-blur-sm text-stone-900 text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full">
          {product.brand}
        </span>

        {/* Main Image (Lazy Loaded with Blur) */}
        <motion.img
          src={isHovered && product.image2 ? product.image2 : product.image1}
          alt={product.name}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          animate={{
            opacity: isLoaded ? 1 : 0,
            scale: isHovered ? 1.05 : 1,
            filter: isLoaded ? "blur(0px)" : "blur(10px)",
          }}
          transition={{ duration: 0.5 }}
          className="h-full w-full object-cover object-center transition-transform duration-500"
        />

        {/* Quick Add Button (Visible on Hover) */}
        <button className="absolute bottom-4 right-4 z-20 bg-white text-stone-900 p-3 rounded-full shadow-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-orange-600 hover:text-white">
          <PlusIcon className="w-5 h-5" />
        </button>
      </div>

      {/* --- PRODUCT INFO --- */}
      <div className="mt-4 flex justify-between items-start">
        <div>
          <h3 className="text-lg font-serif font-medium text-stone-900 group-hover:text-orange-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-stone-500">{product.tagline}</p>
        </div>
        <p className="text-lg font-bold text-stone-900">₹{product.price}</p>
      </div>
      <p className="text-xs text-stone-400 mt-1">{product.weight}</p>
    </Link>
  );
};

export default ProductCard;
