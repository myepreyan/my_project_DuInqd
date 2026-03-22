"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"

export default function VerifyCodePage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [code, setCode] = useState(["", "", "", "", "", ""])
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const savedEmail = localStorage.getItem('verificationEmail')
    if (savedEmail) {
      setEmail(savedEmail)
    } else {
      router.push('/register')
    }
  }, [router])

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return
    
    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`)
      nextInput?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`)
      prevInput?.focus()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const verificationCode = code.join('')
    
    if (verificationCode.length !== 6) {
      setError('Խնդրում ենք մուտքագրել 6-նիշ կոդը')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/auth/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code: verificationCode })
      })

      const result = await response.json()

      if (!response.ok) {
        setError(result.error)
        return
      }

      localStorage.removeItem('verificationEmail')
      router.push('/login?verified=true')

    } catch (error) {
      setError('Սերվերի սխալ: Խնդրում ենք փորձել ավելի ուշ')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <Image
        src="/hero2.png"
        alt="Background"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div className="relative z-10 max-w-md w-full">
        <div className="backdrop-blur-md bg-white/15 border-2 border-white/30 rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-2xl">
          <div className="text-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Հաստատման կոդ
            </h1>
            <p className="text-white/80 text-sm">
              Մուտքագրեք {email}-ին ուղարկված 6-նիշ կոդը
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 bg-red-500/20 border border-red-400/50 rounded-lg text-white text-sm text-center">
                {error}
              </div>
            )}

            <div className="flex justify-center gap-2 md:gap-3">
              {code.map((digit, index) => (
                <input
                  key={index}
                  id={`code-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleCodeChange(index, e.target.value.replace(/\D/g, ''))}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-14 md:w-14 md:h-16 text-center text-2xl md:text-3xl font-bold bg-white/20 backdrop-blur-sm border-2 border-white/40 rounded-lg text-white focus:outline-none focus:border-white focus:bg-white/30 transition-all"
                  disabled={isLoading}
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={isLoading || code.some(d => !d)}
              className="w-full py-3 bg-white text-purple-900 rounded-full font-semibold hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
            >
              {isLoading ? "Ստուգվում է..." : "Հաստատել"}
            </button>
          </form>

          <div className="mt-6 text-center space-y-2">
            <p className="text-white/60 text-xs">
              Չե՞ք ստացել կոդը
            </p>
            <button
              type="button"
              className="text-white text-sm font-semibold hover:underline"
              onClick={() => {/* TODO: Resend code */}}
            >
              Կրկին ուղարկել
            </button>
            <div className="pt-2">
              <Link 
                href="/register" 
                className="text-white/80 text-xs hover:text-white transition-colors"
              >
                ← Վերադառնալ գրանցման
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
