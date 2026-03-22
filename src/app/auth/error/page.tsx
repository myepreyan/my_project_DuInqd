"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Suspense } from "react"

function AuthErrorContent() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  
  const errorMessages: Record<string, string> = {
    InvalidToken: "Անվավեր verification token",
    TokenExpired: "Verification token-ը ժամկետանց է",
    VerificationFailed: "Email-ի հաստատումը ձախողվեց",
    Default: "Authentication սխալ"
  }
  
  const message = errorMessages[error || 'Default'] || errorMessages.Default
  
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-6">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl">✕</span>
          </div>
          <h1 className="text-2xl font-bold mb-2">Սխալ</h1>
          <p className="text-gray-600">{message}</p>
        </div>
        
        <Link 
          href="/login"
          className="inline-block px-6 py-3 bg-black text-white rounded-lg hover:bg-black/90"
        >
          Վերադառնալ մուտքի էջ
        </Link>
      </div>
    </div>
  )
}

export default function AuthErrorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading...</div>
      </div>
    }>
      <AuthErrorContent />
    </Suspense>
  )
}
