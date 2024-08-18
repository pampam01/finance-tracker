"use client";
import { db } from "../../../../utils/dbConfig";
import { Budgets, Expenses } from "../../../../utils/schema";
import { desc, eq } from "drizzle-orm";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import React from "react";
import { ExpensiveListProps } from "@/types/types";

import ExpensesListTable from "./_components/ExpenseListTable";

const ExpensesPage = () => {
  const [expensesList, setExpensesList] = useState<ExpensiveListProps[]>([]);

  const { user } = useUser();

  useEffect(() => {
    user && getExpensesList();
  }, [user]);

  const getExpensesList = async () => {
    const result = await db
      .select({
        id: Expenses.id,
        name: Expenses.name,
        amount: Expenses.amount,
        createdAt: Expenses.createdAt,
      })
      .from(Budgets)
      .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(
        eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress || ``)
      )
      .orderBy(desc(Expenses.id));
    setExpensesList(result);
  };

  return (
    <div className="p-10">
      <h2 className="font-bold text-3xl">My Expenses</h2>
      <ExpensesListTable
        refreshData={() => getExpensesList()}
        expensiveList={expensesList}
      />
    </div>
  );
};

export default ExpensesPage;
