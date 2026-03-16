import { z } from 'zod';

export const step1Schema = z.object({
  title: z.string()
    .min(10, 'Վերնագիրը պետք է լինի առնվազն 10 նիշ')
    .max(100, 'Վերնագիրը չի կարող գերազանցել 100 նիշը'),
  categoryId: z.string().min(1, 'Ընտրեք կատեգորիա'),
  subcategoryId: z.string().min(1, 'Ընտրեք ենթակատեգորիա'),
});

export const step3Schema = z.object({
  description: z.string()
    .min(50, 'Նկարագրությունը պետք է լինի առնվազն 50 նիշ')
    .max(2000, 'Նկարագրությունը չի կարող գերազանցել 2000 նիշը'),
});

export const step4Schema = z.object({
  priceType: z.enum(['fixed', 'negotiable']),
  price: z.number().min(0, 'Գինը պետք է լինի դրական թիվ').optional(),
  priceMin: z.number().min(0).optional(),
  priceMax: z.number().min(0).optional(),
  deadline: z.enum(['urgent', 'normal', 'flexible', 'specific']),
  specificDate: z.string().optional(),
}).refine(
  (data) => {
    if (data.priceType === 'fixed') {
      return data.price !== undefined && data.price > 0;
    }
    return true;
  },
  {
    message: 'Ֆիքսված գնի դեպքում նշեք գումարը',
    path: ['price'],
  }
);

export const step5Schema = z.object({
  city: z.string().min(1, 'Ընտրեք քաղաք'),
  address: z.string().optional(),
  coordinates: z.object({
    lat: z.number(),
    lng: z.number(),
  }).optional(),
});

export const step6Schema = z.object({
  phone: z.string()
    .min(9, 'Հեռախոսահամարը չափից կարճ է')
    .regex(/^[\d\s\+\-\(\)]+$/, 'Անվավեր հեռախոսահամար'),
  email: z.string().email('Անվավեր էլ․ փոստ').optional().or(z.literal('')),
  contactMethods: z.array(z.string()).min(1, 'Ընտրեք առնվազն մեկ կապի եղանակ'),
  images: z.array(z.any()).max(5, 'Առավելագույնը 5 նկար').optional(),
});
