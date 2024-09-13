import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { usePlaces } from "@/context/AppProvider";
import CategoryCard from "@/components/shared/category-card";
import ProductCard from "@/components/shared/product-card";
import { categories } from "@/assets/data/home";
import placeholderImage from "@/assets/images/placeholder.png";
import HeroSection from "@/components/shared/hero";
import LoadingSpinner from "@/components/shared/spinner";
import MapSection from "@/components/shared/map";

type Place = {
  id: string;
  name: string;
  address: string;
  photoUrl: string;
  rating: number;
  userRatingsTotal: number;
  openingHours: {
    openNow: boolean;
  };
};

type PlaceType = "restaurant" | "grocery" | "supermarket" | "pharmacy";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerChildren = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const Home = () => {
  const [topRestaurants, setTopRestaurants] = useState<Place[]>([]);
  const [topGroceries, setTopGroceries] = useState<Place[]>([]);
  const [topSupermarkets, setTopSupermarkets] = useState<Place[]>([]);
  const [topPharmacies, setTopPharmacies] = useState<Place[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<PlaceType | "all">(
    "all"
  );
  const { restaurants, groceries, pharmacies, supermarkets, isLoading } =
    usePlaces();

  useEffect(() => {
    const getTopFive = (places: Place[]) =>
      places
        .sort((a, b) => b.userRatingsTotal - a.userRatingsTotal)
        .slice(0, 5);

    setTopRestaurants(getTopFive(restaurants));
    setTopGroceries(getTopFive(groceries));
    setTopSupermarkets(getTopFive(supermarkets));
    setTopPharmacies(getTopFive(pharmacies));
  }, [restaurants, groceries, supermarkets, pharmacies]);

  const filteredPlaces = () => {
    switch (selectedCategory) {
      case "restaurant":
        return topRestaurants;
      case "grocery":
        return topGroceries;
      case "supermarket":
        return topSupermarkets;
      case "pharmacy":
        return topPharmacies;
      default:
        return [
          ...topRestaurants,
          ...topGroceries,
          ...topSupermarkets,
          ...topPharmacies,
        ].slice(0, 5);
    }
  };

  return (
    <div className="flex w-full flex-col min-h-screen">
      <main className="flex-grow">
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeInUp}
          className="mb-12"
        >
          <HeroSection />
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={staggerChildren}
          className="mb-12"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-2xl font-semibold mb-6 text-center"
          >
            Categories
          </motion.h2>
          <motion.div
            variants={staggerChildren}
            className="flex flex-wrap justify-center gap-4"
          >
            {categories.map((category, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Link to={`${category.path}`}>
                  <CategoryCard imageUrl={category.img} title={category.text} />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={staggerChildren}
          className="mb-12 px-4"
        >
          <motion.h2 className="text-2xl font-semibold mb-6 text-center">
            Search a Place by Location
          </motion.h2>
          <MapSection />
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={staggerChildren}
          className="mb-12 px-4"
        >
          <motion.h2 className="text-2xl font-semibold mb-6 text-center">
            Top Picks
          </motion.h2>
          <div className="flex justify-center mb-4">
            <select
              value={selectedCategory}
              onChange={(e) =>
                setSelectedCategory(e.target.value as PlaceType | "all")
              }
              className="p-2 border rounded"
            >
              <option value="all">All</option>
              <option value="restaurant">Restaurants</option>
              <option value="grocery">Groceries</option>
              <option value="supermarket">Supermarkets</option>
              <option value="pharmacy">Pharmacies</option>
            </select>
          </div>
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <LoadingSpinner />
            </div>
          ) : (
            <motion.div
              variants={staggerChildren}
              className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-items-center"
            >
              {filteredPlaces().map((place, index) => (
                <motion.div key={index} initial="active">
                  <Link to={`/place/${place.id}`}>
                    <ProductCard
                      name={place.name}
                      imageUrl={place.photoUrl || placeholderImage}
                      address={place.address}
                      userRatingsTotal={place.userRatingsTotal}
                      rating={place.rating}
                      openingHours={place.openingHours}
                    />
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.section>
      </main>
    </div>
  );
};

export default Home;
