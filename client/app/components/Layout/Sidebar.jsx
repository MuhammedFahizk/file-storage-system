"use client"
import React from "react";
import Link from "next/link";
import {
  LuFolder,
  LuStar,
  LuTrash,
  LuUpload,
  LuSettings,
} from "react-icons/lu";
import { CreateButton } from "../common/CreateButton";

export const SideBar = () => {
  const menuItems = [
    {
      label: "My Files",
      icon: <LuFolder className="size-5" />,
      route: "/files",
    },
    {
      label: "Starred",
      icon: <LuStar className="size-5" />,
      route: "/starred",
    },
    {
      label: "Trash",
      icon: <LuTrash className="size-5" />,
      route: "/trash",
    },
    {
      label: "Uploads",
      icon: <LuUpload className="size-5" />,
      route: "/uploads",
    },
    {
      label: "Settings",
      icon: <LuSettings className="size-5" />,
      route: "/settings",
    },
  ];

  return (
    <div className="hs-overlay-body-open:overflow-hidden">
      <CreateButton/>
      {/* Sidebar */}
      
      <div
        id="hs-sidebar-content-push"
        className="hs-overlay [--auto-close:lg] lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 w-64
        hs-overlay-open:translate-x-0
        -translate-x-full transition-all duration-300 transform
        h-full hidden fixed top-0 start-0 bottom-0 z-60
        bg-bg"
        role="dialog"
        aria-label="Sidebar"
      >
        <div className="flex flex-col  justify-center h-full space-y-2">
          {menuItems.map((item, idx) => (
            <Link
              key={idx}
              href={item.route}
              className="flex items-center gap-18  px-6 text-sm text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-neutral-800 p-2 rounded-md"
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
