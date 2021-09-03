import React, { FC } from 'react';
import { CloseButton } from '../Button';
import { SidePanelProps } from './types';

const SidePanel: FC<SidePanelProps> = ({ isOpen, setIsOpen, children }) => {
  return isOpen ? (
    <div
      className="fixed z-10 inset-0 overflow-hidden"
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      <div className="fixed inset-y-0 right-0 flex">
        <div className="w-screen max-w-md bg-white shadow-lg">
          <CloseButton onClick={() => setIsOpen(false)} />
          {children}
        </div>
      </div>
    </div>
  ) : null;
};

export default SidePanel;
