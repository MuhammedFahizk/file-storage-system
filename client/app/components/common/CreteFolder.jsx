'use client';

import { Modal, ModalBody } from 'flowbite-react';
import React, { useState } from 'react';
import Div from './Div';
import { ButtonComponent } from './ButtonComponent';
import { createFolder } from '@/app/services/postApi';

export const CreteFolder = ({ openModal, setOpenModal }) => {
  const [folderName, setFolderName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCancel = () => {
    setFolderName('');
    setOpenModal(false);
  };

  const handleCreate = async () => {
    if (!folderName.trim()) {
      alert('Folder name cannot be empty');
      return;
    }

    try {
      setLoading(true);
      const response = await createFolder({ name: folderName });
      console.log('Folder created:', response.data);
      // TODO: Optional: toast or refresh folder list
    } catch (err) {
      console.error('Error creating folder:', err);
      alert(err.message || 'Failed to create folder');
    } finally {
      setLoading(false);
      setFolderName('');
      setOpenModal(false);
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
            <ButtonComponent onClick={handleCancel}>
              Cancel
            </ButtonComponent>
            <ButtonComponent onClick={handleCreate} disabled={loading}>
              {loading ? 'Creating...' : 'Create'}
            </ButtonComponent>
          </div>
        </Div>
      </ModalBody>
    </Modal>
  );
};
