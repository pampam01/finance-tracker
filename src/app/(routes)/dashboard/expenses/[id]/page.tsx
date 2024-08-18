"use client";
import { db } from "../../../../../utils/dbConfig";
import { Budgets, Expenses } from "../../../../../utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import BudgetItem from "../../budgets/_components/BudgetItem";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Pen, PenBox, Trash } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";
import { BudgetListProps, ExpensiveListProps } from "@/types/types";
import ExpenseListTable from "../_components/ExpenseListTable";
import AddExpense from "../_components/AddExpense";
import EditBudget from "../_components/EditBudget";

const ExpenseScreenById = ({ params }: { params: { id: string } }) => {
  const { user } = useUser();
  const [budgetInfo, setBudgetInfo] = useState<BudgetListProps>();
  const [expensesList, setExpensesList] = useState<ExpensiveListProps[]>([]);
  const router = useRouter();

  useEffect(() => {
    user && getBudgetInfo();
  }, [user]);

  const getBudgetInfo = async () => {
    const result = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
        totalItem: sql`count(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.id, Number(params.id)))
      .groupBy(Budgets.id);

    setBudgetInfo(result[0]);
    getExpensesList();
  };

  const getExpensesList = async () => {
    const result = await db
      .select()
      .from(Expenses)
      .where(eq(Expenses.budgetId, Number(params.id)))
      .orderBy(desc(Expenses.id));
    setExpensesList(result);
  };

  const deleteBudget = async () => {
    const deleteExpensesResult = await db
      .delete(Expenses)
      .where(eq(Expenses.budgetId, Number(params.id)))
      .returning();

    if (deleteExpensesResult) {
      const result = await db
        .delete(Budgets)
        .where(eq(Budgets.id, Number(params.id)))
        .returning();
    }
    toast.success("Budget deleted successfully");
    router.replace("/dashboard/budgets");
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold gap-2 flex justify-between items-center">
        <span className="flex gap-2 items-center">
          <ArrowLeft onClick={() => router.back()} className="cursor-pointer" />
          My Expenses
        </span>
        <div className="flex gap-2 items-center">
          <EditBudget
            budgetInfo={budgetInfo}
            refreshData={() => getBudgetInfo()}
          />

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="flex gap-2 rounded-full" variant="destructive">
                <Trash className="w-4" /> Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your current budget along with expenses and remove your data
                  from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => deleteBudget()}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </h2>
      <div
        className="grid grid-cols-1 
        md:grid-cols-2 mt-6 gap-5"
      >
        {budgetInfo ? (
          <BudgetItem budget={budgetInfo} />
        ) : (
          <div
            className="h-[150px] w-full bg-slate-200 
            rounded-lg animate-pulse"
          ></div>
        )}
        <AddExpense
          budgetId={params.id}
          user={user}
          refreshData={() => getBudgetInfo()}
        />
      </div>
      <div className="mt-4">
        <ExpenseListTable
          expensiveList={expensesList}
          refreshData={() => getBudgetInfo()}
        />
      </div>
    </div>
  );
};

export default ExpenseScreenById;
