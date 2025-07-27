import React from "react";
import Div from "./Div";
import { ButtonComponent } from "./ButtonComponent";

export const FilterBox = ({ filter, setFilter }) => {
  const toggleFilter = (type) => {
    if (filter.includes(type)) {
      setFilter(filter.filter((item) => item !== type)); // Remove if exists
    } else {
      setFilter([...filter, type]); // Add if not exists
    }
  };

  return (
    <Div className="relative group w-fit">
      <button className="bg-white shadow-lg p-2 ms-3 px-6 border  rounded-md cursor-pointer z-10 relative">
        Filter
      </button>

      <div className="absolute right-full top-1/2 -translate-y-1/2 flex gap-1 opacity-0 translate-x-[50px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
        {['image', 'video', 'pdf'].map((type) => (
          <ButtonComponent
            key={type}
            onClick={() => toggleFilter(type)}
            className={`rounded-md border px-3 py-1 ${
              filter.includes(type) ? "bg-blue-500 text-white" : ""
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </ButtonComponent>
        ))}
      </div>
    </Div>
  );
};
