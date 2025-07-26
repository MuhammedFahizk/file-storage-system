import React from 'react';
import PropTypes from 'prop-types';
import Div from './Div';

export const ButtonComponent = ({ children, onClick, className = '', type = 'button', ...props }) => {
  return (
    <Div>
      <button
        type={type}
        onClick={onClick}
        className={`btn ${className} hover:bg-btnHover cursor-pointer p-2 rounded-full px-4 `}
        {...props}
      >
        {children}
      </button>
    </Div>
  );
};


