import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logo_nutri.png";
import {
  ShoppingBagIcon,
  UserIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/solid";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null); // Track which link is hovered

  // --- CONFIGURATION: Updated Links Structure ---
  const links = [
    { name: "Home", path: "/" },
    {
      name: "Brand",
      path: "/shop",
      isDropdown: true,
      subItems: [
        { name: "Nutriquick", path: "/shop/nutriquick" },
        { name: "Affinito", path: "/shop/affinito" },
      ],
    },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  // --- ANIMATIONS ---
  const menuVars = {
    initial: { scaleY: 0 },
    animate: {
      scaleY: 1,
      transition: { duration: 0.5, ease: [0.12, 0, 0.39, 0] },
    },
    exit: {
      scaleY: 0,
      transition: { delay: 0.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const containerVars = {
    initial: { transition: { staggerChildren: 0.09, staggerDirection: -1 } },
    animate: {
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.09,
        staggerDirection: 1,
      },
    },
  };

  const mobileLinkVars = {
    initial: {
      y: "30vh",
      transition: { duration: 0.5, ease: [0.37, 0, 0.63, 1] },
    },
    open: { y: 0, transition: { duration: 0.7, ease: [0, 0.55, 0.45, 1] } },
  };

  const dropdownVars = {
    initial: { opacity: 0, y: 15, scale: 0.95 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.2, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: 15,
      scale: 0.95,
      transition: { duration: 0.2, ease: "easeIn" },
    },
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="fixed top-6 inset-x-0 mx-auto w-[90%] md:w-fit max-w-5xl z-50 selection:bg-[#e9f056]"
      >
        <div className="bg-[#ffffc5]/30  backdrop-blur-md border border-white/10 shadow-2xl rounded-full px-6 py-3 flex items-center justify-between gap-8 md:gap-12">
          {/* LOGO */}
          <Link
            to="/"
            className="text-xl font-black tracking-tighter text-white z-50 mix-blend-difference"
          >
            <img className="h-10" src={logo} alt="" />
          </Link>

          {/* DESKTOP LINKS (With Dropdown Logic) */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => setHoveredLink(link.name)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                {/* Main Link Label */}
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-1 ${
                      isActive && !link.isDropdown
                        ? "text-stone-900 bg-white"
                        : "text-[#c14a09] hover:text-[#703B3B] hover:bg-white/10"
                    }`
                  }
                >
                  {link.name}
                  {link.isDropdown && (
                    <ChevronDownIcon className="w-3 h-3 mt-0.5 opacity-70" />
                  )}
                </NavLink>

                {/* DROPDOWN MENU */}
                <AnimatePresence>
                  {link.isDropdown && hoveredLink === link.name && (
                    <motion.div
                      variants={dropdownVars}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="absolute top-full left-0 mt-4 w-48 p-2 bg-stone-900/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl overflow-hidden"
                    >
                      <div className="flex flex-col gap-1">
                        {link.subItems.map((sub) => (
                          <Link
                            key={sub.name}
                            to={sub.path}
                            className="group flex items-center justify-between px-4 py-3 text-sm text-stone-300 hover:text-black hover:bg-white/10 rounded-xl transition-all"
                          >
                            <span>{sub.name}</span>
                            <ArrowRightIcon className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-orange-500" />
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-4">
            <Link
              to="/cart"
              className="relative group p-2 rounded-full transition-colors ease-out text-black hover:text-[#c14a09] hover:scale-105"
            >
              <ShoppingBagIcon className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-orange-500 rounded-full border-2 border-stone-900 group-hover:scale-110 transition-transform"></span>
            </Link>
            <Link
              to="/register"
              className="hidden md:flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white px-5 py-2 rounded-full text-sm font-bold transition-colors"
            >
              <UserIcon className="w-4 h-4" />
              <span>Join</span>
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-white hover:bg-white/10 rounded-full transition-colors z-50"
            >
              {isOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* MOBILE MENU (Updated to show sub-links) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 z-40 bg-stone-900 origin-top flex flex-col justify-center items-center md:hidden"
          >
            <motion.div
              variants={containerVars}
              initial="initial"
              animate="open"
              exit="initial"
              className="flex flex-col items-center gap-6"
            >
              {links.map((link) => (
                <div key={link.name} className="flex flex-col items-center">
                  <motion.div variants={mobileLinkVars}>
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-stone-500 hover:to-orange-500 transition-all"
                    >
                      {link.name}
                    </Link>
                  </motion.div>

                  {/* Mobile Sub-Links (Rendered directly under Shop) */}
                  {link.isDropdown && (
                    <motion.div
                      variants={mobileLinkVars}
                      className="flex gap-6 mt-2"
                    >
                      {link.subItems.map((sub) => (
                        <Link
                          key={sub.name}
                          to={sub.path}
                          onClick={() => setIsOpen(false)}
                          className="text-lg text-stone-400 font-mono hover:text-orange-500 flex items-center gap-2"
                        >
                          {sub.name} <ArrowRightIcon className="w-4 h-4" />
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
