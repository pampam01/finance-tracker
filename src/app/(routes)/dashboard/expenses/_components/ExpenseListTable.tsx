import { ExpensiveListProps } from "@/types/types";
import { db } from "../../../../../utils/dbConfig";
import React from "react";
import { Expenses } from "../../../../../utils/schema";
import { eq } from "drizzle-orm";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

interface ExpenseListTableProps {
  expensiveList: ExpensiveListProps[];
  refreshData: () => Promise<void>;
}

const ExpenseListTable = ({
  expensiveList,
  refreshData,
}: ExpenseListTableProps) => {
  const deleteExpense = async (expense: ExpensiveListProps) => {
    const result = await db
      .delete(Expenses)
      .where(eq(Expenses.id, expense.id))
      .returning();

    if (result) {
      toast.success("Expense deleted successfully");
      refreshData();
    }
  };
  return (
    <div className="mt-3 ">
      <h2 className="font-bold text-lg">Latest Expenses</h2>
      <div className="grid grid-cols-4 rounded-tl-xl rounded-tr-xl bg-slate-200 p-2 mt-3 border ">
        <h2 className="font-bold text-center border">Name</h2>
        <h2 className="font-bold text-center">Amount</h2>
        <h2 className="font-bold text-center">Date</h2>
        <h2 className="font-bold text-center">Action</h2>
      </div>
      {expensiveList.map((expense, index) => (
        <div
          className="grid grid-cols-4 bg-slate-50 rounded-bl-xl rounded-br-xl p-2"
          key={index}
        >
          <h2 className="text-center">{expense.name}</h2>
          <h2 className="text-center">{expense.amount}</h2>
          <h2 className="text-center">{expense.createdAt}</h2>

          <div className="flex justify-center">
            <Button
              variant={"destructive"}
              className=" "
              onClick={() => deleteExpense(expense)}
            >
              <Trash className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExpenseListTable;
