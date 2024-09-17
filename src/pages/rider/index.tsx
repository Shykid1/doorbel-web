// import React from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   LineChart,
//   Line,
// } from "recharts";
// import { Package, Users, DollarSign } from "lucide-react";

// // Mock data for charts
// const deliveryData = [
//   { name: "Jan", deliveries: 65 },
//   { name: "Feb", deliveries: 59 },
//   { name: "Mar", deliveries: 80 },
//   { name: "Apr", deliveries: 81 },
//   { name: "May", deliveries: 56 },
//   { name: "Jun", deliveries: 55 },
// ];

// const revenueData = [
//   { name: "Jan", revenue: 4000 },
//   { name: "Feb", revenue: 3000 },
//   { name: "Mar", revenue: 5000 },
//   { name: "Apr", revenue: 4800 },
//   { name: "May", revenue: 3800 },
//   { name: "Jun", revenue: 4300 },
// ];

// // Mock data for orders
// const orders = [
//   {
//     id: 1,
//     customer: "John Doe",
//     date: "2024-09-17",
//     status: "Delivered",
//     amount: "$50.00",
//   },
//   {
//     id: 2,
//     customer: "Jane Smith",
//     date: "2024-09-16",
//     status: "In Transit",
//     amount: "$35.50",
//   },
//   {
//     id: 3,
//     customer: "Bob Johnson",
//     date: "2024-09-15",
//     status: "Pending",
//     amount: "$75.20",
//   },
//   {
//     id: 4,
//     customer: "Alice Brown",
//     date: "2024-09-14",
//     status: "Delivered",
//     amount: "$42.80",
//   },
//   {
//     id: 5,
//     customer: "Charlie Davis",
//     date: "2024-09-13",
//     status: "Cancelled",
//     amount: "$60.00",
//   },
// ];

// const Overview: React.FC = () => {
//   return (
//     <div className="space-y-6">
//       <h1 className="text-3xl font-bold">Dashboard</h1>

//       {/* Stat Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">
//               Successful Deliveries
//             </CardTitle>
//             <Package className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">1,234</div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">
//               Total Customers
//             </CardTitle>
//             <Users className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">567</div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
//             <DollarSign className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">$12,345</div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Charts */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <Card>
//           <CardHeader>
//             <CardTitle>Monthly Deliveries</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={deliveryData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Bar dataKey="deliveries" fill="#8884d8" />
//               </BarChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader>
//             <CardTitle>Monthly Revenue</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <ResponsiveContainer width="100%" height={300}>
//               <LineChart data={revenueData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
//               </LineChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Orders Table */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Recent Orders</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Order ID</TableHead>
//                 <TableHead>Customer</TableHead>
//                 <TableHead>Date</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead>Amount</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {orders.map((order) => (
//                 <TableRow key={order.id}>
//                   <TableCell>{order.id}</TableCell>
//                   <TableCell>{order.customer}</TableCell>
//                   <TableCell>{order.date}</TableCell>
//                   <TableCell>{order.status}</TableCell>
//                   <TableCell>{order.amount}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default Overview;

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { Package, Users, DollarSign } from "lucide-react";

// Mock data for charts (unchanged)
const deliveryData = [
  { name: "Jan", deliveries: 65 },
  { name: "Feb", deliveries: 59 },
  { name: "Mar", deliveries: 80 },
  { name: "Apr", deliveries: 81 },
  { name: "May", deliveries: 56 },
  { name: "Jun", deliveries: 55 },
];

const revenueData = [
  { name: "Jan", revenue: 4000 },
  { name: "Feb", revenue: 3000 },
  { name: "Mar", revenue: 5000 },
  { name: "Apr", revenue: 4800 },
  { name: "May", revenue: 3800 },
  { name: "Jun", revenue: 4300 },
];

// Mock data for orders (unchanged)
const orders = [
  {
    id: 1,
    customer: "John Doe",
    date: "2024-09-17",
    status: "Delivered",
    amount: "$50.00",
  },
  {
    id: 2,
    customer: "Jane Smith",
    date: "2024-09-16",
    status: "In Transit",
    amount: "$35.50",
  },
  {
    id: 3,
    customer: "Bob Johnson",
    date: "2024-09-15",
    status: "Pending",
    amount: "$75.20",
  },
  {
    id: 4,
    customer: "Alice Brown",
    date: "2024-09-14",
    status: "Delivered",
    amount: "$42.80",
  },
  {
    id: 5,
    customer: "Charlie Davis",
    date: "2024-09-13",
    status: "Cancelled",
    amount: "$60.00",
  },
];

const Overview: React.FC = () => {
  return (
    <div className="space-y-6 p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Successful Deliveries
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Customers
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">567</div>
          </CardContent>
        </Card>
        <Card className="sm:col-span-2 lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,345</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Deliveries</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={deliveryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="deliveries" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>{order.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Overview;
