"use client"; // If this is a Next.js client component

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Div from "../common/Div";
import { getFolderItem } from "@/app/services/getApi";
import { FileItem } from "../common/FileItem";
import { FolderItem } from "../common/FolderItem";
import { CreateButton } from "../common/CreateButton";
import { FilterBox } from "../common/FilterBox";
import { Empty } from "../ui/Empty";

export const FolderView = ({ folderId: propFolderId }) => {
  const params = useParams();
  const folderId = propFolderId || params.folderId || null;

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const validFolderId = folderId === "null" ? null : folderId;
  const [filter, setFilter] = useState([]);

  const fetchItems = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getFolderItem({
        folderId: validFolderId,
        filter,
      });
      setItems(response.items);
    } catch (err) {
      console.error("Error fetching folder items:", err);
      setError(err?.response?.data?.message || "Failed to load folder items.");
    } finally {
      setLoading(false);
    }
  };

  const handleRename = (id, newName) => {
    setItems((prev) =>
      prev.map((folder) =>
        folder._id === id ? { ...folder, name: newName } : folder
      )
    );
  };

  const handleDelete = (id) => {
  setItems((prev) => prev.filter((item) => item._id !== id));
};


  useEffect(() => {
    fetchItems();
  }, [validFolderId, filter]);

  return (
    <Div className="p-4 max-h-[calc(100vh-150px)] overflow-y-scroll">
      <Div className={"flex justify-between w-full items-center  h-full  "}>
        <h1 className="text-2xl font-bold ">Folder View</h1>
        <FilterBox filter={filter} setFilter={setFilter} />
      </Div>
      <CreateButton onCreateSuccess={fetchItems} />

      {loading ? (
        <p>Loading items...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : items.length === 0 ? (
        <Empty/>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) =>
            item.itemType === "file" ? (
              <FileItem key={item.id} item={item} onDelete={handleDelete} onRename={handleRename} />
            ) : (
              <FolderItem key={item.id} onRename={handleRename} onDelete={handleDelete} item={item} />
            )
          )}
        </div>
      )}
    </Div>
  );
};
