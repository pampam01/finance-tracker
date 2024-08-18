export interface BudgetListProps {
  totalSpend: number;
  totalItem: number;
  id: number;
  name: string;
  amount: string;
  icon: string | null;
  createdBy: string;
}

export interface ExpensiveListProps {
  id: number;
  name: string;
  amount: string;
  createdAt: string;
}

export interface IncomeListProps {
  totalAmount: number;
  id: number;
  name: string;
  amount: string;
  icon: string | null;
  createdBy: string;
}
