import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { categories } from "@/assets/data/home";
import CategoryCard from "@/components/shared/category-card";
import {
  Utensils,
  ShoppingCart,
  BriefcaseMedical,
  Zap,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

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

const ServiceCard = ({
  title,
  description,
  icon: Icon,
  expanded,
  onToggle,
}: {
  title: string;
  description: string;
  icon: React.ElementType;
  expanded: boolean;
  onToggle: () => void;
}) => (
  <motion.div
    variants={fadeInUp}
    className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center cursor-pointer"
    onClick={onToggle}
  >
    <Icon size={48} className="text-blue-500 mb-4" />
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <AnimatePresence>
      {expanded && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="text-gray-600"
        >
          {description}
        </motion.p>
      )}
    </AnimatePresence>
    <motion.div
      animate={{ rotate: expanded ? 180 : 0 }}
      transition={{ duration: 0.3 }}
      className="mt-4"
    >
      {expanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
    </motion.div>
  </motion.div>
);

const Services = () => {
  const [expandedService, setExpandedService] = useState<number | null>(null);

  const services = [
    {
      title: "Food Delivery",
      description:
        "Get your favorite meals delivered right to your doorstep. Choose from a wide variety of restaurants and cuisines.",
      icon: Utensils,
    },
    {
      title: "Grocery Delivery",
      description:
        "Fresh produce and household essentials, delivered conveniently. Shop from local markets and supermarkets.",
      icon: ShoppingCart,
    },
    {
      title: "Pharmacy Delivery",
      description:
        "Medications and health products delivered safely and promptly. We ensure quick delivery for your medical needs.",
      icon: BriefcaseMedical,
    },
    {
      title: "Express Delivery",
      description:
        "Urgent deliveries completed within hours. Perfect for time-sensitive packages and documents.",
      icon: Zap,
    },
  ];

  return (
    <div className="flex w-full flex-col min-h-screen bg-gray-100">
      <main className="flex-grow">
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeInUp}
          className="mb-12 px-4 py-16 bg-blue-600 text-white relative overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 opacity-10"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 20,
              ease: "linear",
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{
              backgroundImage:
                'url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')',
            }}
          />
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4">
              Our Services
            </h1>
            <p className="text-xl md:text-2xl text-center max-w-2xl mx-auto">
              We offer a range of convenient delivery services to meet your
              everyday needs.
            </p>
          </div>
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={staggerChildren}
          className="mb-12 px-4"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-2xl md:text-3xl font-semibold mb-6 text-center"
          >
            What We Offer
          </motion.h2>
          <motion.div
            variants={staggerChildren}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                {...service}
                expanded={expandedService === index}
                onToggle={() =>
                  setExpandedService(expandedService === index ? null : index)
                }
              />
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
          <motion.h2
            variants={fadeInUp}
            className="text-2xl md:text-3xl font-semibold mb-6 text-center"
          >
            Browse by Category
          </motion.h2>
          <motion.div
            variants={staggerChildren}
            className="flex flex-wrap justify-center gap-4"
          >
            {categories.map((category, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
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
          variants={fadeInUp}
          className="mb-12 px-4 py-8 bg-white"
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center">
            Why Choose Us?
          </h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {[
              { title: "Fast and reliable delivery", icon: Zap },
              { title: "Wide range of services", icon: ShoppingCart },
              {
                title: "User-friendly app with real-time tracking",
                icon: BriefcaseMedical,
              },
              { title: "Excellent customer support", icon: Utensils },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="flex items-center bg-blue-100 p-6 rounded-lg"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <item.icon
                  size={36}
                  className="text-blue-500 mr-4 flex-shrink-0"
                />
                <span className="text-lg">{item.title}</span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeInUp}
          className="mb-12 px-4 py-16 bg-blue-600 text-white text-center"
        >
          <h2 className="text-3xl md:text-4xl font-semibold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Experience the convenience of our delivery services today!
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-full text-lg hover:bg-blue-100 transition duration-300"
          >
            Order Now
          </motion.button>
        </motion.section>
      </main>
    </div>
  );
};

export default Services;
