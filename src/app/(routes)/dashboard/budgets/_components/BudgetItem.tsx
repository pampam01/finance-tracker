import { BudgetListProps } from "@/types/types";
import formatToIDRCurrency from "@/utils";
import Link from "next/link";
import React from "react";

interface BudgetItemProps {
  budget: BudgetListProps;
}
const BudgetItem = ({ budget }: BudgetItemProps) => {
  const calculateProgressPerc = () => {
    const perc = (budget.totalSpend / Number(budget.amount)) * 100;
    return perc > 100 ? 100 : perc.toFixed(2);
  };
  return (
    <Link href={`/dashboard/expenses/${budget?.id}`}>
      <div
        className="p-5 border rounded-2xl bg-white
        hover:shadow-lg transition-shadow duration-300 ease-in-out cursor-pointer h-[170px] transform hover:scale-105"
      >
        <div className="flex gap-4 items-center justify-between">
          <div className="flex gap-4 items-center">
            <div
              className="text-2xl p-4
              bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-full shadow-md"
            >
              {budget?.icon}
            </div>
            <div>
              <h2 className="font-bold text-lg text-gray-800">{budget.name}</h2>
              <h2 className="text-sm text-gray-500">{budget.totalItem} Item</h2>
            </div>
          </div>
          <h2 className="font-bold text-indigo-600 text-xl">
            {formatToIDRCurrency(budget.amount)}
          </h2>
        </div>

        <div className="mt-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs text-gray-500">
              {formatToIDRCurrency(budget.totalSpend || 0)} Spend
            </h2>
            <h2 className="text-xs text-gray-500">
              {formatToIDRCurrency(Number(budget.amount) - budget.totalSpend)}{" "}
              Remaining
            </h2>
          </div>
          <div className="w-full bg-gray-300 h-2 rounded-full">
            <div
              className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-2 rounded-full transition-width duration-300"
              style={{
                width: `${calculateProgressPerc()}%`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BudgetItem;
