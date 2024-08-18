"use client";

import React, { useEffect, useState } from "react";
import IncomeList from "./_components/IncomeList";
import { useUser } from "@clerk/nextjs";
import { db } from "../../../../utils/dbConfig";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { Expenses, Incomes } from "../../../../utils/schema";

import { BudgetListProps, IncomeListProps } from "@/types/types";
import CreateIncomes from "./_components/CreateIncomes";
import IncomeItem from "./_components/IncomeItem";
import { Button } from "@/components/ui/button";

const IncomesPages = () => {
  const [incomeList, setIncomeList] = useState<BudgetListProps[]>([]);
  const { user } = useUser();

  useEffect(() => {
    user && getIncomeList();
  }, [user]);

  const getIncomeList = async () => {
    const result = await db
      .select({
        ...getTableColumns(Incomes),
        totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
        totalItem: sql`count(${Expenses.id})`.mapWith(Number),
      })
      .from(Incomes)
      .leftJoin(Expenses, eq(Incomes.id, Expenses.budgetId))
      .where(
        eq(Incomes.createdBy, user?.primaryEmailAddress?.emailAddress || ``)
      )
      .groupBy(Incomes.id)
      .orderBy(desc(Incomes.id));
    setIncomeList(result);
  };

  return (
    <div className="mt-7">
      <div
        className="grid grid-cols-1
        md:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        <CreateIncomes refreshData={() => getIncomeList()} />
        {incomeList?.length > 0
          ? incomeList.map((income, index) => (
              <IncomeItem
                income={income}
                refreshData={getIncomeList}
                key={index}
              />
            ))
          : [1, 2, 3, 4, 5].map((item, index) => (
              <div
                key={index}
                className="w-full bg-slate-200 rounded-lg
        h-[150px] animate-pulse"
              ></div>
            ))}
      </div>
    </div>
  );
};

export default IncomesPages;
