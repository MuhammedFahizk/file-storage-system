"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { authUserLogout } from "@/app/Redux/feathers/auth";
import { logout } from "@/app/services/postApi";
import { Dropdown, DropdownItem } from "flowbite-react";
import Link from "next/link";
import { PiUserCircleLight } from "react-icons/pi";
import { Spinner } from "flowbite-react"; // Make sure Flowbite's Spinner is imported

export function Profile() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await logout();
      dispatch(authUserLogout());
      // openNotification('success', `Logged out`);
    } catch (error) {
      console.error("Error logging out:", error);
      // openNotification('error', 'Logout failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dropdown
    className="z-50"
      label=""
      dismissOnClick={false}
      renderTrigger={() => (
        <span>
          <PiUserCircleLight className="cursor-pointer" size={30} />
        </span>
      )}
    >
      <DropdownItem>
        <Link href={"/"}>Home</Link>
      </DropdownItem>

      <DropdownItem>Settings</DropdownItem>

      <DropdownItem onClick={handleLogout}>
        {loading ? (
          <div className="flex items-center gap-2">
            <Spinner size="sm" /> Logging out...
          </div>
        ) : (
          "Log Out"
        )}
      </DropdownItem>
    </Dropdown>
  );
}
