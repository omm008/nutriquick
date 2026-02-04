// src/data/products.js

// --- AFFINITO IMAGES (From your list) ---
import mangoBites1 from "../assets/affinito/mango-bites1.jpeg";
import mangoChunk1 from "../assets/affinito/mango-chunk1.jpeg";
import jamunBites1 from "../assets/affinito/jamun-bites1.jpeg";
import jamunChunk1 from "../assets/affinito/jamun-chunk1.jpeg";
import chikuBites1 from "../assets/affinito/chiku-bites1.jpeg";
import sitafal1 from "../assets/affinito/sitafal1.jpeg";
import strawberryBites1 from "../assets/affinito/strawberry-bites1.jpeg";
import dal_makhani from "../assets/dal-makhani.png";
import rajma from "../assets/rajma.png";
import biryani from "../assets/biryani.png";

// --- NUTRIQUICK IMAGES (Placeholders - Replace with your meal images later) ---
const mealPlaceholder =
  "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=2574&auto=format&fit=crop";

export const products = [
  // --- AFFINITO PRODUCTS ---
  {
    id: 101,
    brand: "affinito",
    name: "Mango Bites",
    tagline: "The King, Freeze Dried.",
    price: 249,
    image1: mangoBites1,
    image2: mangoChunk1, // Hover image
    weight: "30g",
    isNew: true,
  },
  {
    id: 102,
    brand: "affinito",
    name: "Jamun Strips",
    tagline: "Tangy Purple Gold.",
    price: 199,
    image1: jamunBites1,
    image2: jamunChunk1,
    weight: "30g",
    isNew: false,
  },
  {
    id: 103,
    brand: "affinito",
    name: "Crunchy Chiku",
    tagline: "Sweet earthy delight.",
    price: 189,
    image1: chikuBites1,
    image2: chikuBites1,
    weight: "30g",
    isNew: false,
  },
  {
    id: 104,
    brand: "affinito",
    name: "Sitafal Scoops",
    tagline: "Custard Apple goodness.",
    price: 299,
    image1: sitafal1,
    image2: sitafal1,
    weight: "25g",
    isNew: true,
  },
  {
    id: 105,
    brand: "affinito",
    name: "Strawberry Spark",
    tagline: "Berry blast in a bite.",
    price: 229,
    image1: strawberryBites1,
    image2: strawberryBites1,
    weight: "20g",
    isNew: false,
  },

  // --- NUTRIQUICK PRODUCTS (Meals) ---
  {
    id: 201,
    brand: "nutriquick",
    name: "Dal Makhani",
    tagline: "Creamy, slow-cooked magic.",
    price: 149,
    image1: dal_makhani,
    weight: "80g (Rehydrates to 250g)",
    isNew: false,
  },
  {
    id: 202,
    brand: "nutriquick",
    name: "Pav Bhaji",
    tagline: "Mumbai street style.",
    price: 129,
    image1: rajma,
    weight: "80g",
    isNew: true,
  },
  {
    id: 203,
    brand: "nutriquick",
    name: "Rajma Chawal",
    tagline: "The ultimate comfort bowl.",
    price: 169,
    image1: biryani,
    weight: "90g",
    isNew: false,
  },
];
