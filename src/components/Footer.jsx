import React from "react";
import webautomy from "../assets/webautomy.png";

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-24 pb-12 px-6 border-t-8 border-white">
      <div className="max-w-7xl mx-auto">
        <div className="border-4 border-white p-8 md:p-12 relative">
          <div className="absolute -top-6 left-8 bg-black px-4 text-xl font-bold uppercase tracking-wider">
            Nutrition Facts / Site Map
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Brand Column */}
            <div className="col-span-1 md:col-span-2">
              <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-4">
                NUTRI
                <br />
                QUICK
              </h2>
              <p className="text-stone-400 max-w-sm">
                Fueled by nostalgia. <br />
                Powered by technology. <br />
                Made in India, for the World.
              </p>
            </div>

            {/* Serving Size / Links */}
            <div>
              <h4 className="border-b-2 border-white pb-2 text-xl font-bold mb-4">
                Quick Links
              </h4>
              <ul className="space-y-3 font-mono text-lg">
                <li className="flex justify-between hover:text-orange-500 cursor-pointer">
                  <span>Home</span> <span>100%</span>
                </li>
                <li className="flex justify-between hover:text-orange-500 cursor-pointer">
                  <span>Shop All</span> <span>100%</span>
                </li>
                <li className="flex justify-between hover:text-orange-500 cursor-pointer">
                  <span>Affinito</span> <span>100%</span>
                </li>
                <li className="flex justify-between hover:text-orange-500 cursor-pointer">
                  <span>About Us</span> <span>100%</span>
                </li>
              </ul>
            </div>

            {/* Contact / Socials */}
            <div>
              <h4 className="border-b-2 border-white pb-2 text-xl font-bold mb-4">
                Us :)
              </h4>
              <ul className="space-y-3 font-mono text-stone-400">
                <li className="hover:text-white cursor-pointer">Instagram</li>
                <li className="hover:text-white cursor-pointer">LinkedIn</li>
                <li className="hover:text-white cursor-pointer">Twitter</li>
                <li className="hover:text-white cursor-pointer">
                  hello@nutriquick.com
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center text-xs text-stone-500 uppercase tracking-widest">
            <p>© 2024 NUTRIQUICK FOODS. ALL RIGHTS RESERVED.</p>
            <p className="flex items-center justify-center">
              DESIGNED BY WEBAUTOMY.
              <img className="h-6" src={webautomy} alt="" />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
