// import React from "react";
// import { motion } from "framer-motion";
// import Topnav from "@/components/shared/topnav";
// import { Truck, Users, ShoppingBag, Heart } from "lucide-react";

// const fadeInUp = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0 },
// };

// const staggerChildren = {
//   visible: {
//     transition: {
//       staggerChildren: 0.1,
//     },
//   },
// };

// const IconCard = ({
//   Icon,
//   title,
//   description,
// }: {
//   Icon: React.ElementType;
//   title: string;
//   description: string;
// }) => (
//   <motion.div
//     variants={fadeInUp}
//     className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md"
//   >
//     <Icon size={48} className="text-blue-500 mb-4" />
//     <h3 className="text-xl font-semibold mb-2">{title}</h3>
//     <p className="text-center text-gray-600">{description}</p>
//   </motion.div>
// );

// const AboutPage = () => {
//   return (
//     <div className="flex w-full flex-col min-h-screen bg-gray-100">
//       <Topnav />
//       <main className="flex-grow px-4 py-8">
//         <motion.div
//           initial="hidden"
//           animate="visible"
//           variants={staggerChildren}
//           className="max-w-4xl mx-auto"
//         >
//           <motion.h1
//             variants={fadeInUp}
//             className="text-4xl font-bold mb-6 text-center text-blue-600"
//           >
//             About Our Delivery Service
//           </motion.h1>

//           <motion.section variants={fadeInUp} className="mb-12 text-center">
//             <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
//             <p className="text-lg bg-white p-6 rounded-lg shadow-md">
//               At [Your Company Name], we're on a mission to revolutionize the
//               way you experience local commerce. We believe in connecting you
//               with the best of your neighborhood, from delicious meals to
//               essential groceries, all at the tap of a button.
//             </p>
//           </motion.section>

//           <motion.section
//             variants={fadeInUp}
//             className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-6"
//           >
//             <IconCard
//               Icon={Truck}
//               title="Fast Delivery"
//               description="We ensure quick and reliable delivery right to your doorstep."
//             />
//             <IconCard
//               Icon={Users}
//               title="Community Focus"
//               description="We support local businesses and help them thrive in the digital age."
//             />
//             <IconCard
//               Icon={ShoppingBag}
//               title="Wide Selection"
//               description="From groceries to pharmacy items, we've got all your needs covered."
//             />
//             <IconCard
//               Icon={Heart}
//               title="Customer First"
//               description="Your satisfaction is our top priority. We're here to serve you better."
//             />
//           </motion.section>

//           <motion.section variants={fadeInUp} className="mb-12">
//             <h2 className="text-2xl font-semibold mb-4 text-center">
//               Our Journey
//             </h2>
//             <div className="bg-white p-6 rounded-lg shadow-md">
//               <p className="text-lg mb-4">
//                 Founded in [Year], we started as a small team with a big dream:
//                 to make local delivery fast, reliable, and accessible to all.
//                 Today, we're proud to serve thousands of customers, partnering
//                 with hundreds of local businesses to bring the best of your
//                 community right to your doorstep.
//               </p>
//               <div className="flex justify-center">
//                 <img
//                   src="/api/placeholder/400/200"
//                   alt="Company growth illustration"
//                   className="rounded-lg"
//                 />
//               </div>
//             </div>
//           </motion.section>

//           <motion.section variants={fadeInUp}>
//             <h2 className="text-2xl font-semibold mb-4 text-center">
//               Join Our Community
//             </h2>
//             <div className="bg-blue-600 text-white p-6 rounded-lg shadow-md text-center">
//               <p className="text-lg mb-4">
//                 Whether you're a hungry food lover, a busy professional, or a
//                 local business owner, we invite you to join our growing
//                 community. Together, let's make your neighborhood more
//                 connected, more convenient, and more delicious than ever before.
//               </p>
//               <button className="bg-white text-blue-600 font-semibold py-2 px-4 rounded hover:bg-blue-100 transition duration-300">
//                 Sign Up Now
//               </button>
//             </div>
//           </motion.section>
//         </motion.div>
//       </main>
//     </div>
//   );
// };

// export default AboutPage;

