"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useUser, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const { user, isSignedIn } = useUser();

  return (
    <div className="flex items-center justify-between border shadow-sm p-5">
      <div className="flex flex-row items-center">
        <Image src={"/chart-donut.svg"} alt="logo" width={40} height={25} />
        <span className="text-blue-800 font-bold text-xl">Finance Smart</span>
      </div>

      {isSignedIn ? (
        <div className="flex gap-3 items-center">
          <Link href={"/dashboard"}>
            <Button className="rounded-full">Go to Dashboard</Button>
          </Link>
          <UserButton />
        </div>
      ) : (
        <div className="flex gap-3 items-center">
          <Link href={"/dashboard"}>
            <Button variant={"outline"} className="rounded-full">
              Dashboard
            </Button>
          </Link>
          <Link href={"/dashboard"}>
            <Button className="rounded-full">Get Started</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
