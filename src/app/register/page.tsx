import RegisterForm from "@/components/auth/RegisterForm"
import SocialLoginButtons from "@/components/auth/SocialLoginButtons"
import Link from "next/link"
import Image from "next/image"

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background Image */}
      <Image
        src="/hero2.png"
        alt="Background"
        fill
        className="object-cover"
        priority
      />
      
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Form Container */}
      <div className="relative z-10 max-w-md w-full">
        <div className="backdrop-blur-md bg-white/15 border-2 border-white/30 rounded-2xl md:rounded-3xl p-3 md:p-5 shadow-2xl space-y-4">
          <div className="text-center">
            <h1 className="text-white text-xl md:text-2xl font-bold">Գրանցվել</h1>
            <p className="text-white/80 text-xs mt-1">Ստեղծեք ձեր հաշիվը</p>
          </div>
          
          <SocialLoginButtons />
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/30"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 backdrop-blur-md bg-white/10 text-white/80 rounded-full">Կամ</span>
            </div>
          </div>
          
          <RegisterForm />
          
          <p className="text-center text-white text-xs">
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
