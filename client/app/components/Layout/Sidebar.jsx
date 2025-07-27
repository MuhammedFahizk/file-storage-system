"use client";
import React, { useState } from "react";
import Link from "next/link";
import { LuFolder, LuSettings, LuTrash, LuLogOut } from "react-icons/lu";
import { CreateButton } from "../common/CreateButton";
import { Spinner } from "flowbite-react";
import { logout } from "@/app/services/postApi";
import { authUserLogout } from "@/app/Redux/feathers/auth";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export const SideBar = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const menuItems = [
    {
      label: "Home",
      icon: <LuFolder className="size-5" />,
      route: "/",
    },
    {
      label: "Settings",
      icon: <LuSettings className="size-5" />,
      route: "/settings",
    },
  ];

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      dispatch(authUserLogout());
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Logout failed", {
        description:
          error?.response?.data?.message || error.message || "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hs-overlay-body-open:overflow-hidden">
      <CreateButton />

      <div
        id="hs-sidebar-content-push"
        className="hs-overlay [--auto-close:lg] lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 w-64
        hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform
        h-full hidden fixed top-0 start-0 bottom-0 z-60 bg-bg"
        role="dialog"
        aria-label="Sidebar"
      >
        <div className="flex flex-col justify-center h-full space-y-2 p-4">
          {menuItems.map((item, idx) => (
            <Link
              key={idx}
              href={item.route}
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-md"
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-neutral-800 rounded-md mt-4"
            disabled={loading}
          >
            <LuLogOut className="size-5" />
            {loading ? (
              <span className="flex items-center gap-2">
                <Spinner size="sm" /> Logging out...
              </span>
            ) : (
              "Log Out"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
