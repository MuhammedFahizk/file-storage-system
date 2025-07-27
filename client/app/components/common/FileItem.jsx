"use client"; // Ensure this is a client component if using useState and Modal

import React, { useState } from "react";
import Div from "./Div";
import { FaFilePdf } from "react-icons/fa6";
import { IoMdImages } from "react-icons/io";
import { SiVlcmediaplayer } from "react-icons/si";
import { FileActionsMenu } from "./FileActionMenu"; // Assuming this is correctly imported
import { Modal, ModalBody, ModalFooter, ModalHeader } from "flowbite-react"; // Import Modal from Flowbite
import { ButtonComponent } from "./ButtonComponent";

export const FileItem = ({ item, onRename, onDelete }) => {
  // State to control modal visibility
  const [showModal, setShowModal] = useState(false);

  const getFileIcon = (type) => {
    switch (type) {
      case "pdf":
        return <FaFilePdf className="text-3xl text-yellow-300" />;
      case "image":
        return <IoMdImages className="text-3xl text-red-600" />;
      case "video":
        return <SiVlcmediaplayer className="text-3xl text-blue-500" />;
      default:
        return <span className="text-3xl text-gray-500">📄</span>;
    }
  };

  // Handler to open the modal
  const handleItemClick = () => {
    setShowModal(true);
  };

  // Handler to close the modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Div
      className="overflow-hidden w-full bg-ternary p-4 rounded-xl
                 group hover:shadow-lg transition-shadow duration-200 relative"
    >
      <div className="absolute top-2 right-2 z-10">
        <FileActionsMenu onRename={onRename} onDelete={onDelete} item={item} />
      </div>

    
      <div
        className="block w-full h-full cursor-pointer"
        onClick={handleItemClick}
      >
        <div className="flex items-center space-x-3 mb-3">
          {getFileIcon(item.type)}
          <p
            className="flex-1 text-md font-medium text-gray-800
                       whitespace-nowrap overflow-hidden text-ellipsis pr-10"
            title={item.name}
          >
            {item.name}
          </p>
        </div>

        {item.type === "image" && item.url ? (
          <div className="w-full h-32 flex items-center justify-center overflow-hidden rounded-lg bg-gray-200">
            <img
              src={item.url}
              alt={item.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="w-full h-32 flex items-center justify-center bg-gray-100 rounded-lg text-gray-500 text-sm">
            {item.type === "pdf" && "PDF Document"}
            {item.type === "video" && "Video File"}
            {!item.type && "Unknown File Type"}
          </div>
        )}
      </div>

      <Modal
        show={showModal}
        size="large"
        className="z-50 absolute"
        onClose={handleCloseModal}
      >
        <ModalBody className="relative p-0">
          {/* Top-right buttons overlay */}
          <Div className="absolute top-4 right-4 z-10 flex gap-2">
            {item.url && (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:bg-btnHover cursor-pointer p-2 rounded-full px-4"
              >
                Open in New Tab
              </a>
            )}
            <ButtonComponent onClick={handleCloseModal}>Close</ButtonComponent>
          </Div>

          {/* Main preview content */}
          <div className="space-y-6 p-6">
            {item.type === "image" && item.url ? (
              <img
                src={item.url}
                alt={item.name}
                className="max-w-full w-auto max-h-[75vh] object-contain mx-auto"
                loading="lazy"
              />
            ) : item.type === "pdf" && item.url ? (
              <div className="text-center pt-8">
                <p>PDF Preview not available directly here.</p>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Click to View/Download PDF
                </a>
              </div>
            ) : item.type === "video" && item.url ? (
              <div className="w-full pt-8">
                <video controls className="w-full h-auto">
                  <source src={item.url} type={item.mimetype} />
                  Your browser does not support the video tag.
                </video>
              </div>
            ) : (
              <p className="text-center text-gray-500 pt-8">
                Preview not available for this file type.
              </p>
            )}
          </div>
        </ModalBody>
      </Modal>
    </Div>
  );
};
