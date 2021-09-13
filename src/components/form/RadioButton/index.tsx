import React, { FC } from 'react';
import { RadioButtonProps } from './types';

const RadioButton: FC<RadioButtonProps> = ({
  label,
  sublabel,
  value,
  setValue,
  options,
  name,
}) => (
  <div className="flex flex-col gap-1.5">
    <div>
      <p className="text-sm font-medium text-gray-700">{label}</p>
      <p className="text-xs text-gray-400">{sublabel}</p>
    </div>
    <div className="space-y-1">
      {options.map((option, i) => (
        <div className="flex items-center gap-2" key={option.value}>
          <input
            id={`${name}${i}`}
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={() => setValue(option.value)}
            type="radio"
            className="focus:ring-primary h-4 w-4 text-primary border-gray-300"
          />
          <label htmlFor={`${name}${i}`} className="text-sm text-gray-800">
            {option.label}
          </label>
        </div>
      ))}
    </div>
  </div>
);

export default RadioButton;
