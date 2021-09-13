import { Dispatch, SetStateAction } from 'react';

export interface RadioButtonProps {
  name: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  options: {
    label: string;
    value: string;
  }[];
  label?: string;
  sublabel?: string;
}
