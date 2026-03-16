# Առաջադրանքի ստեղծման ձևաթուղթ

7 քայլանոց ինտերակտիվ ձևաթուղթ առաջադրանքների ստեղծման համար։

## Ինչպես օգտագործել

1. Գնացեք `/all-services` էջ
2. Ընտրեք կատեգորիա և ենթակատեգորիա
3. Լրացրեք 7 քայլերը՝
   - **Քայլ 1**: Հիմնական տեղեկություններ (վերնագիր, կատեգորիա)
   - **Քայլ 2**: Հատուկ հարցեր (դինամիկ՝ ըստ ենթակատեգորիայի)
   - **Քայլ 3**: Մանրամասն նկարագրություն
   - **Քայլ 4**: Գին և ժամկետ
   - **Քայլ 5**: Տեղակայություն
   - **Քայլ 6**: Նկարներ և կոնտակտ
   - **Քայլ 7**: Ստուգում և հրապարակում

## Հիմնական հատկանիշներ

- ✅ Դինամիկ հարցեր 240+ ենթակատեգորիաների համար
- ✅ Real-time validation
- ✅ Auto-save localStorage-ում
- ✅ Progress indicator
- ✅ Responsive design
- ✅ Dark mode support
- ✅ Image upload (մինչև 5 նկար)

## Տեխնոլոգիաներ

- React Hook Form - ձևաթուղթի կառավարում
- Zod - validation
- Zustand - state management + localStorage persistence
- React Dropzone - նկարների upload
- Tailwind CSS - styling

## Ֆայլերի կառուցվածք

```
src/
├── app/create-task/[subcategoryId]/page.tsx
├── components/create-task/
│   ├── Step1BasicInfo.tsx
│   ├── Step2SpecificQuestions.tsx
│   ├── Step3Description.tsx
│   ├── Step4PriceDeadline.tsx
│   ├── Step5Location.tsx
│   ├── Step6ImagesContact.tsx
│   ├── Step7Review.tsx
│   ├── StepIndicator.tsx
│   ├── DynamicFormField.tsx
│   ├── FormNavigation.tsx
│   └── ImageUploader.tsx
├── data/subcategory-forms.ts
├── store/useTaskFormStore.ts
├── schemas/task-form-schema.ts
├── types/form.ts
├── hooks/useAutoSave.ts
└── utils/form-helpers.ts
```

## Հաջորդ քայլեր

1. Ավելացնել մնացած ենթակատեգորիաների հարցերը `subcategory-forms.ts`-ում
2. Ավելացնել քարտեզի ինտեգրացիա (Leaflet կամ Google Maps)
3. Backend API ինտեգրացիա
4. Image optimization և CDN upload
5. Analytics tracking
