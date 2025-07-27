"use client";

import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export function ConfirmationModal({
  openModal,
  setOpenModal,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  loading = false,
}) {
  return (
    <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
      <ModalHeader />
      <ModalBody>
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
          <h3 className="mb-5 text-lg font-semibold text-gray-700 dark:text-gray-300">
            {title}
          </h3>
          <p className="mb-5 text-sm text-gray-500 dark:text-gray-400">{message}</p>
          <div className="flex justify-center gap-4">
            <Button color="red" onClick={onConfirm} isProcessing={loading}>
              {loading ? "Deleting..." : "Yes, I'm sure"}
            </Button>
            <Button color="gray" onClick={() => setOpenModal(false)} disabled={loading}>
              No, cancel
            </Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
}
