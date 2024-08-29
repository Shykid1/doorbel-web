// import React from "react";
// import { motion } from "framer-motion";
// import heroImage from "@/assets/images/placeholder.png";

// const HeroSection: React.FC = () => {
//   const bounceAnimation = {
//     y: [0, -20, 0],
//     transition: {
//       duration: 1.5,
//       repeat: Infinity,
//       ease: "easeInOut",
//     },
//   };
//   return (
//     <div className="bg-gradient-to-r from-teal-400 to-blue-500 min-h-screen flex items-center justify-center p-4">
//       <div className="max-w-7xl mx-auto text-center">
//         <motion.h1
//           className="text-5xl md:text-6xl font-bold text-white mb-6"
//           initial={{ opacity: 0, y: -50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//         >
//           Quick Delivery at Your Doorstep
//         </motion.h1>

//         <motion.p
//           className="text-xl md:text-2xl text-white mb-8"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.5, duration: 0.8 }}
//         >
//           Fast, reliable, and eco-friendly delivery service
//         </motion.p>

//         <motion.div
//           className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4"
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 1, duration: 0.8 }}
//         >
//           <motion.button
//             className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full hover:bg-blue-100 transition duration-300"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             Order Now
//           </motion.button>
//           <motion.button
//             className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white hover:text-blue-600 transition duration-300"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             Learn More
//           </motion.button>
//         </motion.div>

//         <motion.div
//           className="w-full max-w-md mx-auto"
//           animate={bounceAnimation}
//         >
//           <img
//             src={heroImage}
//             alt="Delivery Scooter"
//             className="w-full h-auto"
//           />
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default HeroSection;

import React from "react";
import { motion } from "framer-motion";
import heroImage from "@/assets/images/placeholder.png";

const HeroSection: React.FC = () => {
  const bounceAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <div className="bg-gradient-to-r from-teal-400 to-blue-500 min-h-screen flex items-center justify-center p-4">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h1
          className="text-5xl md:text-6xl font-bold text-white mb-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Quick Delivery at Your Doorstep
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-white mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Fast, Reliable, And Eco-Friendly Delivery Service
        </motion.p>

        <motion.div
          className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <motion.button
            className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full hover:bg-blue-100 transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Order Now
          </motion.button>
          <motion.button
            className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white hover:text-blue-600 transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More
          </motion.button>
        </motion.div>

        <motion.div
          className="w-full max-w-md mx-auto mt-8"
          animate={bounceAnimation}
        >
          <img
            src={heroImage}
            alt="Delivery Scooter"
            className="w-full h-auto"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
