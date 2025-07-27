"use client";

import React from "react";
import { Settings } from "../common/Settings";
import { Profile } from "../common/Profile";
import Div from "../common/Div";
import { SearchBar } from "../common/SearchBar";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoIosArrowRoundForward } from "react-icons/io";
import Breadcrumb from "../common/Breadcrumb";
export const Navbar = () => {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  const handleForwardClick = () => {
    router.forward();
  };
  return (
    <header className="w-full bg-bg dark:bg-neutral-800 border-b border-gray-200 dark:border-neutral-700 shadow-sm">
      <nav className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        
        <Div className="flex   w-fit rounded-full p-2 cursor-pointer ">
          <IoIosArrowRoundBack onClick={handleBackClick} className="text-xl hover:scale-125" />
          <IoIosArrowRoundForward  onClick={handleForwardClick} className=" text-xl hover:scale-125"/>
        </Div>
        <Breadcrumb/>

        {/* Right Section - Settings & Profile */}
        <Div className="flex items-center gap-8">
          <Settings />
          <Profile />
        </Div>
      </nav>
    </header>
  );
};
