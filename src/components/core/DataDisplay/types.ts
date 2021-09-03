export interface DataDisplayItemProps {
  label: string;
  value: string | number;
  labelBold?: boolean;
}

export interface DataDisplayProps {
  title?: string;
  items: DataDisplayItemProps[];
}
