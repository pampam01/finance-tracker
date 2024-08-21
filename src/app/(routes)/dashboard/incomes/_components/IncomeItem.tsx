import { BudgetListProps, IncomeListProps } from "@/types/types";
import { db } from "@/utils/dbConfig";
import { Incomes } from "@/utils/schema";
import { eq } from "drizzle-orm";

import React from "react";
import { toast } from "sonner";
import DeleteIncome from "./DeleteIncome";
import formatToIDRCurrency from "@/utils";

interface IncomeItemProps {
  income: BudgetListProps;
  refreshData: () => Promise<void>;
}

const IncomeItem = ({ income, refreshData }: IncomeItemProps) => {
  const deleteIncome = async () => {
    const result = await db
      .delete(Incomes)
      .where(eq(Incomes.id, income.id))
      .returning();
    if (result) {
      refreshData();
      toast.success("Income deleted successfully");
    }
  };

  return (
    <div className="p-6 border rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out cursor-pointer h-[170px] relative transform hover:scale-105">
      <div className="flex gap-4 items-center justify-between">
        <div className="flex gap-4 items-center">
          <div className="text-2xl p-3 px-4 bg-gradient-to-r from-green-400 via-teal-400 to-blue-400 text-white rounded-full shadow-md">
            {income?.icon}
          </div>
          <div>
            <h2 className="font-bold text-xl text-gray-800">{income?.name}</h2>
          </div>
        </div>
        <h2 className="font-bold text-indigo-600 text-xl">
          {formatToIDRCurrency(income?.amount)}
        </h2>
      </div>

      <DeleteIncome deleteIncome={deleteIncome} />
    </div>
  );
};

export default IncomeItem;
