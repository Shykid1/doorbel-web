import resImage from "@/assets/data/c1.png";
import groImage from "@/assets/data/c2.png";
import phImage from "@/assets/data/c6.png";
import supImage from "@/assets/data/c5.png";

export const categories = [
  {
    text: "Restaurants",
    img: resImage,
    path: "/restaurants",
  },
  {
    text: "Groceries",
    img: groImage,
    path: "/groceries",
  },
  {
    text: "Pharmacies",
    img: phImage,
    path: "/pharmacies",
  },
  {
    text: "Supermarkets",
    img: supImage,
    path: "/supermarkets",
  },
];

export const restaurants = [
  {
    name: "Vapiano",
    rating: "4.5 Excellent",
    ratings: "(500+)",
    distance: "0.7 miles away",
    img: "@/assets/data/r1.jpeg",
    tags: ["Italian", "Pizza", "Pasta", "Salads"],
    duration: "35 - 45",
  },
  {
    name: "✨Urban Greens✨",
    id: "2",
    rating: "4.9 Excellent",
    ratings: "(500+)",
    distance: "1.7 miles away",
    img: "@/assets/data/r2.jpeg",
    tags: ["Salads", "Vegan", "Healthy", "British"],
    duration: "15 - 30",
  },
  {
    name: "El Minero",
    id: "3",
    rating: "4.5 Excellent",
    ratings: "(500+)",
    distance: "3 miles away",
    img: "@/assets/data/r3.jpeg",
    tags: ["Spanish", "Salads", "Tpas", "Pasta"],
    duration: "25 - 45",
  },
];
