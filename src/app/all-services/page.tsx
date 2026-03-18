import AllServicesContent from "@/components/AllServicesContent";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Բոլոր ծառայությունները | Ընտրեք կատեգորիան",
  description: "Մենք պատրաստ ենք օգնել ձեզ տարբեր առաջադրանքների լուծման համար",
};

export default function AllServicesPage() {
  return (
    <Suspense 
      fallback={
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex items-center justify-center">
          <div className="text-gray-600 dark:text-zinc-400">Բեռնվում է...</div>
        </div>
      }
    >
      <AllServicesContent />
    </Suspense>
  );
}
