import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Dropdown, DropdownItem } from "flowbite-react";
import { RenameModal } from "./RenameModal";
import { renameFile, renameFolder } from "@/app/services/patchApi";
import { Download } from "./Download";
import { deleteFile, deleteFolder } from "@/app/services/deleteApi";
import { ConfirmationModal } from "./ConfirmationModal";
import { LiaPencilAltSolid } from "react-icons/lia";
import { GoTrash } from "react-icons/go";
import { toast } from "react-toastify";

export const FileActionsMenu = ({ item, setData, onRename, onDelete }) => {
  const [openRenameModal, setOpenRenameModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [newName, setNewName] = useState(item.name || "");
  const [loading, setLoading] = useState(false);

  const handleRenameConfirm = async () => {
    if (!newName.trim()) {
      toast.error("Name cannot be empty.");
      return;
    }

    setLoading(true);
    try {
      if (item.itemType === "file") {
        await renameFile({ fileId: item._id, newName });
      } else {
        await renameFolder({ folderId: item._id, newName });
      }

      toast.success(
        <div>
          <strong>Renamed Successfully</strong>
          <div>“{item.name}” is now “{newName}”.</div>
        </div>
      );

      onRename(item._id, newName);
      setOpenRenameModal(false);
    } catch (err) {
      console.error("Rename error:", err);
      toast.error(
        <div>
          <strong>Rename Failed</strong>
          <div>{err?.message || "Could not rename the item."}</div>
        </div>
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    setLoading(true);
    try {
      if (item.itemType === "file") {
        await deleteFile({ fileId: item._id });
      } else {
        await deleteFolder({ folderId: item._id });
      }

      toast.success(
        <div>
          <strong>Deleted Successfully</strong>
          <div>“{item.name}” has been removed.</div>
        </div>
      );

      onDelete(item._id);
      setOpenDeleteModal(false);
    } catch (err) {
      console.error("Delete error:", err);
      toast.error(
        <div>
          <strong>Delete Failed</strong>
          <div>{err?.message || "Could not delete the item."}</div>
        </div>
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dropdown
        label=""
        renderTrigger={() => (
          <button className="p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <BsThreeDotsVertical className="text-gray-600" />
          </button>
        )}
        placement="bottom-end"
        inline
      >
        {item.itemType === "file" && <Download item={item} />}

        <DropdownItem onClick={() => setOpenRenameModal(true)}>
          <LiaPencilAltSolid className="mr-2" />
          Rename
        </DropdownItem>

        <DropdownItem onClick={() => setOpenDeleteModal(true)}>
          <GoTrash className="mr-2" />
          Delete
        </DropdownItem>
      </Dropdown>

      <RenameModal
        openModal={openRenameModal}
        setOpenModal={setOpenRenameModal}
        handleRenameConfirm={handleRenameConfirm}
        newName={newName}
        setNewName={setNewName}
        loading={loading}
      />

      <ConfirmationModal
        openModal={openDeleteModal}
        setOpenModal={setOpenDeleteModal}
        onConfirm={handleDeleteConfirm}
        title="Confirm Deletion"
        message={`Are you sure you want to delete "${item.name}"?`}
        loading={loading}
      />
    </>
  );
};
