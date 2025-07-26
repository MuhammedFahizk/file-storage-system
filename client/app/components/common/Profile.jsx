
"use client";

import { Dropdown, DropdownItem } from "flowbite-react";
import { PiUserCircleLight } from "react-icons/pi";

export function Profile() {
  return (
    <Dropdown label="" dismissOnClick={false} renderTrigger={() => <span><PiUserCircleLight className=" cursor-pointer" size={30}/></span>}>
      <DropdownItem>Dashboard</DropdownItem>
      <DropdownItem>Settings</DropdownItem>
      <DropdownItem>Earnings</DropdownItem>
      <DropdownItem>Sign out</DropdownItem>
    </Dropdown>
  );
}
