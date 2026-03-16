import { subcategoryForms } from '@/data/subcategory-forms';

export function getSubcategoryConfig(subcategoryId: string) {
  return subcategoryForms.find(config => config.subcategoryId === subcategoryId);
}

export function hasSpecificFields(subcategoryId: string): boolean {
  const config = getSubcategoryConfig(subcategoryId);
  return config ? config.specificFields.length > 0 : false;
}
