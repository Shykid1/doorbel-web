// import CategoryCard from "@/components/shared/category-card";
// import { categories } from "@/assets/data/home";
// import { Link } from "react-router-dom";
// import Topnav from "@/components/shared/topnav";
// import { useEffect, useRef, useState } from "react";
// import { usePlaces } from "@/context/AppProvider";
// import ProductCard from "@/components/shared/product-card";
// import placeholderImage from "@/assets/images/placeholder.png";

// type Place = {
//   id: string;
//   name: string;
//   address: string;
//   photoUrl: string;
//   rating: number;
//   userRatingsTotal: number;
//   openingHours: {
//     openNow: boolean;
//   };
// };

// type PlaceType = "restaurant" | "grocery" | "supermarket" | "pharmacy";

// const Home = () => {
//   const sliderRef = useRef<HTMLDivElement>(null);
//   const [isDragging, setIsDragging] = useState(false);
//   const [startX, setStartX] = useState(0);
//   const [scrollLeft, setScrollLeft] = useState(0);
//   const [mixedTopPlaces, setMixedTopPlaces] = useState<Place[]>([]);
//   const [topFiveRestaurants, setTopFiveRestaurants] = useState<Place[]>([]);

//   const handleMouseDown = (e: React.MouseEvent) => {
//     setIsDragging(true);
//     setStartX(e.pageX - (sliderRef.current?.offsetLeft || 0));
//     setScrollLeft(sliderRef.current?.scrollLeft || 0);
//   };

//   const handleMouseLeave = () => {
//     setIsDragging(false);
//   };

//   const handleMouseUp = () => {
//     setIsDragging(false);
//   };

//   const handleMouseMove = (e: React.MouseEvent) => {
//     if (!isDragging) return;
//     e.preventDefault();
//     const x = e.pageX - (sliderRef.current?.offsetLeft || 0);
//     const walk = (x - startX) * 2; // Adjust the scroll speed
//     if (sliderRef.current) {
//       sliderRef.current.scrollLeft = scrollLeft - walk;
//     }
//   };

//   const handleTouchStart = (e: React.TouchEvent) => {
//     setIsDragging(true);
//     setStartX(e.touches[0].pageX - (sliderRef.current?.offsetLeft || 0));
//     setScrollLeft(sliderRef.current?.scrollLeft || 0);
//   };

//   const handleTouchEnd = () => {
//     setIsDragging(false);
//   };

//   const handleTouchMove = (e: React.TouchEvent) => {
//     if (!isDragging) return;
//     const x = e.touches[0].pageX - (sliderRef.current?.offsetLeft || 0);
//     const walk = (x - startX) * 2; // Adjust the scroll speed
//     if (sliderRef.current) {
//       sliderRef.current.scrollLeft = scrollLeft - walk;
//     }
//   };

//   const { restaurants, groceries, pharmacies, supermarkets } = usePlaces();

//   useEffect(() => {
//     const getTopTwo = (places: Place[], type: PlaceType) =>
//       places
//         .map((place) => ({ ...place, type }))
//         .sort((a, b) => b.userRatingsTotal - a.userRatingsTotal)
//         .slice(0, 2);

//     const allTopPlaces = [
//       ...getTopTwo(restaurants, "restaurant"),
//       ...getTopTwo(supermarkets, "supermarket"),
//       ...getTopTwo(groceries, "grocery"),
//       ...getTopTwo(pharmacies, "pharmacy"),
//     ];

//     // Shuffle the combined array
//     const shuffled = allTopPlaces.sort(() => 0.5 - Math.random());
//     const firstFive = shuffled.slice(0, 5);

//     setMixedTopPlaces(firstFive);
//   }, [restaurants, supermarkets, groceries, pharmacies]);

//   useEffect(() => {
//     const getTopFiveRestaurants = () => {
//       const topFive = restaurants
//         .sort((a, b) => b.userRatingsTotal - a.userRatingsTotal)
//         .slice(0, 5);
//       setTopFiveRestaurants(topFive);
//     };

//     getTopFiveRestaurants();
//   }, [restaurants]);

//   return (
//     <div className="flex w-full flex-col h-[100dvh]">
//       <Topnav />
//       <div
//         ref={sliderRef}
//         className="flex mt-1 lg:mt-4 space-x-4 overflow-x-scroll no-scrollbar md:overflow-x-auto md:flex-wrap md:justify-center cursor-grab active:cursor-grabbing"
//         onMouseDown={handleMouseDown}
//         onMouseLeave={handleMouseLeave}
//         onMouseUp={handleMouseUp}
//         onMouseMove={handleMouseMove}
//         onTouchStart={handleTouchStart}
//         onTouchEnd={handleTouchEnd}
//         onTouchMove={handleTouchMove}
//       >
//         {categories.map((category, index) => (
//           <Link to={`/category/${category.text}`} key={index}>
//             <CategoryCard imageUrl={category.img} title={category.text} />
//           </Link>
//         ))}
//       </div>

