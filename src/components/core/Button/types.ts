import { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  styleType?: 'primary' | 'outline' | 'clear';
  onClick?: () => void;
}

export interface CloseButtonProps {
  onClick?: () => void;
}
