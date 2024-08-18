import { BudgetListProps, IncomeListProps } from "@/types/types";
import { db } from "@/utils/dbConfig";
import { Incomes } from "@/utils/schema";
import { eq } from "drizzle-orm";

import React from "react";
import { toast } from "sonner";
import DeleteIncome from "./DeleteIncome";

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
    <div
      className="p-5 border rounded-2xl
        hover:shadow-md cursor-pointer h-[170px] relative"
    >
      <div className="flex gap-2 items-center justify-between">
        <div className="flex gap-2 items-center">
          <h2
            className="text-2xl p-3 px-4
                  bg-slate-100 rounded-full 
                  "
          >
            {income?.icon}
          </h2>
          <div>
            <h2 className="font-bold">{income?.name}</h2>
            {/* <p className="text-slate-500">Created by: {income?.totalAmount}</p> */}
          </div>
        </div>
        <h2 className="font-bold text-primary text-lg"> ${income?.amount}</h2>
      </div>

      <DeleteIncome deleteIncome={deleteIncome} />
    </div>
  );
};

export default IncomeItem;
