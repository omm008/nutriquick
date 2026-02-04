import React from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";

const reviews = [
  {
    id: 1,
    name: "Aarav P.",
    role: "Student in Toronto",
    rating: 5,
    text: "Literally saved my life during finals week. The Rajma Chawal tastes exactly like home. I almost cried eating it.",
    initials: "AP",
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    role: "Travel Vlogger",
    rating: 5,
    text: "Took 10 packs to my trek in the Alps. Lightweight, easy to make, and infinitely better than standard camping food.",
    initials: "SJ",
    color: "bg-green-100 text-green-600",
  },
  {
    id: 3,
    name: "Vikram S.",
    role: "IT Professional",
    rating: 4,
    text: "The taste is authentic, not plastic like other brands. Pao Bhaji is a bit spicy for me, but the Dal is perfect.",
    initials: "VS",
    color: "bg-orange-100 text-orange-600",
  },
  {
    id: 4,
    name: "Neha G.",
    role: "Working Mom",
    rating: 5,
    text: "My kids actually eat this. It's my cheat code for busy Tuesdays when I can't cook but want them to eat healthy.",
    initials: "NG",
    color: "bg-purple-100 text-purple-600",
  },
  {
    id: 5,
    name: "Davinder K.",
    role: "Verified Buyer",
    rating: 4,
    text: "Great portion size for one person. Packaging is solid. Delivery to Dubai took a few days longer, but worth the wait.",
    initials: "DK",
    color: "bg-stone-200 text-stone-600",
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 overflow-hidden bg-orange-50 border-t border-orange-100">
      <div className="text-center mb-16">
        <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-orange-600 mb-2">
          Real Stories
        </h3>
        <h2 className="text-3xl md:text-5xl font-serif text-stone-900">
          Loved by Locals & Globetrotters
        </h2>
      </div>

      {/* Infinite Scroll Wrapper */}
      <div className="relative w-full">
        {/* Gradient Masks for smooth fade effect at edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-orange-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-orange-50 to-transparent z-10 pointer-events-none" />

        <div className="flex gap-6 w-max animate-marquee pl-6">
          {/* Duplicate list to ensure seamless infinite scroll loop */}
          {[...reviews, ...reviews].map((review, index) => (
            <div
              key={`${review.id}-${index}`}
              className="w-[320px] md:w-[400px] bg-white p-8 rounded-2xl shadow-sm border border-stone-100 hover:shadow-xl hover:border-orange-200 transition-all duration-300 shrink-0 flex flex-col justify-between"
            >
              <div>
                {/* Star Rating Logic */}
                <div className="flex gap-1 text-yellow-400 mb-6">
                  {[...Array(5)].map((_, i) =>
                    i < review.rating ? (
                      <StarIcon key={i} className="w-5 h-5" />
                    ) : (
                      <StarIconOutline
                        key={i}
                        className="w-5 h-5 text-stone-300"
                      />
                    ),
                  )}
                </div>

                <p className="text-lg text-stone-600 font-light leading-relaxed mb-8">
                  "{review.text}"
                </p>
              </div>

              {/* User Info (No Photo) */}
              <div className="flex items-center gap-4 pt-6 border-t border-stone-50">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${review.color}`}
                >
                  {review.initials}
                </div>
                <div>
                  <h5 className="font-bold text-stone-900">{review.name}</h5>
                  <span className="text-xs font-medium uppercase tracking-wider text-stone-400">
                    {review.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
