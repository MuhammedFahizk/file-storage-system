import React from "react";

export const SearchBar = () => {
  return (
    <div className="max-w-sm w-full relative">
      {/* Search input */}
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-3.5">
         
        </div>
        <input
          type="text"
          placeholder="Search or type a command"
          className="py-2.5 sm:py-3 ps-10 pe-4 block w-full border border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-100 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
        />
      </div>
    </div>
  );
};
