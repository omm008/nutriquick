import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRightIcon, StarIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

// --- PLACEHOLDER IMPORTS (Replace with your actual paths) ---
import mangoImg from "../assets/affinito/mango-bites1.jpeg";
import jamunImg from "../assets/affinito/jamun-bites1.jpeg";
import strawberryImg from "../assets/affinito/strawberry-bites1.jpeg";

// Using URLs for demo - replace src in the data array below with imports above
const stickers = [
  {
    id: 1,
    src: mangoImg,
    alt: "Mango",
    rot: -6,
    x: "10%",
    y: "10%",
    scale: 1,
    tag: "King of Fruits",
  },
  {
    id: 2,
    src: strawberryImg,
    alt: "Strawberry",
    rot: 12,
    x: "60%",
    y: "20%",
    scale: 1.1,
    tag: "Berry Blast",
  },
  {
    id: 3,

    src: jamunImg,
    alt: "Jamun",
    rot: -15,
    x: "30%",
    y: "55%",
    scale: 0.9,
    tag: "Purple Gold",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1615485925763-867862f85410?q=80&w=400&auto=format&fit=crop", // Replace with sitafalImg
    alt: "Sitafal",
    rot: 8,
    x: "75%",
    y: "60%",
    scale: 1.2,
    tag: "Creamy!",
  },
];

const AffinitoSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax for the stickers (they move slightly as you scroll)
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[90vh] bg-[#f8f5f2] overflow-hidden flex flex-col md:flex-row items-center py-24 md:py-0"
    >
      {/* --- BACKGROUND PATTERN (Dot Grid) --- */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      ></div>

      {/* --- LEFT: TYPOGRAPHY --- */}
      <div className="w-full md:w-1/2 px-6 md:pl-24 z-10 flex flex-col justify-center items-start h-full">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
        >
          <StarIcon className="w-4 h-4" /> The Fun Stuff
        </motion.div>

        <h2 className="text-6xl md:text-9xl font-black text-stone-900 leading-[0.9] tracking-tighter mb-8">
          NATURE.
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500">
            POPPED.
          </span>
        </h2>

        <p className="text-xl text-stone-600 font-medium max-w-md mb-10">
          Freeze-dried fruit bites. Zero junk. 100% Crunch. It's fruit that
          listens to pop music.
        </p>

        <Link to="/shop/affinito">
          <button className="group relative px-8 py-4 bg-stone-900 text-white font-bold rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
            <span className="relative z-10 flex items-center gap-2">
              Shop The Crunch{" "}
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            {/* Button Hover Fill */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-rose-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
          </button>
        </Link>
      </div>

      {/* --- RIGHT: THE STICKER WALL --- */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-screen relative mt-12 md:mt-0">
        <motion.div style={{ y }} className="w-full h-full relative">
          {stickers.map((sticker, index) => (
            <motion.div
              key={sticker.id}
              initial={{ scale: 0, rotate: 0 }}
              whileInView={{ scale: sticker.scale, rotate: sticker.rot }}
              whileHover={{ scale: sticker.scale * 1.1, rotate: 0, zIndex: 50 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: index * 0.1,
              }}
              viewport={{ once: true, margin: "-100px" }}
              className="absolute cursor-pointer drop-shadow-2xl"
              style={{
                left: sticker.x,
                top: sticker.y,
                // Mobile Adjustment: center them more if screen is small
                "@media (max-width: 768px)": {
                  left: "50%",
                  transform: "translateX(-50%)",
                },
              }}
            >
              {/* The "Sticker" Look: White Border + Shadow */}
              <div className="relative p-2 bg-white rounded-2xl shadow-sm rotate-1 group">
                <img
                  src={sticker.src}
                  alt={sticker.alt}
                  className="w-32 h-32 md:w-56 md:h-56 object-cover rounded-xl"
                />

                {/* "Crunch" Tooltip on Hover */}
                <div className="absolute -top-4 -right-4 bg-yellow-400 text-stone-900 text-xs font-black uppercase px-3 py-1 rounded-full shadow-lg opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 transition-all rotate-12 whitespace-nowrap">
                  {sticker.tag}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AffinitoSection;
