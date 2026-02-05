import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import pouch from "../assets/pouch.png";
import pao from "../assets/pao-bhaji.png";
import khichdi from "../assets/khichdi.png";
import biryani from "../assets/biryani.png";
import rajma from "../assets/rajma.png";
import dal_makhani from "../assets/dal-makhani.png";

gsap.registerPlugin(ScrollTrigger);

const HeroSuction = () => {
  const sectionRef = useRef(null);
  const pouchRef = useRef(null);
  const textRef = useRef(null);
  const initialTitleRef = useRef(null); // 1. New Ref for the starting text

  const dishes = [
    { name: "Pav Bhaji", img: pao, x: "-30vw", y: "-20vh", rot: -15 },
    { name: "Dal Makhani", img: dal_makhani, x: "35vw", y: "-25vh", rot: 10 },
    { name: "Biryani", img: biryani, x: "-35vw", y: "25vh", rot: 20 },
    { name: "Rajma", img: rajma, x: "30vw", y: "20vh", rot: -10 },
    { name: "Paneer", img: khichdi, x: "0vw", y: "-35vh", rot: 0 },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=150%",
          scrub: 1,
          pin: true,
        },
      });

      // --- ANIMATION SEQUENCE ---

      // 0. INITIAL TEXT: Fades out immediately as scroll starts
      // The '<' ensures it starts at the same time as the dishes moving
      tl.to(
        initialTitleRef.current,
        {
          opacity: 0,
          scale: 0.8,
          duration: 0.5,
          ease: "power1.out",
        },
        0,
      );

      // 1. SUCK EFFECT: Dishes move to center
      tl.to(
        ".dish-item",
        {
          x: 0,
          y: 0,
          scale: 0.1,
          opacity: 0,
          rotation: 360,
          duration: 2,
          ease: "power2.inOut",
        },
        0,
      ); // Synchronized start

      // 2. IMPACT: Pouch Appears
      tl.fromTo(
        pouchRef.current,
        { scale: 0, opacity: 0, rotation: -10 },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 0.5,
          ease: "back.out(1.7)",
        },
      );

      // 3. REVEAL: Final Tagline comes in
      tl.fromTo(
        textRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full bg-[#d7efff] overflow-hidden flex flex-col items-center justify-center"
    >
      {/* --- 2. NEW: Initial Central Text (Fills the void) --- */}
      <div
        ref={initialTitleRef}
        className="absolute inset-0 flex flex-col items-center justify-center z-0 pointer-events-none"
      >
        <h2 className="text-[10vw] text-[#05472a] md:text-[8rem] font-black  leading-none tracking-tighter ">
          NUTRI<span className="text-[#f8de7e]">QUICK</span>
        </h2>
        <p className="text-xl md:text-3xl font-serif text-[#2c5c85] mt-4 font-bold tracking-widest uppercase">
          Scroll to Pack
        </p>
      </div>

      {/* --- Floating Dishes Layer --- */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        {dishes.map((dish, i) => (
          <div
            key={i}
            className="dish-item absolute w-32 h-32 md:w-56 md:h-56 rounded-full border-4 border-white shadow-2xl overflow-hidden bg-white"
            style={{
              transform: `translate(${dish.x}, ${dish.y}) rotate(${dish.rot}deg)`,
            }}
          >
            <img
              src={dish.img}
              alt={dish.name}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* --- Central Pouch --- */}
      <div ref={pouchRef} className="relative z-20 w-64 md:w-80 opacity-0">
        <img
          src={pouch}
          alt="Nutriquick Pouch"
          className="w-full drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-xl"
        />
      </div>

      {/* --- Final Tagline --- */}
      <div
        ref={textRef}
        className="absolute bottom-12 md:bottom-24 z-30 text-center px-4 opacity-0"
      >
        <h2 className="text-4xl md:text-7xl font-black text-stone-900 tracking-tighter leading-none mb-2">
          WE SUCKED THE WATER.
        </h2>
        <p className="text-2xl md:text-4xl font-serif italic text-orange-600">
          But we kept the soul.
        </p>
      </div>
    </section>
  );
};

export default HeroSuction;
