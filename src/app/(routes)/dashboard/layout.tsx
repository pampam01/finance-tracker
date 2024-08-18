import React from "react";
import DashboardHeader from "./_components/DashboardHeader";
import SideNav from "./_components/SideNav";
import { Toaster } from "sonner";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Toaster position="bottom-center" duration={2000} richColors />
      <div className="fixed md:w-64 hidden md:block">
        <SideNav />
      </div>
      <div className="md:ml-64">
        <DashboardHeader />

        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
