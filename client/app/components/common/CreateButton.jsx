'use client';

import React, { useState } from 'react';
import Div from './Div';
import { FaPlus } from "react-icons/fa6";
import { GoFileDirectory } from "react-icons/go";
import { PiFolderThin } from "react-icons/pi";
import { CreteFolder } from './CreteFolder';
import { CreateFile } from './CreateFile';

export const CreateButton = ({onCreateSuccess}) => {
  const [openFolderModal, setOpenFolderModal] = useState(false);
  const [openFileModal, setOpenFileModal] = useState(false);

  return (
    <Div className="relative group w-fit">
      {/* Main Button */}
      <button className="bg-white shadow-xl p-3 rounded-full cursor-pointer z-10 relative">
        <FaPlus />
      </button>

      {/* Slide-in Buttons */}
      <div className="absolute left-15 top-1/2 -translate-y-1/2 flex gap-2 opacity-0 translate-x-[-20px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
        <button
          className="bg-white shadow-md p-3 rounded-full text-sm"
          onClick={() => setOpenFileModal(true)}
        >
          <GoFileDirectory />
        </button>
        <button
          className="bg-white cursor-pointer shadow-md p-3 rounded-full text-sm"
          onClick={() => setOpenFolderModal(true)}
        >
          <PiFolderThin />
        </button>
      </div>

      {/* Folder Modal */}
      <CreteFolder onCreateSuccess={onCreateSuccess} openModal={openFolderModal} setOpenModal={setOpenFolderModal} />

      {/* File Modal */}
      <CreateFile onCreateSuccess={onCreateSuccess} onCreateSuccess={onCreateSuccess} openModal={openFileModal} setOpenModal={setOpenFileModal} />
    </Div>
  );
};
