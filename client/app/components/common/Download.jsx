import { DropdownItem } from "flowbite-react";
import React from "react";
import { IoCloudDownloadOutline } from "react-icons/io5";

export const Download = ({ item }) => {
  const handleDownload = () => {
    const link = document.createElement("a");

    // Replace /upload/ with /upload/fl_attachment/ to force download
    const downloadUrl = item.url.replace("/upload/", "/upload/fl_attachment/");

    link.href = downloadUrl;
    link.download = item.name || "file.pdf"; // Set dynamic filename or fallback
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <DropdownItem onClick={handleDownload} className="flex items-center gap-2">
      <IoCloudDownloadOutline />
      
    </DropdownItem>
  );
};
