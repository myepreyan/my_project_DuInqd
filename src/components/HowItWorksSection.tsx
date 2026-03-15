import Image from "next/image";

export default function HowItWorksSection() {
  const steps = [
    {
      id: 1,
      title: "Նկարագրել",
      description:
        "Նկարագրեք ձեր աշխատանքը և պահանջները: Սա անվճար է և տևում է 3-4 րոպե",
      icon: "/icon1.svg",
    },
    {
      id: 2,
      title: "Ստանալ առաջարկներ",
      description:
        "Ստանում կատարողներից: Սովորաբար կատարողները պատասխանում են 30 րոպեի ընթացքում",
      icon: "/icon2.svg",
    },
    {
      id: 3,
      title: "Ընտրել",
      description:
        "Ընտրեք կատարողձև կատարողների և թվապնևների կարդարդեղներց",
      icon: "/icon3.svg",
    },
  ];

  return (
    <section className="w-full bg-gray-50 dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6 py-8 md:py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-black dark:text-white font-serif mb-8 md:mb-12">
          Ինչպես է աշխատում DuInqd?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div
              key={step.id}
              className="bg-[#e8f5e9] rounded-3xl px-6 pt-6 flex flex-col text-center overflow-hidden"
            >
              <h3 className="text-lg md:text-xl font-bold text-black mb-3">
                {step.title}
              </h3>
              <p className="text-sm md:text-base text-gray-700 mb-6">
                {step.description}
              </p>
              <div className={`mt-auto -mx-6 ${step.id === 3 ? 'pt-10' : 'pt-8'}`}>
                <Image
                  src={step.icon}
                  alt={step.title}
                  width={352}
                  height={196}
                  className="w-full h-auto"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
