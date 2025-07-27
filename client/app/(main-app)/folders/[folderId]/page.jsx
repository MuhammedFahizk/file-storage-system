"use client";
import { FolderView } from "@/app/components/Layout/FolderView";
import withAuth from "@/app/Utils/withAuth";
import { useParams } from "next/navigation";
import React from "react";

const page = () => {
  const { folderId } = useParams();

  return <FolderView folderId={folderId} />;
};

export default withAuth(page);
