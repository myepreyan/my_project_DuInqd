"use client"

import { Suspense, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

function VerifyEmailContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (!token) {
      setStatus("error")
      setMessage("Հաստատման հղումը անվավեր է")
      return
    }

    const verifyEmail = async () => {
      try {
        const response = await fetch(`/api/auth/verify?token=${token}`)
        const data = await response.json()

        if (response.ok) {
          setStatus("success")
          setMessage(data.message || "Email-ը հաջողությամբ հաստատված է")
          setTimeout(() => router.push("/login"), 3000)
        } else {
          setStatus("error")
          setMessage(data.error || "Հաստատումը ձախողվեց")
        }
      } catch (error) {
        setStatus("error")
        setMessage("Սերվերի սխալ: Խնդրում ենք փորձել ավելի ուշ")
      }
    }

    verifyEmail()
  }, [token, router])

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
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-md w-full">
        <div className="backdrop-blur-md bg-white/15 border-2 border-white/30 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Email հաստատում
          </h1>
          
          {status === "loading" && (
            <div className="space-y-4">
              <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div>
              <p className="text-white text-lg">Հաստատվում է...</p>
            </div>
          )}
          
          {status === "success" && (
            <div className="space-y-4">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-white text-lg font-semibold">{message}</p>
              <p className="text-white/80 text-sm">Վերահղվում ենք login էջ...</p>
            </div>
          )}
          
          {status === "error" && (
            <div className="space-y-4">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <p className="text-white text-lg font-semibold">{message}</p>
              <Link 
                href="/login"
                className="inline-block mt-4 px-6 py-3 bg-white text-purple-900 rounded-full font-semibold hover:bg-white/90 transition-all"
              >
                Դեպի Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen relative flex items-center justify-center px-4 py-12 overflow-hidden">
          <Image
            src="/hero2.png"
            alt=""
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative z-10 max-w-md w-full">
            <div className="backdrop-blur-md bg-white/15 border-2 border-white/30 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl text-center">
              <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto" />
              <p className="text-white text-lg mt-4">Բեռնվում է...</p>
            </div>
          </div>
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  )
}
