import { SubcategoryFormConfig } from '@/types/form';

export const subcategoryForms: SubcategoryFormConfig[] = [
  // ԿՈՒՐՅԵՐԱԿԱՆ ԾԱՌԱՅՈՒԹՅՈՒՆՆԵՐ
  {
    subcategoryId: 'doc-delivery',
    specificFields: [
      {
        id: 'urgency',
        label: 'Հրատապության մակարդակ',
        type: 'select',
        required: true,
        options: [
          { value: 'urgent', label: 'Շտապ (1-2 ժամ)' },
          { value: 'same-day', label: 'Նույն օրը' },
          { value: 'normal', label: 'Սովորական (24 ժամ)' },
        ],
      },
      {
        id: 'package-size',
        label: 'Փաթեթի չափը',
        type: 'select',
        required: true,
        options: [
          { value: 'envelope', label: 'Ծրար (փաստաթղթեր)' },
          { value: 'small', label: 'Փոքր (մինչև 5 կգ)' },
          { value: 'medium', label: 'Միջին (5-10 կգ)' },
        ],
      },
    ],
  },
  {
    subcategoryId: 'food-delivery',
    specificFields: [
      {
        id: 'food-type',
        label: 'Սննդի տեսակ',
        type: 'select',
        required: true,
        options: [
          { value: 'hot', label: 'Տաք ուտեստ' },
          { value: 'cold', label: 'Սառը ուտեստ' },
          { value: 'frozen', label: 'Սառեցված' },
        ],
      },
      {
        id: 'distance',
        label: 'Հեռավորություն (կմ)',
        type: 'number',
        required: true,
        min: 0,
        max: 50,
      },
    ],
  },
  
  // ՎԵՐԱՆՈՐՈԳՈՒՄ ԵՎ ՇԻՆԱՐԱՐՈՒԹՅՈՒՆ
  {
    subcategoryId: 'apartment-renovation',
    specificFields: [
      {
        id: 'area',
        label: 'Մակերես (քմ)',
        type: 'number',
        required: true,
        min: 10,
        max: 500,
      },
      {
        id: 'renovation-type',
        label: 'Վերանորոգման տեսակ',
        type: 'select',
        required: true,
        options: [
          { value: 'cosmetic', label: 'Կոսմետիկ' },
          { value: 'capital', label: 'Կապիտալ' },
          { value: 'euro', label: 'Եվրովերանորոգում' },
        ],
      },
      {
        id: 'rooms',
        label: 'Սենյակների քանակ',
        type: 'select',
        required: true,
        options: [
          { value: '1', label: '1 սենյակ' },
          { value: '2', label: '2 սենյակ' },
          { value: '3', label: '3 սենյակ' },
          { value: '4+', label: '4+ սենյակ' },
        ],
      },
      {
        id: 'services-needed',
        label: 'Անհրաժեշտ ծառայություններ',
        type: 'multiselect',
        required: true,
        options: [
          { value: 'demolition', label: 'Քանդում' },
          { value: 'plumbing', label: 'Սանտեխնիկա' },
          { value: 'electrical', label: 'Էլեկտրիկա' },
          { value: 'plastering', label: 'Շաղախ' },
          { value: 'painting', label: 'Ներկ' },
          { value: 'flooring', label: 'Հատակ' },
          { value: 'ceiling', label: 'Առաստաղ' },
        ],
      },
      {
        id: 'materials-included',
        label: 'Նյութերը ներառված են',
        type: 'radio',
        required: true,
        options: [
          { value: 'yes', label: 'Այո, նյութերով' },
          { value: 'no', label: 'Ոչ, միայն աշխատանք' },
        ],
      },
    ],
  },
  {
    subcategoryId: 'bathroom-renovation',
    specificFields: [
      {
        id: 'area',
        label: 'Լոգարանի մակերես (քմ)',
        type: 'number',
        required: true,
        min: 2,
        max: 20,
      },
      {
        id: 'services',
        label: 'Ծառայություններ',
        type: 'multiselect',
        required: true,
        options: [
          { value: 'tiling', label: 'Սալիկի փակցում' },
          { value: 'plumbing', label: 'Սանտեխնիկա' },
          { value: 'waterproofing', label: 'Ջրամեկուսացում' },
          { value: 'fixtures', label: 'Սանտեխնիկական սարքեր' },
        ],
      },
    ],
  },
  
  // ԲԵՌՆԱՓՈԽԱԴՐՈՒՄՆԵՐ
  {
    subcategoryId: 'apartment-moving',
    specificFields: [
      {
        id: 'from-floor',
        label: 'Ելքի հարկ',
        type: 'select',
        required: true,
        options: [
          { value: '1', label: '1-ին հարկ' },
          { value: '2-5', label: '2-5 հարկ' },
          { value: '6-10', label: '6-10 հարկ' },
          { value: '10+', label: '10+ հարկ' },
        ],
      },
      {
        id: 'to-floor',
        label: 'Նպատակակետի հարկ',
        type: 'select',
        required: true,
        options: [
          { value: '1', label: '1-ին հարկ' },
          { value: '2-5', label: '2-5 հարկ' },
          { value: '6-10', label: '6-10 հարկ' },
          { value: '10+', label: '10+ հարկ' },
        ],
      },
      {
        id: 'elevator',
        label: 'Վերելակի առկայություն',
        type: 'radio',
        required: true,
        options: [
          { value: 'yes', label: 'Այո' },
          { value: 'no', label: 'Ոչ' },
          { value: 'both', label: 'Երկու կողմերում' },
        ],
      },
      {
        id: 'rooms',
        label: 'Սենյակների քանակ',
        type: 'select',
        required: true,
        options: [
          { value: '1', label: '1 սենյակ' },
          { value: '2', label: '2 սենյակ' },
          { value: '3', label: '3 սենյակ' },
          { value: '4+', label: '4+ սենյակ' },
        ],
      },
      {
        id: 'heavy-items',
        label: 'Ծանր իրեր (դաշնամուր, սեյֆ)',
        type: 'checkbox',
        required: false,
      },
      {
        id: 'packing-needed',
        label: 'Փաթեթավորման ծառայություն',
        type: 'checkbox',
        required: false,
      },
      {
        id: 'distance',
        label: 'Հեռավորություն (կմ)',
        type: 'number',
        required: true,
        min: 0,
        max: 1000,
      },
    ],
  },
  
  // ՄԱՔՐՈՒԹՅՈՒՆ
  {
    subcategoryId: 'general-cleaning',
    specificFields: [
      {
        id: 'property-type',
        label: 'Տարածքի տեսակ',
        type: 'select',
        required: true,
        options: [
          { value: 'apartment', label: 'Բնակարան' },
          { value: 'house', label: 'Տուն' },
          { value: 'office', label: 'Գրասենյակ' },
        ],
      },
      {
        id: 'area',
        label: 'Մակերես (քմ)',
        type: 'number',
        required: true,
        min: 10,
        max: 1000,
      },
      {
        id: 'frequency',
        label: 'Հաճախականություն',
        type: 'select',
        required: true,
        options: [
          { value: 'one-time', label: 'Միանգամյա' },
          { value: 'weekly', label: 'Շաբաթական' },
          { value: 'biweekly', label: 'Երկշաբաթյա' },
          { value: 'monthly', label: 'Ամսական' },
        ],
      },
      {
        id: 'equipment',
        label: 'Գործիքներ և քիմիկատներ',
        type: 'radio',
        required: true,
        options: [
          { value: 'bring', label: 'Կատարողը բերի' },
          { value: 'have', label: 'Մեզ մոտ կա' },
        ],
      },
    ],
  },
  {
    subcategoryId: 'post-renovation',
    specificFields: [
      {
        id: 'area',
        label: 'Մակերես (քմ)',
        type: 'number',
        required: true,
        min: 10,
        max: 500,
      },
      {
        id: 'renovation-scale',
        label: 'Վերանորոգման մակարդակ',
        type: 'select',
        required: true,
        options: [
          { value: 'minor', label: 'Մանր (ներկարարություն)' },
          { value: 'major', label: 'Մեծ (կապիտալ)' },
        ],
      },
    ],
  },
  
  // ՀԱՄԱԿԱՐԳՉԱՅԻՆ ՕԳՆՈՒԹՅՈՒՆ
  {
    subcategoryId: 'computer-repair',
    specificFields: [
      {
        id: 'device-type',
        label: 'Սարքի տեսակ',
        type: 'select',
        required: true,
        options: [
          { value: 'desktop', label: 'Սեղանի համակարգիչ' },
          { value: 'laptop', label: 'Նոութբուք' },
          { value: 'all-in-one', label: 'All-in-One' },
        ],
      },
      {
        id: 'brand',
        label: 'Արտադրող',
        type: 'text',
        required: false,
        placeholder: 'Օրինակ՝ HP, Dell, Asus',
      },
      {
        id: 'issue-type',
        label: 'Խնդրի տեսակ',
        type: 'multiselect',
        required: true,
        options: [
          { value: 'slow', label: 'Դանդաղ է աշխատում' },
          { value: 'no-boot', label: 'Չի միացնում' },
          { value: 'overheating', label: 'Գերատաքանում' },
          { value: 'noise', label: 'Աղմուկ է հանում' },
          { value: 'screen', label: 'Էկրանի խնդիր' },
          { value: 'other', label: 'Այլ' },
        ],
      },
      {
        id: 'urgency',
        label: 'Հրատապության մակարդակ',
        type: 'select',
        required: true,
        options: [
          { value: 'urgent', label: 'Շտապ (24 ժամ)' },
          { value: 'normal', label: 'Սովորական (2-3 օր)' },
          { value: 'flexible', label: 'Ճկուն' },
        ],
      },
    ],
  },
  {
    subcategoryId: 'virus-removal',
    specificFields: [
      {
        id: 'symptoms',
        label: 'Ախտանիշներ',
        type: 'multiselect',
        required: true,
        options: [
          { value: 'slow', label: 'Դանդաղ աշխատանք' },
          { value: 'popups', label: 'Pop-up պատուհաններ' },
          { value: 'crashes', label: 'Կանգեր' },
          { value: 'ads', label: 'Անցանկալի գովազդներ' },
        ],
      },
    ],
  },
  
  // ՖՈՏՈ, ՎԻԴԵՈ
  {
    subcategoryId: 'wedding-photo',
    specificFields: [
      {
        id: 'event-date',
        label: 'Միջոցառման ամսաթիվ',
        type: 'date',
        required: true,
      },
      {
        id: 'duration',
        label: 'Տևողություն (ժամ)',
        type: 'select',
        required: true,
        options: [
          { value: '3', label: '3 ժամ' },
          { value: '5', label: '5 ժամ' },
          { value: '8', label: '8 ժամ (ամբողջ օր)' },
          { value: '10+', label: '10+ ժամ' },
        ],
      },
      {
        id: 'guests-count',
        label: 'Հյուրերի քանակ (մոտավոր)',
        type: 'select',
        required: false,
        options: [
          { value: '50', label: 'Մինչև 50' },
          { value: '100', label: '50-100' },
          { value: '150', label: '100-150' },
          { value: '150+', label: '150+' },
        ],
      },
      {
        id: 'services',
        label: 'Անհրաժեշտ ծառայություններ',
        type: 'multiselect',
        required: true,
        options: [
          { value: 'photo', label: 'Լուսանկարում' },
          { value: 'video', label: 'Վիդեոնկարում' },
          { value: 'drone', label: 'Անօդաչու նկարահանում' },
          { value: 'photobooth', label: 'Ֆոտոթարթիչ' },
        ],
      },
      {
        id: 'album',
        label: 'Ալբոմի անհրաժեշտություն',
        type: 'radio',
        required: false,
        options: [
          { value: 'yes', label: 'Այո' },
          { value: 'no', label: 'Ոչ' },
        ],
      },
    ],
  },
  
  // ԾՐԱԳՐԱՎՈՐՈՒՄ
  {
    subcategoryId: 'website-development',
    specificFields: [
      {
        id: 'website-type',
        label: 'Կայքի տեսակ',
        type: 'select',
        required: true,
        options: [
          { value: 'landing', label: 'Landing page' },
          { value: 'corporate', label: 'Կորպորատիվ' },
          { value: 'ecommerce', label: 'Առևտրային' },
          { value: 'blog', label: 'Բլոգ' },
          { value: 'portfolio', label: 'Պորտֆոլիո' },
        ],
      },
      {
        id: 'pages-count',
        label: 'Էջերի քանակ',
        type: 'select',
        required: true,
        options: [
          { value: '1-5', label: '1-5 էջ' },
          { value: '6-10', label: '6-10 էջ' },
          { value: '11-20', label: '11-20 էջ' },
          { value: '20+', label: '20+ էջ' },
        ],
      },
      {
        id: 'features',
        label: 'Ֆունկցիոնալություն',
        type: 'multiselect',
        required: true,
        options: [
          { value: 'responsive', label: 'Responsive դիզայն' },
          { value: 'cms', label: 'CMS (կառավարման համակարգ)' },
          { value: 'multilingual', label: 'Բազմալեզու' },
          { value: 'seo', label: 'SEO օպտիմիզացիա' },
          { value: 'auth', label: 'Ավտորիզացիա' },
        ],
      },
    ],
  },
  
  // ՏԵԽՆԻԿԱՅԻ ՏԵՂԱԴՐՈՒՄ
  {
    subcategoryId: 'air-conditioner',
    specificFields: [
      {
        id: 'units-count',
        label: 'Օդորակիչների քանակ',
        type: 'number',
        required: true,
        min: 1,
        max: 10,
      },
      {
        id: 'installation-type',
        label: 'Տեղադրման տեսակ',
        type: 'select',
        required: true,
        options: [
          { value: 'standard', label: 'Ստանդարտ' },
          { value: 'complex', label: 'Բարդ (երկար խողովակներ)' },
        ],
      },
    ],
  },
  
  // ՄԻՋՈՑԱՌՈՒՄՆԵՐ
  {
    subcategoryId: 'birthday-party',
    specificFields: [
      {
        id: 'age',
        label: 'Տարիք',
        type: 'number',
        required: true,
        min: 1,
        max: 100,
      },
      {
        id: 'guests',
        label: 'Հյուրերի քանակ',
        type: 'number',
        required: true,
        min: 1,
        max: 200,
      },
      {
        id: 'services',
        label: 'Ծառայություններ',
        type: 'multiselect',
        required: true,
        options: [
          { value: 'animator', label: 'Անիմատոր' },
          { value: 'decoration', label: 'Դեկորացիա' },
          { value: 'catering', label: 'Քեյթերինգ' },
          { value: 'photo', label: 'Լուսանկարում' },
        ],
      },
    ],
  },
  
  // ԴԻԶԱՅՆ
  {
    subcategoryId: 'logo-design',
    specificFields: [
      {
        id: 'style',
        label: 'Ոճ',
        type: 'select',
        required: true,
        options: [
          { value: 'minimalist', label: 'Մինիմալիստական' },
          { value: 'modern', label: 'Ժամանակակից' },
          { value: 'classic', label: 'Դասական' },
          { value: 'playful', label: 'Խաղային' },
        ],
      },
      {
        id: 'variants',
        label: 'Տարբերակների քանակ',
        type: 'select',
        required: true,
        options: [
          { value: '1', label: '1 տարբերակ' },
          { value: '3', label: '3 տարբերակ' },
          { value: '5', label: '5 տարբերակ' },
        ],
      },
    ],
  },
  
  // ՎԻՐՏՈՒԱԼ ՕԳՆԱԿԱՆ
  {
    subcategoryId: 'data-entry',
    specificFields: [
      {
        id: 'volume',
        label: 'Տվյալների ծավալ',
        type: 'select',
        required: true,
        options: [
          { value: 'small', label: 'Փոքր (մինչև 100 տող)' },
          { value: 'medium', label: 'Միջին (100-500 տող)' },
          { value: 'large', label: 'Մեծ (500+ տող)' },
        ],
      },
    ],
  },
  
  // ԹՎԱՅԻՆ ՏԵԽՆԻԿԱՅԻ ՎԵՐԱՆՈՐՈԳՈՒՄ
  {
    subcategoryId: 'screen-replacement',
    specificFields: [
      {
        id: 'device',
        label: 'Սարք',
        type: 'text',
        required: true,
        placeholder: 'Օրինակ՝ iPhone 13 Pro',
      },
      {
        id: 'parts-quality',
        label: 'Պահեստամասերի որակ',
        type: 'select',
        required: true,
        options: [
          { value: 'original', label: 'Օրիգինալ' },
          { value: 'oem', label: 'OEM' },
          { value: 'aftermarket', label: 'Aftermarket' },
        ],
      },
    ],
  },
  
  // ԳԵՂԵՑԿՈՒԹՅՈՒՆ
  {
    subcategoryId: 'makeup',
    specificFields: [
      {
        id: 'occasion',
        label: 'Առիթ',
        type: 'select',
        required: true,
        options: [
          { value: 'wedding', label: 'Հարսանիք' },
          { value: 'evening', label: 'Երեկոյան' },
          { value: 'everyday', label: 'Ամենօրյա' },
          { value: 'photoshoot', label: 'Լուսանկարահանում' },
        ],
      },
    ],
  },
  
  // ՏՐԱՆՍՊՈՐՏԻ ՎԵՐԱՆՈՐՈԳՈՒՄ
  {
    subcategoryId: 'car-wash',
    specificFields: [
      {
        id: 'car-type',
        label: 'Ավտոմեքենայի տեսակ',
        type: 'select',
        required: true,
        options: [
          { value: 'sedan', label: 'Սեդան' },
          { value: 'suv', label: 'Քրոսովեր/SUV' },
          { value: 'minivan', label: 'Միկրոավտոբուս' },
          { value: 'truck', label: 'Բեռնատար' },
        ],
      },
      {
        id: 'services',
        label: 'Ծառայություններ',
        type: 'multiselect',
        required: true,
        options: [
          { value: 'exterior', label: 'Արտաքին լվացում' },
          { value: 'interior', label: 'Ներքին մաքրություն' },
          { value: 'engine', label: 'Շարժիչի լվացում' },
          { value: 'detailing', label: 'Քիմմաքրություն' },
          { value: 'wax', label: 'Մոմապատում' },
        ],
      },
    ],
  },
  
  // ԿՐԿՆՈՒՍՈՒՅՑՆԵՐ
  {
    subcategoryId: 'english-tutor',
    specificFields: [
      {
        id: 'level',
        label: 'Մակարդակ',
        type: 'select',
        required: true,
        options: [
          { value: 'beginner', label: 'Սկսնակ' },
          { value: 'elementary', label: 'Elementary' },
          { value: 'intermediate', label: 'Intermediate' },
          { value: 'advanced', label: 'Advanced' },
        ],
      },
      {
        id: 'format',
        label: 'Ձևաչափ',
        type: 'radio',
        required: true,
        options: [
          { value: 'online', label: 'Առցանց' },
          { value: 'offline', label: 'Անձամբ' },
        ],
      },
      {
        id: 'frequency',
        label: 'Հաճախականություն (շաբաթական)',
        type: 'select',
        required: true,
        options: [
          { value: '1', label: '1 անգամ' },
          { value: '2', label: '2 անգամ' },
          { value: '3', label: '3 անգամ' },
          { value: '4+', label: '4+ անգամ' },
        ],
      },
    ],
  },
];
