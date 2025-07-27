"use client";

import { Modal, ModalBody } from "flowbite-react";
import React, { useState } from "react";
import Div from "./Div";
import { ButtonComponent } from "./ButtonComponent";
import { createFolder } from "@/app/services/postApi";
import { useParams } from "next/navigation";
 import { toast } from "react-toastify";

export const CreteFolder = ({ openModal, setOpenModal, onCreateSuccess }) => {
  const [folderName, setFolderName] = useState("");
  const [loading, setLoading] = useState(false);

  const { folderId } = useParams();

  const handleCancel = () => {
    setFolderName("");
    setOpenModal(false);
  };


const handleCreate = async () => {
  if (!folderName.trim()) {
    toast.warn("Folder name cannot be empty");
    return;
  }

  try {
    setLoading(true);

    const response = await createFolder({
      name: folderName,
      folderId: folderId,
    });

    console.log("Folder created:", response.data);

    toast.success(
      <div>
        <strong>Folder Created</strong>
        <div>Your new folder has been created successfully.</div>
      </div>
    );

    // Optional: if you want to reset only on success
    setFolderName("");
    setOpenModal(false);
    onCreateSuccess();
  } catch (err) {
    console.error("Error creating folder:", err);

    toast.error(
      <div>
        <strong>Creation Failed</strong>
        <div>{err?.response?.data?.message || err.message || "Something went wrong while creating the folder."}</div>
      </div>
    );
  } finally {
    setLoading(false);
  }
};


  return (
    <Modal
      show={openModal}
      size="md"
      position="center"
      className="rounded-4xl"
      onClose={handleCancel}
    >
      <ModalBody>
        <Div className="space-y-4 p-4">
          <h3 className="text-lg font-medium">New Folder</h3>
          <input
            type="text"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            placeholder="Untitled folder"
            className="w-full p-3 border rounded"
          />
          <div className="flex justify-end gap-4">
            <ButtonComponent onClick={handleCancel}>Cancel</ButtonComponent>
            <ButtonComponent onClick={handleCreate} disabled={loading}>
              {loading ? "Creating..." : "Create"}
            </ButtonComponent>
          </div>
        </Div>
      </ModalBody>
    </Modal>
  );
};
