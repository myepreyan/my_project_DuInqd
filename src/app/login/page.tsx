import LoginForm from "@/components/auth/LoginForm"
import SocialLoginButtons from "@/components/auth/SocialLoginButtons"
import Link from "next/link"
import { Suspense } from "react"
import Image from "next/image"

export default function LoginPage() {
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
        <div className="backdrop-blur-md bg-white/15 border-2 border-white/30 rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-2xl">
          <div className="text-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-white">Մուտք</h1>
            <p className="text-white/80 text-xs md:text-sm mt-2">Մուտք գործեք ձեր հաշիվ</p>
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
          
          <Suspense fallback={<div className="text-white text-center">Loading...</div>}>
            <LoginForm />
          </Suspense>
          
          <p className="text-center text-white text-xs md:text-sm mt-4">
            Դեռ հաշիվ չունե՞ք{" "}
            <Link href="/register" className="font-semibold underline hover:no-underline">
              Գրանցվել
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
