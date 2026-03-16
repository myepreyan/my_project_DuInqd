import { Task } from "@/types/task";

export const mockTasks: Task[] = [
  {
    id: "1",
    title: "Հանդիսագրքի վերանորոգում",
    description: "Պահանջվում է հանդիսարին մաքրում և վերանորոգում։ Մոտավորապես 50 քմ տարածք։",
    price: 15000,
    categoryId: "renovation",
    subcategoryId: "general-renovation",
    tag: "Հանդիսագրի օգնություն",
    date: "6 Մարտ, 2026",
    location: "Երևան, Կենտրոն"
  },
  {
    id: "2",
    title: "Բնակարանի վարորոգում",
    description: "Պահանջվում է 2 սենյականոց բնակարանի վերանորոգում։ Ներկում, շաղախ գործ։",
    price: 12000,
    categoryId: "renovation",
    subcategoryId: "apartment-renovation",
    tag: "Հայտի ընդունոիս քրեմ և սարքերում",
    date: "8 Մարտ, 2026",
    location: "Երևան, Արաբկիր"
  },
  {
    id: "3",
    title: "Անհատական մարզիչ",
    description: "Փնտրում եմ անհատական մարզիչ։ 3 անգամ շաբաթը ծանր կոսքի հանգով։",
    price: 20000,
    categoryId: "beauty",
    subcategoryId: "fitness-training",
    tag: "Գերընտանևի և սառունավուն",
    date: "7 Մարտ, 2026",
    location: "Երևան, Աջափնյակ"
  },
  {
    id: "4",
    title: "Կաթի սունկում",
    description: "Մոտավոր է մասնավորլանք գամավորի կարժավորում և գարանտի ծառայություն։",
    price: 150000,
    categoryId: "events",
    subcategoryId: "wedding-planning",
    tag: "Շունքալիսեքեն",
    date: "7 Մարտ, 2026",
    location: "Երևան"
  },
  {
    id: "5",
    title: "Փաստաթղթերի առաքում",
    description: "Հարկավոր է փաստաթուղթերի առաքում Կենտրոն-Աջափնյակ ուղղությամբ։",
    price: 2000,
    categoryId: "courier",
    subcategoryId: "doc-delivery",
    tag: "Արագ առաքում",
    date: "6 Մարտ, 2026",
    location: "Երևան"
  },
  {
    id: "6",
    title: "Համակարգչի վերանորոգում",
    description: "Համակարգիչը դանդաղ է աշխատում, հարկավոր է ախտորոշում և վիրուսների հեռացում։",
    price: 8000,
    categoryId: "computer",
    subcategoryId: "virus-removal",
    tag: "Հեռավար աջակցություն",
    date: "9 Մարտ, 2026",
    location: "Երևան, Մալաթիա"
  },
  {
    id: "7",
    title: "Բնակարանի տեղափոխություն",
    description: "Պահանջվում է 3 սենյականոց բնակարանի տեղափոխություն։ Կահույք և տեխնիկա։",
    price: 35000,
    categoryId: "cargo",
    subcategoryId: "apartment-moving",
    tag: "Փաթեթավորում ներառված",
    date: "10 Մարտ, 2026",
    location: "Երևան"
  },
  {
    id: "8",
    title: "Խորը մաքրություն",
    description: "Հետվերանորոգային մաքրություն 80 քմ բնակարանի համար։",
    price: 18000,
    categoryId: "cleaning",
    subcategoryId: "post-renovation",
    tag: "Մասնագիտական սարքավորում",
    date: "8 Մարտ, 2026",
    location: "Երևան, Դավթաշեն"
  },
  {
    id: "9",
    title: "Վեբ կայքի ստեղծում",
    description: "Հարկավոր է կորպորատիվ կայքի մշակում React-ով և responsive դիզայնով։",
    price: 250000,
    categoryId: "programming",
    subcategoryId: "website-development",
    tag: "React & Next.js",
    date: "5 Մարտ, 2026",
    location: "Հեռավար"
  },
  {
    id: "10",
    title: "Հեռուստացույցի տեղադրում",
    description: "55 դյույմ հեռուստացույցի տեղադրում պատին և լարերի թաքցում։",
    price: 7000,
    categoryId: "tech-install",
    subcategoryId: "tv-installation",
    tag: "Բրակետ ներառված",
    date: "9 Մարտ, 2026",
    location: "Երևան, Նոր Նորք"
  },
  {
    id: "11",
    title: "Ծննդյան օրվա կազմակերպում",
    description: "10 տարեկանի համար ծննդյան օրվա կազմակերպում՝ անիմատորով և դեկորով։",
    price: 45000,
    categoryId: "events",
    subcategoryId: "birthday-party",
    tag: "Անիմատոր և մրցույթներ",
    date: "11 Մարտ, 2026",
    location: "Երևան"
  },
  {
    id: "12",
    title: "Լոգոյի դիզայն",
    description: "Հարկավոր է նոր startup-ի համար լոգոյի դիզայն և բրենդինգ։",
    price: 35000,
    categoryId: "design",
    subcategoryId: "logo-design",
    tag: "3 տարբերակ",
    date: "7 Մարտ, 2026",
    location: "Հեռավար"
  },
  {
    id: "13",
    title: "Հարսանեկան լուսանկարում",
    description: "Փնտրում եմ ֆոտոգրաֆ հարսանիքի համար՝ 8 ժամ, ալբոմ և ռետուշ։",
    price: 120000,
    categoryId: "photo-video",
    subcategoryId: "wedding-photo",
    tag: "Փորձառու մասնագետ",
    date: "6 Մարտ, 2026",
    location: "Երևան"
  },
  {
    id: "14",
    title: "Օդորակիչի տեղադրում",
    description: "2 հատ օդորակիչի տեղադրում և խողովակների ճիշտ տեղադրում։",
    price: 25000,
    categoryId: "tech-install",
    subcategoryId: "air-conditioner",
    tag: "Երաշխիք ներառված",
    date: "10 Մարտ, 2026",
    location: "Երևան, Կենտրոն"
  },
  {
    id: "15",
    title: "Անգլերենի ուսուցում",
    description: "Անգլերենի անհատական դասընթացներ intermediate մակարդակի համար։",
    price: 8000,
    categoryId: "tutoring",
    subcategoryId: "english-tutor",
    tag: "Առցանց հնարավորություն",
    date: "8 Մարտ, 2026",
    location: "Երևան / Հեռավար"
  },
  {
    id: "16",
    title: "Հեռախոսի էկրանի փոխարինում",
    description: "iPhone 13 Pro էկրանի փոխարինում որակյալ պահեստամասերով։",
    price: 35000,
    categoryId: "digital-repair",
    subcategoryId: "screen-replacement",
    tag: "Արագ սպասարկում",
    date: "9 Մարտ, 2026",
    location: "Երևան, Կենտրոն"
  },
  {
    id: "17",
    title: "Ավտոմեքենայի վերանորոգում",
    description: "Toyota Camry շարժիչի ախտորոշում և վերանորոգում։",
    price: 75000,
    categoryId: "auto-repair",
    subcategoryId: "engine-repair",
    tag: "Ապրանքանիշային պահեստամասեր",
    date: "11 Մարտ, 2026",
    location: "Երևան, Շենգավիթ"
  },
  {
    id: "18",
    title: "Տվյալների մուտքագրում",
    description: "Excel-ում տվյալների մուտքագրում՝ մոտ 500 տող, վիրտուալ օգնական։",
    price: 12000,
    categoryId: "virtual-assistant",
    subcategoryId: "data-entry",
    tag: "Ճշգրիտ աշխատանք",
    date: "7 Մարտ, 2026",
    location: "Հեռավար"
  },
  {
    id: "19",
    title: "Գորգերի մաքրություն",
    description: "3 հատ գորգերի քիմմաքրություն և առաքում տուն։",
    price: 15000,
    categoryId: "cleaning",
    subcategoryId: "carpet-cleaning",
    tag: "Տեղում մաքրություն",
    date: "10 Մարտ, 2026",
    location: "Երևան, Էրեբունի"
  },
  {
    id: "20",
    title: "Սառնարանի վերանորոգում",
    description: "Samsung սառնարանը չի սառցեցնում, հարկավոր է վերանորոգում։",
    price: 18000,
    categoryId: "tech-install",
    subcategoryId: "refrigerator",
    tag: "Արագ սպասարկում",
    date: "8 Մարտ, 2026",
    location: "Երևան, Քանաքեռ"
  }
];
