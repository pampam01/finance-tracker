"use client";
import { Button } from "@/components/ui/button";
import { PenBox } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EmojiPicker from "emoji-picker-react";
import { useUser } from "@clerk/nextjs";
import { Input } from "@/components/ui/input";

import { db } from "../../../../../utils/dbConfig";
import { Budgets } from "../../../../../utils/schema";
import { eq, Placeholder, SQL } from "drizzle-orm";
import { toast } from "sonner";

import { BudgetListProps } from "@/types/types";
import React, { useEffect, useState } from "react";

interface EditBudgetProps {
  budgetInfo?: BudgetListProps;
  refreshData: () => Promise<void>;
}

const EditBudget = ({ budgetInfo, refreshData }: EditBudgetProps) => {
  const [emojiIcon, setEmojiIcon] = useState(budgetInfo?.icon);
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

  const [name, setName] = useState<string | SQL<unknown>>();
  const [amount, setAmount] = useState<string | SQL<unknown>>();
  const { user } = useUser();

  useEffect(() => {
    if (budgetInfo) {
      setEmojiIcon(budgetInfo?.icon);
      setAmount(budgetInfo.amount);
      setName(budgetInfo.name);
    }
  }, [budgetInfo]);

  const onUpdateBudget = async () => {
    if (!name || !amount) {
      toast.error("Please fill in all fields.");
      return;
    }

    const result = await db
      .update(Budgets)
      .set({
        name: name,
        amount: amount,
        icon: emojiIcon,
      })
      .where(eq(Budgets.id, Number(budgetInfo?.id)))
      .returning();

    if (result) {
      refreshData();
      toast.success("Budget updated successfully");
    }
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="flex space-x-2 gap-2 rounded-full">
            <PenBox className="h-5 w-5" />
            Edit
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Budget</DialogTitle>
            <DialogDescription>
              <div className="mt-5">
                <Button
                  variant={"outline"}
                  className="text-lg"
                  onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                >
                  {emojiIcon}
                </Button>

                <div className="absolute z-20">
                  <EmojiPicker
                    open={openEmojiPicker}
                    onEmojiClick={(e) => {
                      setEmojiIcon(e.emoji);
                      setOpenEmojiPicker(false);
                    }}
                  />
                </div>
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">Budget Name</h2>
                  <Input
                    placeholder="e.g. Home Decor"
                    defaultValue={budgetInfo?.name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">Budget Amount</h2>
                  <Input
                    type="number"
                    defaultValue={budgetInfo?.amount}
                    placeholder="e.g. 5000$"
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                disabled={!(name && amount)}
                onClick={() => onUpdateBudget()}
                className="mt-5 w-full rounded-full"
              >
                Update Budget
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditBudget;
