import React, { useEffect, useRef } from "react";
import Lenis from "lenis"; // Import core lenis
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import {
  ArrowRightIcon,
  StarIcon,
  CheckBadgeIcon,
  FireIcon,
} from "@heroicons/react/24/solid";

import affinitoImg from "../assets/jamun.png";
import HeroSuction from "../components/HeroSuction";
import PromiseRecipe from "../components/PromiseRecipe";
import Testimonials from "../components/Testimonials";
import AffinitoSection from "../components/AffinitoSection";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 2. Sync GSAP with Lenis
    lenis.on("scroll", ScrollTrigger.update);

    // 3. GSAP Animations
    const ctx = gsap.context(() => {
      gsap.from(".why-card", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: "#why-us",
          start: "top 70%",
        },
      });
    }, containerRef);

    return () => {
      lenis.destroy();
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className=" text-stone-900 font-sans w-[100vw] selection:bg-orange-200"
    >
      {/* --- HERO SECTION 1: The Emotional Connection (Parallax) --- */}
      <HeroSuction />

      {/* --- HERO SECTION 2: Affinito (High Contrast / Pop) --- */}
      <AffinitoSection />

      {/* --- HERO SECTION 3: The Promise (Clean & Minimal) --- */}
      <PromiseRecipe />

      {/* --- WHY US (Horizontal Scroll / Cards) --- */}
      <section id="why-us" className="py-32 bg-stone-900 text-stone-100 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="text-4xl md:text-7xl font-bold mb-4">
              WHY NUTRIQUICK?
            </h2>
            <p className="text-stone-400 text-xl max-w-2xl">
              We don't just sell food; we sell time, health, and a ticket back
              home.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="why-card bg-stone-800 p-8 rounded-2xl border border-stone-700 hover:border-orange-500 transition-colors">
              <FireIcon className="w-12 h-12 text-orange-500 mb-6" />
              <h4 className="text-2xl font-bold mb-4">Dehydration Tech</h4>
              <p className="text-stone-400">
                Our space-age dehydration retains 99% of nutrients while
                removing water weight. It's science, tasty science.
              </p>
            </div>
            {/* Card 2 */}
            <div className="why-card bg-stone-800 p-8 rounded-2xl border border-stone-700 hover:border-orange-500 transition-colors">
              <CheckBadgeIcon className="w-12 h-12 text-green-500 mb-6" />
              <h4 className="text-2xl font-bold mb-4">Clean Label</h4>
              <p className="text-stone-400">
                Read our back label. If you can't pronounce an ingredient, we
                don't put it in. No hidden nasties.
              </p>
            </div>
            {/* Card 3 */}
            <div className="why-card bg-stone-800 p-8 rounded-2xl border border-stone-700 hover:border-orange-500 transition-colors">
              <StarIcon className="w-12 h-12 text-yellow-500 mb-6" />
              <h4 className="text-2xl font-bold mb-4">Chef Curated</h4>
              <p className="text-stone-400">
                Recipes crafted by seasoned chefs, not machines. The taste of a
                mother's hand, preserved.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- REVIEWS (Marquee Style) --- */}
      <Testimonials />
    </div>
  );
};

export default Home;
