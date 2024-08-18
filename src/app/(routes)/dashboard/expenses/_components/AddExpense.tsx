import React, { useState } from "react";
import { UserResource } from "@clerk/types";
import { db } from "../../../../../utils/dbConfig";
import { Expenses } from "../../../../../utils/schema";
import { Placeholder, SQL } from "drizzle-orm";
import { toast } from "sonner";
import moment from "moment";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

interface AddExpenseProps {
  budgetId: string;
  user: UserResource | null | undefined;
  refreshData: () => Promise<void>;
}

const AddExpense = ({ budgetId, user, refreshData }: AddExpenseProps) => {
  const [name, setName] = useState<
    string | SQL<unknown> | Placeholder<string, any>
  >();
  const [amount, setAmount] = useState<
    string | SQL<unknown> | Placeholder<string, any>
  >();
  const [loading, setLoading] = useState<boolean>(false);

  const addNewExpense = async () => {
    setLoading(true);
    if (!name || !amount) {
      toast.error("Please fill in all fields.");
      return;
    }
    const result = await db
      .insert(Expenses)
      .values({
        name: name,
        amount: amount,
        budgetId: Number(budgetId),
        createdAt: moment().format("YYYY-MM-DD"),
      })
      .returning({ insertedId: Expenses.id });

    setAmount("");
    setName("");
    if (result) {
      setLoading(false);
      refreshData();
      toast.success("Expense added successfully");
    }
    setLoading(false);
  };
  return (
    <div className="border p-5 rounded-2xl">
      <h2 className="font-bold text-lg">Add Expense</h2>
      <div className="mt-2">
        <h2 className="text-black font-medium my-1">Expense Name</h2>
        <Input
          placeholder="e.g Bedroom Decor"
          value={name as string}
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <div className="mt-4">
        <h2 className="text-black font-medium my-1">Expense Amount</h2>
        <Input
          placeholder="e.g 1000"
          value={amount as string}
          onChange={(event) => setAmount(event.target.value)}
        />
      </div>
      <Button
        disabled={!(name && amount) || loading}
        onClick={() => addNewExpense()}
        className="mt-3 w-full rounded-full"
      >
        {loading ? <Loader className="animate-spin" /> : "Add New Expense"}
      </Button>
    </div>
  );
};

export default AddExpense;
