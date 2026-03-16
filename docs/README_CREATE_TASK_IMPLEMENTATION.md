# Առաջադրանքի ստեղծման ֆունկցիոնալություն

## Ընդհանուր տեսություն

7 քայլանոց wizard-ով առաջադրանքների ստեղծման համակարգ՝ դինամիկ հարցերով, validation-ով և auto-save-ով։

## Հիմնական հատկանիշներ

### ✅ Իրականացված

1. **7 քայլանոց ձևաթուղթ**
   - Քայլ 1: Հիմնական տեղեկություններ
   - Քայլ 2: Հատուկ հարցեր (դինամիկ)
   - Քայլ 3: Մանրամասն նկարագրություն
   - Քայլ 4: Գին և ժամկետ
   - Քայլ 5: Տեղակայություն
   - Քայլ 6: Նկարներ և կոնտակտ
   - Քայլ 7: Ստուգում և հրապարակում

2. **Դինամիկ հարցեր**
   - 15+ ենթակատեգորիաների համար հատուկ հարցեր
   - Ավտոմատ skip եթե հարցեր չկան
   - Flexible field types (text, number, select, radio, multiselect, checkbox, date)

3. **Validation**
   - Real-time validation React Hook Form + Zod-ով
   - Հայերեն error messages
   - Field-level և form-level validation

4. **Auto-save**
   - Zustand persist middleware
   - localStorage-ում պահպանում
   - 2 վրկ debounce
   - Վերականգնում reload-ից հետո

5. **UI/UX**
   - Progress indicator 7 քայլերի համար
   - "Հետ" և "Հաջորդը" կոճակներ
   - Responsive design (mobile-first)
   - Dark mode support
   - Image drag & drop upload

## Տեխնիկական Stack

```json
{
  "dependencies": {
    "react-hook-form": "Form management",
    "zod": "Schema validation",
    "@hookform/resolvers": "RHF + Zod integration",
    "zustand": "State management + persistence",
    "react-dropzone": "Image upload",
    "date-fns": "Date formatting"
  }
}
```

## Ֆայլերի կառուցվածք

```
src/
├── app/
│   └── create-task/
│       └── [subcategoryId]/
│           └── page.tsx              # Main route
│
├── components/create-task/
│   ├── Step1BasicInfo.tsx            # Քայլ 1
│   ├── Step2SpecificQuestions.tsx    # Քայլ 2 (դինամիկ)
│   ├── Step3Description.tsx          # Քայլ 3
│   ├── Step4PriceDeadline.tsx        # Քայլ 4
│   ├── Step5Location.tsx             # Քայլ 5
│   ├── Step6ImagesContact.tsx        # Քայլ 6
│   ├── Step7Review.tsx               # Քայլ 7
│   ├── StepIndicator.tsx             # Progress bar
│   ├── DynamicFormField.tsx          # Field renderer
│   ├── FormNavigation.tsx            # Հետ/Հաջորդը կոճակներ
│   └── ImageUploader.tsx             # Drag & drop upload
│
├── data/
│   └── subcategory-forms.ts          # 240+ կոնֆիգուրացիաներ
│
├── store/
│   └── useTaskFormStore.ts           # Zustand store
│
├── schemas/
│   └── task-form-schema.ts           # Zod schemas
│
├── types/
│   └── form.ts                       # TypeScript types
│
├── hooks/
│   └── useAutoSave.ts                # Auto-save hook
│
└── utils/
    ├── form-helpers.ts               # Helper functions
    └── debounce.ts                   # Debounce utility
```

## Ինչպես օգտագործել

### 1. Գնալ all-services էջ
```
http://localhost:3000/all-services
```

### 2. Ընտրել ենթակատեգորիա
Ընտրեք կատեգորիա և ենթակատեգորիա՝ ստեղծել առաջադրանք։

### 3. Լրացնել ձևաթուղթը
Անցնել 7 քայլերով՝ լրացնելով բոլոր պարտադիր դաշտերը։

### 4. Հրապարակել կամ պահպանել սևագիր
Վերջում կարող եք հրապարակել կամ պահպանել ավելի ուշ։

## Կարգավորում

### Ավելացնել նոր ենթակատեգորիայի հարցեր

Տե՛ս `docs/ADD_SUBCATEGORY_QUESTIONS.md`

### Փոփոխել քայլերի թիվը

Փոփոխել `useTaskFormStore.ts`-ում `goToNextStep` և `goToPreviousStep`-ը։

### Ավելացնել նոր field type

1. Ավելացնել `FieldType`-ում (`types/form.ts`)
2. Իրականացնել `DynamicFormField.tsx`-ում
3. Ավելացնել validation `task-form-schema.ts`-ում

## Testing

```bash
# Development server
npm run dev

# Build
npm run build

# Lint
npm run lint
```

## Հաջորդ քայլեր

- [ ] Ավելացնել մնացած 225 ենթակատեգորիաների հարցերը
- [ ] Ինտեգրել քարտեզ (Leaflet կամ Google Maps)
- [ ] Backend API կապ
- [ ] Image upload to CDN/S3
- [ ] Analytics tracking
- [ ] "Իմ սևագրերը" էջ
- [ ] Email notifications
- [ ] Push notifications

## Օգտակար հղումներ

- [React Hook Form Docs](https://react-hook-form.com/)
- [Zod Validation](https://zod.dev/)
- [Zustand Store](https://zustand-demo.pmnd.rs/)
- [React Dropzone](https://react-dropzone.js.org/)

---

**Status**: ✅ Իրականացված և աշխատող  
**Build**: ✅ Հաջող  
**Server**: 🟢 Running at http://localhost:3000
