import React from "react";
import { UserButton } from "@clerk/nextjs";

const DashboardHeader = () => {
  return (
    <div className="p-5 shadow-sm border-b flex justify-end">
      <div>
        <UserButton afterSwitchSessionUrl="/" />
      </div>
    </div>
  );
};

export default DashboardHeader;
