import { BudgetListProps } from "@/types/types";
import React from "react";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface BarChartDashboardProps {
  budgetList: BudgetListProps[];
}

const BarChartDashboard = ({ budgetList }: BarChartDashboardProps) => {
  return (
    <div className="border rounded-2xl p-6 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105">
      <h2 className="font-bold text-2xl text-gray-800 mb-4 text-center">
        Activity
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={budgetList}
          margin={{
            top: 10,
          }}
        >
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12, fill: "#6b7280" }}
            axisLine={{ stroke: "#d1d5db" }}
            tickLine={{ stroke: "#d1d5db" }}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#6b7280" }}
            axisLine={{ stroke: "#d1d5db" }}
            tickLine={{ stroke: "#d1d5db" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#ffffff",
              borderRadius: "0.5rem",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            }}
            labelStyle={{ fontWeight: "bold", color: "#374151" }}
            itemStyle={{ color: "#6b7280" }}
          />
          <Legend
            wrapperStyle={{ top: -10, fontSize: "14px", color: "#6b7280" }}
          />
          <Bar
            dataKey="totalSpend"
            fill="url(#totalSpendGradient)"
            radius={[10, 10, 0, 0]}
          />
          <Bar
            dataKey="amount"
            stackId="a"
            fill="url(#amountGradient)"
            radius={[10, 10, 0, 0]}
          />
          <defs>
            <linearGradient id="totalSpendGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4845d2" />
              <stop offset="100%" stopColor="#6e66f8" />
            </linearGradient>
            <linearGradient id="amountGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#C3C2FF" />
              <stop offset="100%" stopColor="#e0e0ff" />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartDashboard;
