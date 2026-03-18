import Link from "next/link";

export default function ServicesSection() {
  const services = [
    { id: "courier", icon: "🚀", name: "Կուրյերական ծառայություններ" },
    { id: "renovation", icon: "🔨", name: "Վերանորոգում և շինարարություն" },
    { id: "cargo", icon: "📦", name: "Բեռնափոխադրումներ" },
    { id: "cleaning", icon: "🧹", name: "Տնային տնտեսություն և մաքրություն" },
    { id: "computer", icon: "💻", name: "Համակարգչային օգնություն" },
    { id: "photo-video", icon: "📸", name: "Ֆոտո, վիդեո և աուդիո" },
    { id: "programming", icon: "💾", name: "Ծրագրավորում" },
    { id: "tech-install", icon: "⚙️", name: "Տեխնիկայի տեղադրում և վերանորոգում" },
    { id: "events", icon: "🎉", name: "Միջոցառումներ և առաջխաղացումներ" },
    { id: "design", icon: "🎨", name: "Դիզայն" },
    { id: "virtual-assistant", icon: "🤝", name: "Վիրտուալ օգնական" },
    { id: "digital-repair", icon: "🔧", name: "Թվային տեխնիկայի վերանորոգում" },
    { id: "beauty", icon: "💅", name: "Գեղեցկություն և առողջություն" },
    { id: "auto-repair", icon: "🚗", name: "Տրանսպորտի վերանորոգում" },
    { id: "tutoring", icon: "📚", name: "Կրկնուսույցներ և ուսուցում" },
  ];

  return (
    <section id="services" className="w-full bg-gray-50 dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6 py-8 md:py-16">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-black dark:text-white font-serif mb-8 md:mb-12">
          Ծառայություններ
        </h2>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 mb-12">
          {services.map((service) => (
            <Link key={service.id} href={`/all-services?category=${service.id}`}>
              <div className="flex flex-row items-center gap-2 md:gap-3 p-2.5 md:p-4 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg md:rounded-xl shadow-sm hover:shadow-md hover:scale-105 transition-all duration-200 cursor-pointer">
                <span className="text-xl md:text-2xl">{service.icon}</span>
                <span className="text-xs md:text-sm font-medium text-black dark:text-white font-sans">
                  {service.name}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <Link href="/all-services">
            <button className="px-8 py-4 bg-[#82d134] hover:bg-[#73bc2a] text-white font-semibold rounded-2xl shadow-sm active:scale-95 transition-all duration-200 font-sans">
              Բոլոր ծառայությունները
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
