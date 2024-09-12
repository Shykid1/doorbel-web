// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import { usePlaces } from "@/context/AppProvider";
// import Topnav from "@/components/shared/topnav";
// import CategoryCard from "@/components/shared/category-card";
// import ProductCard from "@/components/shared/product-card";
// import { categories } from "@/assets/data/home";
// import placeholderImage from "@/assets/images/placeholder.png";
// import HeroSection from "@/components/shared/hero";
// import LoadingSpinner from "@/components/shared/spinner";

// type Place = {
// id: string;
// name: string;
// address: string;
// photoUrl: string;
// rating: number;
// userRatingsTotal: number;
// openingHours: {
// openNow: boolean;
// };
// };

// type PlaceType = "restaurant" | "grocery" | "supermarket" | "pharmacy";

// const fadeInUp = {
// hidden: { opacity: 0, y: 20 },
// visible: { opacity: 1, y: 0 },
// };

// const staggerChildren = {
// visible: {
// transition: {
// staggerChildren: 0.1,
// },
// },
// };

// const Home = () => {
// const [mixedTopPlaces, setMixedTopPlaces] = useState<Place[]>([]);
// const [topFiveRestaurants, setTopFiveRestaurants] = useState<Place[]>([]);
// const { restaurants, groceries, pharmacies, supermarkets, isLoading } =
// usePlaces();

// useEffect(() => {
// const getTopTwo = (places: Place[], type: PlaceType) =>
// places
// .map((place) => ({ ...place, type }))
// .sort((a, b) => b.userRatingsTotal - a.userRatingsTotal)
// .slice(0, 2);

// const allTopPlaces = [
// ...getTopTwo(restaurants, "restaurant"),
// ...getTopTwo(supermarkets, "supermarket"),
// ...getTopTwo(groceries, "grocery"),
// ...getTopTwo(pharmacies, "pharmacy"),
// ];

// setMixedTopPlaces(allTopPlaces.sort(() => 0.5 - Math.random()).slice(0, 5));
// setTopFiveRestaurants(
// restaurants
// .sort((a, b) => b.userRatingsTotal - a.userRatingsTotal)
// .slice(0, 5)
// );
// }, [restaurants, supermarkets, groceries, pharmacies]);

// return (
// <div className="flex w-full flex-col min-h-screen">
// <Topnav />
// <main className="flex-grow">
// <motion.section
// initial="hidden"
// whileInView="visible"
// viewport={{ once: true, amount: 0.5 }}
// variants={fadeInUp}
// className="mb-12"
// >
// <HeroSection />
// </motion.section>

// <motion.section
// initial="hidden"
// whileInView="visible"
// viewport={{ once: true, amount: 0.5 }}
// variants={staggerChildren}
// className="mb-12"
// >
// <motion.h2
// variants={fadeInUp}
// className="text-2xl font-semibold mb-6 text-center"
// >
// Categories
// </motion.h2>
// <motion.div
// variants={staggerChildren}
// className="flex flex-wrap justify-center gap-4"
// >
// {categories.map((category, index) => (
// <motion.div key={index} variants={fadeInUp}>
// <Link to={`/category/${category.text}`}>
// <CategoryCard imageUrl={category.img} title={category.text} />
// </Link>
// </motion.div>
// ))}
// </motion.div>
// </motion.section>

// <motion.section
// initial="hidden"
// whileInView="visible"
// viewport={{ once: true, amount: 0.5 }}
// variants={staggerChildren}
// className="mb-12 px-4"
// >
// <motion.h2 className="text-2xl font-semibold mb-6 text-center">
// Top Picks
// </motion.h2>
// {isLoading ? (
// <div className="flex justify-center items-center h-64">
// <LoadingSpinner />
// </div>
// ) : (
// <motion.div
// variants={staggerChildren}
// className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-items-center"
// >
// {mixedTopPlaces.map((place, index) => (
// <motion.div key={index} initial="active">
// <Link to={`/place/${place.id}`}>
// <ProductCard
// name={place.name}
// imageUrl={place.photoUrl || placeholderImage}
// address={place.address}
// userRatingsTotal={place.userRatingsTotal}
// rating={place.rating}
// openingHours={place.openingHours}
// />
// </Link>
// </motion.div>
// ))}
// </motion.div>
// )}
// </motion.section>

// <motion.section
// initial="hidden"
// whileInView="visible"
// viewport={{ once: true, amount: 0.5 }}
// variants={staggerChildren}
// className="mb-12 px-4"
// >
// <motion.h2 className="text-2xl font-semibold mb-6 text-center">
// Top Restaurants
// </motion.h2>
// {isLoading ? (
// <div className="flex justify-center items-center h-64">
// <LoadingSpinner />
// </div>
// ) : (
// <motion.div
// variants={staggerChildren}
// className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-items-center"
// >
// {topFiveRestaurants.map((place, index) => (
// <motion.div key={index} initial="active">
// <Link to={`/place/${place.id}`}>
// <ProductCard
// name={place.name}
// imageUrl={place.photoUrl || placeholderImage}
// address={place.address}
// userRatingsTotal={place.userRatingsTotal}
// rating={place.rating}
// openingHours={place.openingHours}
// />
// </Link>
// </motion.div>
// ))}
// </motion.div>
// )}
// </motion.section>
// </main>
// </div>
// );
// };

// export default Home;
