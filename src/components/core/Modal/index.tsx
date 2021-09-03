import React, { FC } from 'react';
import { CloseButton } from '../Button';
import { ModalProps } from './types';

const Modal: FC<ModalProps> = ({ children, isOpen, setIsOpen }) => {
  return isOpen ? (
    <div
      className="fixed z-10 inset-0 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex min-h-screen text-center md:block md:px-2 lg:px-4">
        <div
          className="hidden fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity md:block"
          aria-hidden="true"
        />
        <span
          className="hidden md:inline-block md:align-middle md:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="flex text-base text-left transform transition w-full md:inline-block md:max-w-2xl md:align-middle lg:max-w-4xl">
          <CloseButton onClick={() => setIsOpen(false)} />

          {children}
        </div>
      </div>
    </div>
  ) : null;
};

export default Modal;
