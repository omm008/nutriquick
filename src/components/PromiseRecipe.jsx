import React, { useRef } from "react";
import { gsap } from "gsap";
import { ArrowLongRightIcon } from "@heroicons/react/24/solid";
import dal from "../assets/biryani.png"; // Ensure this path is correct

const PromiseRecipe = () => {
  const bgImageRef = useRef(null);
  const containerRef = useRef(null);

  // --- INTERACTION: REVEAL REWARD (Step 3) ---
  const handleFinalStepEnter = () => {
    // 1. Show the Delicious Food BG
    gsap.to(bgImageRef.current, {
      opacity: 1,
      duration: 0.5,
      ease: "power2.out",
    });
    // 2. Make text white to pop over the image
    gsap.to(containerRef.current, { color: "#ffffff", duration: 0.3 });
    // 3. Fade out the previous steps slightly to focus on "Eat"
    gsap.to(".step-item", { opacity: 0.5, duration: 0.3 });
  };

  const handleFinalStepLeave = () => {
    // Revert to clean state
    gsap.to(bgImageRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
    });
    gsap.to(containerRef.current, { color: "#1c1917", duration: 0.3 });
    gsap.to(".step-item", { opacity: 1, duration: 0.3 });
  };

  // --- INTERACTION: SIMPLE HIGHLIGHT (Steps 1 & 2) ---
  const handleStepEnter = (e) => {
    gsap.to(e.currentTarget, {
      x: 10, // Slight shift right
      color: "#ea580c", // Orange-600
      duration: 0.2,
      ease: "power2.out",
    });
  };

  const handleStepLeave = (e) => {
    gsap.to(e.currentTarget, {
      x: 0,
      color: "currentColor", // Back to inherited color
      duration: 0.2,
      ease: "power2.out",
    });
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#F4F1EA]">
      {/* --- BACKGROUND LAYER (The Reward) --- */}
      <div
        ref={bgImageRef}
        className="absolute inset-0 opacity-0 pointer-events-none z-0"
      >
        <div className="absolute inset-0 bg-black/60 z-10" />
        <img
          src={dal}
          alt="Delicious Dal Makhani"
          className="w-full h-full object-cover"
        />
      </div>

      {/* --- CONTENT LAYER --- */}
      <div
        ref={containerRef}
        className="relative z-20 max-w-4xl w-full px-6 transition-colors duration-300 text-stone-900"
      >
        {/* Header */}
        <div className="border-b-2 border-current pb-6 mb-12 flex justify-between items-end">
          <div>
            <span className="uppercase tracking-widest text-sm font-bold opacity-60">
              The Ritual
            </span>
            <h2 className="text-5xl md:text-7xl font-serif mt-2">
              Ready in 5.
            </h2>
          </div>
          <div className="text-right hidden md:block">
            <p className="font-bold text-xl">0% Cooking</p>
            <p className="font-bold text-xl text-orange-600">100% Taste</p>
          </div>
        </div>

        {/* The 3 Steps */}
        <ul className="space-y-8 md:space-y-10 text-3xl md:text-5xl font-light">
          {/* STEP 1: POUR */}
          <li
            onMouseEnter={handleStepEnter}
            onMouseLeave={handleStepLeave}
            className="step-item flex items-center gap-6 cursor-default transition-opacity"
          >
            <span className="text-lg font-bold border border-current rounded-full w-10 h-10 flex items-center justify-center shrink-0">
              1
            </span>
            <span>Pour hot water.</span>
          </li>

          {/* STEP 2: MIX */}
          <li
            onMouseEnter={handleStepEnter}
            onMouseLeave={handleStepLeave}
            className="step-item flex items-center gap-6 cursor-default transition-opacity"
          >
            <span className="text-lg font-bold border border-current rounded-full w-10 h-10 flex items-center justify-center shrink-0">
              2
            </span>
            <span>Mix & Cover (5 min).</span>
          </li>

          {/* STEP 3: EAT (The Hero Interaction) */}
          <li
            onMouseEnter={handleFinalStepEnter}
            onMouseLeave={handleFinalStepLeave}
            className="flex items-center gap-6 cursor-pointer group origin-left transition-transform duration-300 hover:scale-105"
          >
            <span className="text-lg font-bold bg-orange-600 text-white rounded-full w-10 h-10 flex items-center justify-center shrink-0 shadow-lg group-hover:bg-green-500 transition-colors">
              3
            </span>
            <span className="font-bold border-b-4 border-orange-500 group-hover:border-green-500 transition-colors">
              Eat & Enjoy.
            </span>
            <ArrowLongRightIcon className="w-10 h-10 text-orange-600 group-hover:translate-x-4 transition-transform group-hover:text-green-500" />
          </li>
        </ul>

        {/* Footer Note */}
        <div className="mt-20 opacity-60 text-sm tracking-widest uppercase">
          * Caution: May cause sudden happiness.
        </div>
      </div>
    </section>
  );
};

export default PromiseRecipe;
