export interface Task {
  id: string;
  title: string;
  description: string;
  price: number;
  priceType?: 'fixed' | 'negotiable';
  categoryId: string;
  subcategoryId: string;
  tag: string;
  date: string;
  location?: string;
  city?: string;
  address?: string;
  phone?: string;
  email?: string;
  images?: string[];
  deadline?: string;
  specificAnswers?: Record<string, any>;
}
