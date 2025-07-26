
"use client";

import { Dropdown, DropdownItem } from "flowbite-react";
import { IoSettingsOutline } from "react-icons/io5";

export function Settings() {
  return (
    <Dropdown label="" dismissOnClick={false} renderTrigger={() => <span><IoSettingsOutline className=" cursor-pointer" size={20}/></span>}>
      <DropdownItem>Dashboard</DropdownItem>
      <DropdownItem>Settings</DropdownItem>
      <DropdownItem>Earnings</DropdownItem>
      <DropdownItem>Sign out</DropdownItem>
    </Dropdown>
  );
}
