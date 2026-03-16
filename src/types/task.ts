export interface Task {
  id: string;
  title: string;
  description: string;
  price: number;
  categoryId: string;
  subcategoryId: string;
  tag: string;
  date: string;
  location?: string;
}
