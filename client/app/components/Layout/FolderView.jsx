"use client"; // If this is a Next.js client component

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Div from "../common/Div";
import { getFolderItem } from "@/app/services/getApi";
import { FileItem } from "../common/FileItem";
import { FolderItem } from "../common/FolderItem";
import { CreateButton } from "../common/CreateButton";

export const FolderView = ({ folderId: propFolderId }) => {
  const params = useParams();
  const folderId = propFolderId || params.folderId || null;

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
const validFolderId = folderId === "null" ? null : folderId;
  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await getFolderItem(folderId); 
        setItems(response.items);
      } catch (err) {
        console.error("Error fetching folder items:", err);
        setError(
          err?.response?.data?.message || "Failed to load folder items."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [validFolderId]);

  return (
    <Div className="p-4 max-h-[calc(100vh-150px)] overflow-y-scroll">
      <h1 className="text-2xl font-bold mb-4">Folder View</h1>
        <CreateButton/>
    
      {loading ? (
        <p>Loading items...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : items.length === 0 ? (
        <p>This folder is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) =>
            item.itemType === "file" ? (
              <FileItem key={item.id} item={item} />
            ) : (
              <FolderItem key={item.id} item={item} />
            )
          )}
        </div>
      )}
    </Div>
  );
};
