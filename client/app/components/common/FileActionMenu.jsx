import React, { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Dropdown, DropdownItem } from 'flowbite-react';
import { RenameModal } from './RenameModal';
import { renameFile } from '@/app/services/patchApi';
import { Download } from './Download';
import { Trash } from './ConfirmationModal';
import { LiaPencilAltSolid } from 'react-icons/lia';
import { deleteFile } from '@/app/services/deleteApi';
import { ConfirmationModal } from './ConfirmationModal';
import { GoTrash } from "react-icons/go";

export const FileActionsMenu = ({ item }) => {
  const [openRenameModal, setOpenRenameModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [newName, setNewName] = useState(item.name || '');
  const [loading, setLoading] = useState(false);

  const handleRenameConfirm = async () => {
    if (!newName.trim()) {
      alert('Filename cannot be empty.');
      return;
    }

    setLoading(true);
    try {
      await renameFile({ fileId: item._id, newName: newName });
      setOpenRenameModal(false);
    } catch (err) {
      console.error('Rename error:', err);
      alert(err?.message || 'Failed to rename the file.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    setLoading(true);
    try {
      await deleteFile({fileId:item._id}); // implement this API
      setOpenDeleteModal(false);
    } catch (err) {
      console.error('Delete error:', err);
      alert(err?.message || 'Failed to delete the file.');
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
        {item.itemType === "file" &&  (
        <Download item={item} />

        )}

        <DropdownItem onClick={() => setOpenRenameModal(true)}>
          <LiaPencilAltSolid className="mr-2" />
        </DropdownItem>

        {/* <DropdownItem onClick={() => console.log('Star:', item.name)}>
          Star
        </DropdownItem> */}

        <DropdownItem onClick={() => setOpenDeleteModal(true)}>
          <GoTrash />
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
