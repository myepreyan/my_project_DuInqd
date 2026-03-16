# Ինչպես ավելացնել նոր ենթակատեգորիայի հատուկ հարցեր

## Քայլեր

### 1. Բացել `src/data/subcategory-forms.ts`

### 2. Ավելացնել նոր կոնֆիգուրացիա

```typescript
{
  subcategoryId: 'your-subcategory-id', // Պետք է համընկնի categories.ts-ի հետ
  specificFields: [
    {
      id: 'field-name',
      label: 'Հայերեն պիտակ',
      type: 'select', // կամ text, number, radio, multiselect, checkbox, date
      required: true,
      options: [ // միայն select, radio, multiselect-ի համար
        { value: 'value1', label: 'Տարբերակ 1' },
        { value: 'value2', label: 'Տարբերակ 2' },
      ],
      placeholder: 'Placeholder տեքստ', // optional
      helpText: 'Օգնության տեքստ', // optional
      min: 0, // number-ի համար
      max: 100, // number-ի համար
    },
  ],
}
```

## Field Types

### Text Input
```typescript
{
  id: 'brand',
  label: 'Արտադրող',
  type: 'text',
  required: false,
  placeholder: 'Օրինակ՝ Samsung',
}
```

### Number Input
```typescript
{
  id: 'area',
  label: 'Մակերես (քմ)',
  type: 'number',
  required: true,
  min: 10,
  max: 500,
}
```

### Select Dropdown
```typescript
{
  id: 'urgency',
  label: 'Հրատապություն',
  type: 'select',
  required: true,
  options: [
    { value: 'urgent', label: 'Շտապ' },
    { value: 'normal', label: 'Սովորական' },
  ],
}
```

### Radio Buttons
```typescript
{
  id: 'materials',
  label: 'Նյութերը ներառված են',
  type: 'radio',
  required: true,
  options: [
    { value: 'yes', label: 'Այո' },
    { value: 'no', label: 'Ոչ' },
  ],
}
```

### Multiselect Checkboxes
```typescript
{
  id: 'services',
  label: 'Ծառայություններ',
  type: 'multiselect',
  required: true,
  options: [
    { value: 'cleaning', label: 'Մաքրություն' },
    { value: 'repair', label: 'Վերանորոգում' },
  ],
}
```

### Single Checkbox
```typescript
{
  id: 'warranty',
  label: 'Երաշխիք պահանջվում է',
  type: 'checkbox',
  required: false,
}
```

### Date Picker
```typescript
{
  id: 'event-date',
  label: 'Միջոցառման ամսաթիվ',
  type: 'date',
  required: true,
}
```

## Օրինակ՝ լրիվ կոնֆիգուրացիա

```typescript
{
  subcategoryId: 'office-moving',
  specificFields: [
    {
      id: 'office-size',
      label: 'Գրասենյակի չափը (աշխատատեղեր)',
      type: 'number',
      required: true,
      min: 1,
      max: 200,
      placeholder: 'Օրինակ՝ 10',
    },
    {
      id: 'equipment',
      label: 'Տեղափոխվող սարքավորումներ',
      type: 'multiselect',
      required: true,
      options: [
        { value: 'furniture', label: 'Կահույք' },
        { value: 'computers', label: 'Համակարգիչներ' },
        { value: 'servers', label: 'Սերվերներ' },
        { value: 'archive', label: 'Արխիվ' },
      ],
    },
    {
      id: 'packing',
      label: 'Փաթեթավորում անհրաժեշտ է',
      type: 'radio',
      required: true,
      options: [
        { value: 'yes', label: 'Այո' },
        { value: 'no', label: 'Ոչ' },
      ],
    },
  ],
}
```

## Best Practices

1. **Հարցերի քանակ**: 3-6 հատուկ հարց (ոչ ավելի)
2. **Պարտադիր դաշտեր**: Մինիմալ (2-3 հատ)
3. **Օգտակար տեքստ**: Ավելացրեք helpText բարդ հարցերի համար
4. **Լոգիկական հաջորդականություն**: Սկզբում ընդհանուր, հետո մանրամասն
5. **Placeholder-ներ**: Օգտագործեք օրինակներ

## Ստուգում

Ավելացնելուց հետո՝
1. Գնացեք `/all-services`
2. Ընտրեք ձեր ենթակատեգորիան
3. Ստուգեք, որ հարցերը ցուցադրվում են Քայլ 2-ում
4. Ստուգեք validation-ը
5. Ստուգեք, որ պատասխանները երևում են Քայլ 7-ում
