"use client";

import React, { useState } from "react";
import { Modal, Label, FileInput } from "flowbite-react";
import Div from "./Div";
import { ButtonComponent } from "./ButtonComponent";
import { SelectedFile } from "./SelectedFile";
import { createFile } from "@/app/services/postApi";
import { useParams } from "next/navigation";

export const CreateFile = ({ openModal, setOpenModal, onCreateSuccess }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(false);

    const { folderId } = useParams();
  

  const handleCancel = () => {
    setSelectedFiles([]);
    setOpenModal(false);
  };

const handleSubmit = async () => {
    if (selectedFiles.length === 0) {
        alert("Please select at least one file to upload.");
        return;
    }
    console.log("selectedFiles", selectedFiles);

    const formData = new FormData();
    // Iterate over each selected file and append it to the FormData object
    selectedFiles.forEach((file) => {
        formData.append("files", file, file.name);
    });

    console.log("FormData content (for debugging):");
    // You can't directly console.log FormData content,
    // but you can iterate and log its entries
    for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
    }


    console.log("Files uploaded:", formData );
    try {
        setLoading(true);
        formData.append("folderId", folderId )
        const response = await createFile(formData);
        console.log("Files uploaded:", formData, response.data);
        handleCancel(); // reset state
    } catch (err) {
        console.error("Upload failed:", err);
        alert(err?.response?.data?.message || "Failed to upload files");
    } finally {
onCreateSuccess()
        setLoading(false);
        
    }
};

  const handleFileChange = (e) => {
    console.log(e.target.files[0]);
    setSelectedFiles(Array.from(e.target.files));
  };

  const handleRemoveFile = (indexToRemove) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  return (
    <Modal show={openModal} size="xl" position="center" onClose={handleCancel}>
      <Div className="space-y-4 max-h-screen overflow-y-auto p-4 py-8">
        <h3 className="text-lg font-medium">Upload Files</h3>

        <Label
          htmlFor="dropzone-file"
          className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pb-6 pt-5">
            <svg
              className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Supported: SVG, PNG, JPG, PDF, etc.
            </p>
          </div>
         <form  >
             <FileInput
            id="dropzone-file"
            className="hidden"
            name="files"
            onChange={handleFileChange}
            multiple
          />
         </form>
        </Label>

        {selectedFiles.length > 0 && (
          <div className="mt-4 space-y-2 text-sm">
            <h4 className="font-semibold">Selected Files:</h4>
            <ul>
              {selectedFiles.map((file, index) => (
                <SelectedFile
                  key={index}
                  file={file}
                  index={index}
                  onRemove={handleRemoveFile}
                />
              ))}
            </ul>
          </div>
        )}
      </Div>

      <Div className="flex justify-end gap-2 px-4 pb-4">
        <ButtonComponent onClick={handleSubmit} disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </ButtonComponent>
        <ButtonComponent onClick={handleCancel}>Cancel</ButtonComponent>
      </Div>
    </Modal>
  );
};
