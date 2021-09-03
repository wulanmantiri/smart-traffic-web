import React, { FC } from 'react';
import { ButtonProps, CloseButtonProps } from './types';

const buttonStyles = {
  primary:
    'shadow-sm text-white bg-primary border-primary hover:bg-primary-700',
  outline: 'text-gray-500 border-gray-400 hover:bg-gray-100',
  clear:
    'text-gray-600 border-transparent hover:bg-gray-100 hover:text-gray-900',
};

const Button: FC<ButtonProps> = ({
  styleType = 'primary',
  children,
  onClick,
  ...props
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex justify-center py-1 px-5 border-2 border-solid text-sm font-medium rounded-sm cursor-pointer ${
      props.disabled
        ? 'border-gray-400 bg-gray-400 text-gray-200'
        : buttonStyles[styleType]
    }`}
    {...props}
  >
    {children}
  </button>
);

export default Button;

export const CloseButton: FC<CloseButtonProps> = ({ onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
  >
    <span className="sr-only">Close</span>
    <svg
      className="h-6 w-6"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  </button>
);
