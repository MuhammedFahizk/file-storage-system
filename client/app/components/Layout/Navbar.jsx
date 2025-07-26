import React from "react";
import { Settings } from "../common/Settings";
import { Profile } from "../common/Profile";
import Div from "../common/Div";
import { SearchBar } from "../common/SearchBar";

export const Navbar = () => {
  return (
    <header className="w-full bg-bg dark:bg-neutral-800 border-b border-gray-200 dark:border-neutral-700 shadow-sm">
      <nav className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        
        {/* Left Section - Logo or Search */}
        <div className="flex items-center gap-4">
          <a href="#" className="text-xl font-bold text-gray-900 dark:text-white">
            MyApp
          </a>
          <SearchBar/>
        </div>

        {/* Right Section - Settings & Profile */}
        <Div className="flex items-center gap-8">
          <Settings />
          <Profile />
        </Div>
      </nav>
    </header>
  );
};
