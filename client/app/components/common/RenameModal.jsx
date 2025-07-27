import { Modal, ModalBody, Spinner, TextInput } from 'flowbite-react';
import { ButtonComponent } from './ButtonComponent';

export const RenameModal = ({
  openModal,
  setOpenModal,
  handleRenameConfirm,
  newName,
  setNewName,
  loading,
}) => {
  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)}>
      <ModalBody>
        <h2 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">Rename</h2>
        <TextInput
          id="filename"
          placeholder="Enter new file name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <div className="mt-4 flex justify-end gap-4">
          <ButtonComponent color="gray" onClick={() => setOpenModal(false)} disabled={loading}>
            Cancel
          </ButtonComponent>
          <ButtonComponent onClick={handleRenameConfirm} disabled={loading}>
            {loading ? (
              <>
                <Spinner size="sm" className="mr-2" />
                Updating...
              </>
            ) : (
              'Update'
            )}
          </ButtonComponent>
        </div>
      </ModalBody>
    </Modal>
  );
};
