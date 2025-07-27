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
    <Div className="fixed bottom-6 right-6 z-50 group w-fit">
  {/* Main Button */}
  <button className="bg-secondary  shadow-xl p-4 rounded-xl cursor-pointer z-10 relative">
    <FaPlus className='text-2xl' />
  </button>

  {/* Slide-in Buttons */}
  <div className="absolute right-full top-1/2 -translate-y-1/2 flex gap-3 opacity-0 translate-x-[50px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
    <button
      className="bg-secondary cursor-pointer  shadow-md p-3 rounded-xl  text-sm"
      onClick={() => setOpenFileModal(true)}
    >
      <GoFileDirectory  className='text-2xl'/>
    </button>
    <button
      className="bg-secondary cursor-pointer shadow-md p-3 rounded-xl text-sm"
      onClick={() => setOpenFolderModal(true)}
    >
      <PiFolderThin className='text-2xl' />
    </button>
  </div>

  {/* Folder Modal */}
  <CreteFolder
    onCreateSuccess={onCreateSuccess}
    openModal={openFolderModal}
    setOpenModal={setOpenFolderModal}
  />

  {/* File Modal */}
  <CreateFile
    onCreateSuccess={onCreateSuccess}
    openModal={openFileModal}
    setOpenModal={setOpenFileModal}
  />
</Div>

  );
};
