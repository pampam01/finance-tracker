import {
  CircleDollarSign,
  LayoutGrid,
  LucideProps,
  PiggyBank,
  ReceiptText,
  ShieldCheck,
} from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

interface menuListProps {
  id: number;
  name: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  path: string;
}

export const menuList: menuListProps[] = [
  {
    id: 1,
    name: "Dashboard",
    icon: LayoutGrid,
    path: "/dashboard",
  },
  {
    id: 2,
    name: "Incomes",
    icon: CircleDollarSign,
    path: "/dashboard/incomes",
  },
  {
    id: 2,
    name: "Budgets",
    icon: PiggyBank,
    path: "/dashboard/budgets",
  },
  {
    id: 3,
    name: "Expenses",
    icon: ReceiptText,
    path: "/dashboard/expenses",
  },
  {
    id: 4,
    name: "Upgrade",
    icon: ShieldCheck,
    path: "/dashboard/upgrade",
  },
];
