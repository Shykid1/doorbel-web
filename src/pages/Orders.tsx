// import { useState } from "react";
// import { Truck, Package, Clock, MapPin } from "lucide-react";
// import Topnav from "@/components/shared/topnav";

// const deliveryData = [
//   {
//     id: 1,
//     status: "In Transit",
//     eta: "30 mins",
//     address: "123 Main St, Anytown, USA",
//   },
//   {
//     id: 2,
//     status: "Delivered",
//     eta: "Completed",
//     address: "456 Elm St, Somewhere, USA",
//   },
//   {
//     id: 3,
//     status: "Preparing",
//     eta: "1 hour",
//     address: "789 Oak St, Elsewhere, USA",
//   },
// ];

// type Delivery = {
//   id: number;
//   status: string;
//   eta: string;
//   address: string;
// };

// const DeliveryCard = ({ delivery }: { delivery: Delivery }) => (
//   <div className="bg-white rounded-lg shadow-md p-4 mb-4">
//     <div className="flex items-center justify-between mb-2">
//       <span className="text-lg font-semibold">Order #{delivery.id}</span>
//       <span
//         className={`px-2 py-1 rounded-full text-sm ${
//           delivery.status === "Delivered"
//             ? "bg-green-200 text-green-800"
//             : delivery.status === "In Transit"
//             ? "bg-blue-200 text-blue-800"
//             : "bg-yellow-200 text-yellow-800"
//         }`}
//       >
//         {delivery.status}
//       </span>
//     </div>
//     <div className="flex items-center text-gray-600 mb-2">
//       <Clock className="w-4 h-4 mr-2" />
//       <span>{delivery.eta}</span>
//     </div>
//     <div className="flex items-center text-gray-600">
//       <MapPin className="w-4 h-4 mr-2" />
//       <span>{delivery.address}</span>
//     </div>
//   </div>
// );

// const DeliveryOrdersPage = () => {
//   const [activeTab, setActiveTab] = useState("all");

//   const filteredDeliveries = deliveryData.filter(
//     (delivery) =>
//       activeTab === "all" || delivery.status.toLowerCase() === activeTab
//   );

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <div className="">
//         <Topnav />
//       </div>
//       <div className=" p-8">
//         <div className="max-w-3xl mx-auto">
//           <h1 className="text-3xl font-bold mb-8 text-center">
//             Delivery Orders
//           </h1>

//           <div className="bg-white rounded-lg shadow-md p-4 mb-8">
//             <div className="flex justify-around">
//               <button
//                 className={`flex items-center ${
//                   activeTab === "all" ? "text-blue-600" : "text-gray-600"
//                 }`}
//                 onClick={() => setActiveTab("all")}
//               >
//                 <Package className="w-5 h-5 mr-2" />
//                 All Orders
//               </button>
//               <button
//                 className={`flex items-center ${
//                   activeTab === "in transit" ? "text-blue-600" : "text-gray-600"
//                 }`}
//                 onClick={() => setActiveTab("in transit")}
//               >
//                 <Truck className="w-5 h-5 mr-2" />
//                 In Transit
//               </button>
//               <button
//                 className={`flex items-center ${
//                   activeTab === "delivered" ? "text-blue-600" : "text-gray-600"
//                 }`}
//                 onClick={() => setActiveTab("delivered")}
//               >
//                 <MapPin className="w-5 h-5 mr-2" />
//                 Delivered
//               </button>
//             </div>
//           </div>

//           {filteredDeliveries.map((delivery) => (
//             <DeliveryCard key={delivery.id} delivery={delivery} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DeliveryOrdersPage;

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Truck, Package, Clock, MapPin, Box, CheckCircle } from "lucide-react";
import Topnav from "@/components/shared/topnav";

const deliveryData = [
  {
    id: 1,
    status: "In Transit",
    eta: "30 mins",
    address: "123 Main St, Anytown, USA",
  },
  {
    id: 2,
    status: "Delivered",
    eta: "Completed",
    address: "456 Elm St, Somewhere, USA",
  },
  {
    id: 3,
    status: "Preparing",
    eta: "1 hour",
    address: "789 Oak St, Elsewhere, USA",
  },
];

type Delivery = {
  id: number;
  status: string;
  eta: string;
  address: string;
};

const DeliveryCard = ({ delivery }: { delivery: Delivery }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
    className="bg-white rounded-lg shadow-md p-4 mb-4"
  >
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2">
      <span className="text-lg font-semibold mb-2 sm:mb-0">
        Order #{delivery.id}
      </span>
      <motion.span
        whileHover={{ scale: 1.05 }}
        className={`px-2 py-1 rounded-full text-sm ${
          delivery.status === "Delivered"
            ? "bg-green-200 text-green-800"
            : delivery.status === "In Transit"
            ? "bg-blue-200 text-blue-800"
            : "bg-yellow-200 text-yellow-800"
        }`}
      >
        {delivery.status}
      </motion.span>
    </div>
    <div className="flex items-center text-gray-600 mb-2">
      <Clock className="w-4 h-4 mr-2" />
      <span>{delivery.eta}</span>
    </div>
    <div className="flex items-center text-gray-600">
      <MapPin className="w-4 h-4 mr-2" />
      <span>{delivery.address}</span>
    </div>
  </motion.div>
);

const DeliveryOrdersPage = () => {
  const [activeTab, setActiveTab] = useState("all");

  const filteredDeliveries = deliveryData.filter(
    (delivery) =>
      activeTab === "all" || delivery.status.toLowerCase() === activeTab
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      <div className="sticky top-0 z-10 bg-white shadow-md">
        <Topnav />
      </div>
      <div className="p-4 sm:p-8">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold mb-8 text-center text-gray-800"
          >
            Delivery Orders
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-md p-4 mb-8"
          >
            <div className="flex flex-wrap justify-around">
              <TabButton
                icon={<Package className="w-5 h-5 mr-2" />}
                label="All Orders"
                isActive={activeTab === "all"}
                onClick={() => setActiveTab("all")}
              />
              <TabButton
                icon={<Truck className="w-5 h-5 mr-2" />}
                label="In Transit"
                isActive={activeTab === "in transit"}
                onClick={() => setActiveTab("in transit")}
              />
              <TabButton
                icon={<CheckCircle className="w-5 h-5 mr-2" />}
                label="Delivered"
                isActive={activeTab === "delivered"}
                onClick={() => setActiveTab("delivered")}
              />
            </div>
          </motion.div>

          <AnimatePresence>
            {filteredDeliveries.map((delivery) => (
              <DeliveryCard key={delivery.id} delivery={delivery} />
            ))}
          </AnimatePresence>

          {filteredDeliveries.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-gray-600 mt-8"
            >
              <Box className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p>No orders found for the selected status.</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

const TabButton = ({
  icon,
  label,
  isActive,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`flex items-center px-4 py-2 rounded-full mb-2 sm:mb-0 ${
      isActive ? "bg-blue-100 text-blue-600" : "text-gray-600 hover:bg-gray-100"
    }`}
    onClick={onClick}
  >
    {icon}
    {label}
  </motion.button>
);

export default DeliveryOrdersPage;
