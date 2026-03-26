import RegisterForm from "@/components/auth/RegisterForm"
import SocialLoginButtons from "@/components/auth/SocialLoginButtons"
import Link from "next/link"
import Image from "next/image"

export default function RegisterPage() {
  return (
    <div className="min-h-[75vh] md:min-h-screen flex items-center justify-center px-4 py-6 md:py-12 relative overflow-hidden">
      {/* Background Image */}
      <Image
        src="/hero2.png"
        alt="Background"
        fill
        className="object-cover"
        priority
      />
      
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      {/* Form Container */}
      <div className="relative z-10 w-[90%] sm:max-w-md">
        <div className="backdrop-blur-md bg-black/60 border border-white/20 rounded-2xl md:rounded-3xl p-3 md:p-5 shadow-2xl space-y-4">
          <div className="text-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-white">Գրանցվել</h1>
            <p className="text-white/80 text-xs md:text-sm mt-2">Ստեղծեք ձեր հաշիվը</p>
          </div>
          
          <SocialLoginButtons />
          
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/30"></div>
            </div>
            <div className="relative flex justify-center text-xs md:text-sm">
              <span className="px-3 backdrop-blur-sm bg-white/10 text-white/80 rounded-full">Կամ</span>
            </div>
          </div>
          
          <RegisterForm />
          
          <p className="text-center text-white text-xs md:text-sm mt-4">
            Արդեն ունե՞ք հաշիվ{" "}
            <Link href="/login" className="font-semibold underline hover:no-underline">
              Մուտք գործել
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
