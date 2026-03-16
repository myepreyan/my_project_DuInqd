export type FieldType = 
  | 'text' 
  | 'textarea' 
  | 'number' 
  | 'select' 
  | 'multiselect'
  | 'radio'
  | 'checkbox'
  | 'date'
  | 'file'
  | 'slider';

export interface FormField {
  id: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  required: boolean;
  options?: { value: string; label: string }[];
  min?: number;
  max?: number;
  step?: number;
  helpText?: string;
}

export interface SubcategoryFormConfig {
  subcategoryId: string;
  specificFields: FormField[];
}

export interface TaskFormData {
  title: string;
  categoryId: string;
  subcategoryId: string;
  specificAnswers: Record<string, any>;
  description: string;
  priceType: 'fixed' | 'negotiable';
  price?: number;
  priceMin?: number;
  priceMax?: number;
  deadline: 'urgent' | 'normal' | 'flexible' | 'specific';
  specificDate?: string;
  city: string;
  address?: string;
  coordinates?: { lat: number; lng: number };
  images: File[];
  phone: string;
  email?: string;
  contactMethods: string[];
}
