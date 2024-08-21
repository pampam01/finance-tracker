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
    <div className="mt-10 max-w-5xl mx-auto">
      <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-8">
        Latest Expenses
      </h2>
      <div className="shadow-lg rounded-lg border border-gray-200">
        <table className="w-full bg-white rounded-lg">
          <thead className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
            <tr>
              <th className="py-4 px-6 text-left font-semibold text-lg tracking-wider">
                Name
              </th>
              <th className="py-4 px-6 text-left font-semibold text-lg tracking-wider">
                Amount
              </th>
              <th className="py-4 px-6 text-left font-semibold text-lg tracking-wider">
                Date
              </th>
              <th className="py-4 px-6 text-center font-semibold text-lg tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {expensiveList.map((expense, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                } border-b border-gray-200 hover:bg-gradient-to-r hover:from-indigo-100 hover:via-purple-100 hover:to-pink-100 transition duration-300 ease-in-out transform hover:scale-105`}
              >
                <td className="py-4 px-6 whitespace-nowrap text-left font-medium">
                  {expense.name}
                </td>
                <td className="py-4 px-6 text-left font-medium">
                  {expense.amount}
                </td>
                <td className="py-4 px-6 text-left font-medium">
                  {expense.createdAt}
                </td>
                <td className="py-4 px-6 text-center">
                  <Button
                    variant={"destructive"}
                    className="bg-red-500 text-white px-4 py-2 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110"
                    onClick={() => deleteExpense(expense)}
                  >
                    <Trash className="w-4 h-4 inline-block mr-2" />
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenseListTable;
