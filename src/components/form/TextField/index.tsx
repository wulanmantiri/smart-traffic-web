import React, { FC } from 'react';
import { TextFieldProps } from './types';

const TextField: FC<TextFieldProps> = ({
  label,
  value,
  onChange,
  placeholder,
  name,
}) => (
  <div className="flex flex-col gap-1">
    <label htmlFor={name} className="text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      type="text"
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full shadow-sm sm:text-sm border-gray-300 rounded-md placeholder-gray-400"
    />
  </div>
);

export default TextField;
