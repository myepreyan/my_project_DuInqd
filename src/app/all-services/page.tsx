import AllServicesContent from "@/components/AllServicesContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Բոլոր ծառայությունները | Ընտրեք կատեգորիան",
  description: "Մենք պատրաստ ենք օգնել ձեզ տարբեր առաջադրանքների լուծման համար",
};

export default function AllServicesPage() {
  return <AllServicesContent />;
}
