"use client";

import React from "react";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { menuList } from "../../../../../constants/menuList";
import Image from "next/image";

const SideNav = () => {
  const path = usePathname();

  return (
    <div className="h-screen p-5 border shadow-sm">
      <Link href={"/"} className="flex flex-row items-center">
        <Image src={"/chart-donut.svg"} alt="logo" width={40} height={25} />
        <span className="text-blue-800 font-bold text-xl">Finance Smart</span>
      </Link>
      <div className="mt-5">
        {menuList.map((menu, index) => (
          <Link href={menu.path} key={index}>
            <h2
              className={`flex gap-2 items-center text-gray-500 font-medium mb-2 p-4 cursor-pointer rounded-full hover:text-primary hover:bg-blue-100 
                    ${path == menu.path && "text-primary bg-blue-100"}
                    `}
            >
              <menu.icon />
              {menu.name}
            </h2>
          </Link>
        ))}
      </div>
      <div className="fixed bottom-10 p-5 flex gap-2 items-center">
        <UserButton />
        <h2 className="capitalize font-medium text-gray-950 ">Profile</h2>
      </div>
    </div>
  );
};

export default SideNav;