//       {/* Top Picks */}
//       <h1 className="text-2xl font-semibold mt-4 px-4 text-center p-8">
//         Top Picks
//       </h1>
//       <div
//         ref={sliderRef}
//         className="flex space-x-5 overflow-x-scroll no-scrollbar md:overflow-x-auto md:flex-wrap md:justify-center cursor-grab active:cursor-grabbing"
//         onMouseDown={handleMouseDown}
//         onMouseLeave={handleMouseLeave}
//         onMouseUp={handleMouseUp}
//         onMouseMove={handleMouseMove}
//         onTouchStart={handleTouchStart}
//         onTouchEnd={handleTouchEnd}
//         onTouchMove={handleTouchMove}
//       >
//         {mixedTopPlaces.map((place, index) => (
//           <Link to={`/place/${place.id}`} key={index}>
//             <ProductCard
//               name={place.name}
//               imageUrl={place.photoUrl || placeholderImage}
//               address={place.address}
//               userRatingsTotal={place.userRatingsTotal}
//               rating={place.rating}
//               openingHours={place.openingHours}
//             />
//           </Link>
//         ))}
//       </div>

//       {/* Top Restaurants */}
//       <h1 className="text-2xl font-semibold mt-4 px-4 text-center p-8">
//         Top Restaurants
//       </h1>
//       <div
//         ref={sliderRef}
//         className="flex space-x-5 overflow-x-scroll no-scrollbar md:overflow-x-auto md:flex-wrap md:justify-center cursor-grab active:cursor-grabbing"
//         onMouseDown={handleMouseDown}
//         onMouseLeave={handleMouseLeave}
//         onMouseUp={handleMouseUp}
//         onMouseMove={handleMouseMove}
//         onTouchStart={handleTouchStart}
//         onTouchEnd={handleTouchEnd}
//         onTouchMove={handleTouchMove}
//       >
//         {topFiveRestaurants.map((place, index) => (
//           <Link to={`/place/${place.id}`} key={index}>
//             <ProductCard
//               name={place.name}
//               imageUrl={place.photoUrl || placeholderImage}
//               address={place.address}
//               userRatingsTotal={place.userRatingsTotal}
//               rating={place.rating}
//               openingHours={place.openingHours}
//             />
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Home;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { usePlaces } from "@/context/AppProvider";
import Topnav from "@/components/shared/topnav";
import CategoryCard from "@/components/shared/category-card";
import ProductCard from "@/components/shared/product-card";
import { categories } from "@/assets/data/home";
import placeholderImage from "@/assets/images/placeholder.png";

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

const Home = () => {
  const [mixedTopPlaces, setMixedTopPlaces] = useState<Place[]>([]);
  const [topFiveRestaurants, setTopFiveRestaurants] = useState<Place[]>([]);
  const { restaurants, groceries, pharmacies, supermarkets } = usePlaces();

  useEffect(() => {
    const getTopTwo = (places: Place[], type: PlaceType) =>
      places
        .map((place) => ({ ...place, type }))
        .sort((a, b) => b.userRatingsTotal - a.userRatingsTotal)
        .slice(0, 2);

    const allTopPlaces = [
      ...getTopTwo(restaurants, "restaurant"),
      ...getTopTwo(supermarkets, "supermarket"),
      ...getTopTwo(groceries, "grocery"),
      ...getTopTwo(pharmacies, "pharmacy"),
    ];

    setMixedTopPlaces(allTopPlaces.sort(() => 0.5 - Math.random()).slice(0, 5));
    setTopFiveRestaurants(
      restaurants
        .sort((a, b) => b.userRatingsTotal - a.userRatingsTotal)
        .slice(0, 5)
    );
  }, [restaurants, supermarkets, groceries, pharmacies]);

  return (
    <div className="flex w-full flex-col min-h-screen">
      <Topnav />
      <main className="flex-grow px-4 py-8">
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Categories
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <Link to={`/category/${category.text}`} key={index}>
                <CategoryCard imageUrl={category.img} title={category.text} />
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-center">Top Picks</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {mixedTopPlaces.map((place, index) => (
              <Link to={`/place/${place.id}`} key={index}>
                <ProductCard
                  name={place.name}
                  imageUrl={place.photoUrl || placeholderImage}
                  address={place.address}
                  userRatingsTotal={place.userRatingsTotal}
                  rating={place.rating}
                  openingHours={place.openingHours}
                />
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Top Restaurants
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            {topFiveRestaurants.map((place, index) => (
              <Link to={`/place/${place.id}`} key={index}>
                <ProductCard
                  name={place.name}
                  imageUrl={place.photoUrl || placeholderImage}
                  address={place.address}
                  userRatingsTotal={place.userRatingsTotal}
                  rating={place.rating}
                  openingHours={place.openingHours}
                />
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
