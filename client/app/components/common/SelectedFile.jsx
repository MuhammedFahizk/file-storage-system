import React from 'react';
import Div from './Div';
import { FaTimes } from 'react-icons/fa';
import { ButtonComponent } from './ButtonComponent';

export const SelectedFile = ({ file, index, onRemove }) => {
  return (
    <Div>
      <li
        className="p-3 bg-ternary my-1 rounded-lg flex justify-between items-center"
        key={index}
      >
        <span>{file.name}</span>
        <ButtonComponent
          onClick={() => onRemove(index)}
          className="text-red-500 cursor-pointer    hover:text-red-700"
          aria-label="Remove file"
        >
          <FaTimes />
        </ButtonComponent>
      </li>
    </Div>
  );
};
