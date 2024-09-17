import React from "react";
import { motion } from "framer-motion";
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
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ArrowUpRight, ArrowDownRight, DollarSign } from "lucide-react";

const transactionData = [
  { date: "2024-09-01", amount: 1200 },
  { date: "2024-09-02", amount: 800 },
  { date: "2024-09-03", amount: 1500 },
  { date: "2024-09-04", amount: 2000 },
  { date: "2024-09-05", amount: 1800 },
  { date: "2024-09-06", amount: 2200 },
  { date: "2024-09-07", amount: 1900 },
];

const recentTransactions = [
  { id: 1, description: "Payment from John Doe", amount: 500, type: "credit" },
  { id: 2, description: "Refund to Jane Smith", amount: 150, type: "debit" },
  {
    id: 3,
    description: "Payment from Bob Johnson",
    amount: 750,
    type: "credit",
  },
  { id: 4, description: "Service fee", amount: 50, type: "debit" },
  {
    id: 5,
    description: "Payment from Alice Brown",
    amount: 600,
    type: "credit",
  },
];

const Transactions: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <h1 className="text-3xl font-bold">Transactions</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Transaction Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={transactionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Transaction Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Total Transactions</span>
                <span className="text-2xl font-bold">1,234</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Total Volume</span>
                <span className="text-2xl font-bold">$45,678</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Average Transaction</span>
                <span className="text-2xl font-bold">$37.02</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" />
                      {transaction.amount.toFixed(2)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div
                      className={`flex items-center ${
                        transaction.type === "credit"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {transaction.type === "credit" ? (
                        <ArrowUpRight className="h-4 w-4 mr-1" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 mr-1" />
                      )}
                      {transaction.type}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Transactions;
