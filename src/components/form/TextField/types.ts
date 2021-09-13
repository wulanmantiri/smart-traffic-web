import { ChangeEventHandler } from 'react';

export interface TextFieldProps {
  name: string;
  value: string | number;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  label?: string;
}
