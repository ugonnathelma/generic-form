export interface IField {
  name: string;
  validate?: string;
  label?: string;
  type: string;
  required?: boolean;
}

export interface IFormProps {
  title?: string;
  fields: IField[];
  onSubmit: (values: { [key: string]: string }) => void;
  clearFieldsOnSubmit?: boolean;
}