import React, { useState } from "react";
import { motion } from "framer-motion";
import Topnav from "@/components/shared/topnav";
import {
  Truck,
  Users,
  ShoppingBag,
  Heart,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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

const IconCard = ({
  Icon,
  title,
  description,
}: {
  Icon: React.ElementType;
  title: string;
  description: string;
}) => (
  <motion.div
    variants={fadeInUp}
    className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
  >
    <Icon size={48} className="text-blue-500 mb-4" />
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-center text-gray-600">{description}</p>
  </motion.div>
);

const FAQItem = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4">
      <button
        className="flex justify-between items-center w-full text-left font-semibold p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        {question}
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </button>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="p-4 bg-gray-100 rounded-b-lg"
        >
          {answer}
        </motion.div>
      )}
    </div>
  );
};

const AboutPage = () => {
  const growthData = [
    { year: 2018, users: 1000 },
    { year: 2019, users: 5000 },
    { year: 2020, users: 20000 },
    { year: 2021, users: 50000 },
    { year: 2022, users: 100000 },
    { year: 2023, users: 200000 },
  ];

  const faqData = [
    {
      question: "How fast is your delivery?",
      answer:
        "We strive to deliver within 30 minutes for local orders. Delivery times may vary based on distance and order volume.",
    },
    {
      question: "What areas do you serve?",
      answer:
        "We currently serve major metropolitan areas across the country. Check our app or website for specific coverage in your area.",
    },
    {
      question: "How can I become a delivery partner?",
      answer:
        "To become a delivery partner, visit our 'Join Our Team' page and fill out the application form. We'll review your information and get back to you soon!",
    },
  ];

  return (
    <div className="flex w-full flex-col min-h-screen bg-gray-100">
      <Topnav />
      <main className="flex-grow px-4 py-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerChildren}
          className="max-w-6xl mx-auto"
        >
          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold mb-6 text-center text-blue-600"
          >
            About Our Delivery Service
          </motion.h1>

          <motion.section variants={fadeInUp} className="mb-12 text-center">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              Our Mission
            </h2>
            <p className="text-lg bg-white p-6 rounded-lg shadow-md">
              At DeliverEase, we're on a mission to revolutionize the way you
              experience local commerce. We believe in connecting you with the
              best of your neighborhood, from delicious meals to essential
              groceries, all at the tap of a button.
            </p>
          </motion.section>

          <motion.section
            variants={fadeInUp}
            className="mb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <IconCard
              Icon={Truck}
              title="Fast Delivery"
              description="We ensure quick and reliable delivery right to your doorstep."
            />
            <IconCard
              Icon={Users}
              title="Community Focus"
              description="We support local businesses and help them thrive in the digital age."
            />
            <IconCard
              Icon={ShoppingBag}
              title="Wide Selection"
              description="From groceries to pharmacy items, we've got all your needs covered."
            />
            <IconCard
              Icon={Heart}
              title="Customer First"
              description="Your satisfaction is our top priority. We're here to serve you better."
            />
          </motion.section>

          <motion.section variants={fadeInUp} className="mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-center">
              Our Journey
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-lg mb-4">
                Founded in 2018, we started as a small team with a big dream: to
                make local delivery fast, reliable, and accessible to all.
                Today, we're proud to serve hundreds of thousands of customers,
                partnering with thousands of local businesses to bring the best
                of your community right to your doorstep.
              </p>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={growthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="users"
                      stroke="#3b82f6"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.section>

          <motion.section variants={fadeInUp} className="mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))}
            </div>
          </motion.section>

          <motion.section variants={fadeInUp}>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-center">
              Join Our Community
            </h2>
            <div className="bg-blue-600 text-white p-6 rounded-lg shadow-md text-center">
              <p className="text-lg mb-4">
                Whether you're a hungry food lover, a busy professional, or a
                local business owner, we invite you to join our growing
                community. Together, let's make your neighborhood more
                connected, more convenient, and more delicious than ever before.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 font-semibold py-2 px-4 rounded hover:bg-blue-100 transition duration-300"
              >
                Sign Up Now
              </motion.button>
            </div>
          </motion.section>
        </motion.div>
      </main>
    </div>
  );
};

export default AboutPage;
