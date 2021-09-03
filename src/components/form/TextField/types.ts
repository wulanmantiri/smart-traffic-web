import { ChangeEventHandler, Dispatch, FormEvent, SetStateAction } from 'react';

export interface TextFieldProps {
  name: string;
  value: string | number;
  onChange: ChangeEventHandler<HTMLInputElement>;
  // setValue: Dispatch<SetStateAction<string>>;
  placeholder?: string;
  label?: string;
}
