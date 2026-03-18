import { categories } from '@/data/categories';

/**
 * Որոնում է ենթակատեգորիա անվան հիման վրա
 * Վերադարձնում է { categoryId, subcategoryId } կամ null
 */
export function findSubcategoryByName(searchQuery: string): { 
  categoryId: string; 
  subcategoryId: string; 
} | null {
  if (!searchQuery || searchQuery.trim() === '') {
    return null;
  }

  const query = searchQuery.toLowerCase().trim();

  for (const category of categories) {
    for (const subcategory of category.subcategories) {
      const subcategoryName = subcategory.name.toLowerCase();
      
      // Ճիշտ համընկնում
      if (subcategoryName === query) {
        return {
          categoryId: category.id,
          subcategoryId: subcategory.id,
        };
      }
    }
  }

  // Մասնակի համընկնում (եթե ենթակատեգորիայի անունը պարունակում է որոնման տեքստը)
  for (const category of categories) {
    for (const subcategory of category.subcategories) {
      const subcategoryName = subcategory.name.toLowerCase();
      
      if (subcategoryName.includes(query)) {
        return {
          categoryId: category.id,
          subcategoryId: subcategory.id,
        };
      }
    }
  }

  // Որոնում կատեգորիայի անվան մեջ
  for (const category of categories) {
    const categoryName = category.name.toLowerCase();
    
    if (categoryName.includes(query) && category.subcategories.length > 0) {
      // Վերադարձնել առաջին ենթակատեգորիան (բացի "Այլ"-ից)
      const firstSubcat = category.subcategories.find(sub => sub.name !== 'Այլ') 
        || category.subcategories[0];
      
      return {
        categoryId: category.id,
        subcategoryId: firstSubcat.id,
      };
    }
  }

  return null;
}
