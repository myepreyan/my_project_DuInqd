"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const registerSchema = z.object({
  name: z.string().min(2, "Անունը պետք է լինի նվազագույնը 2 տառ"),
  email: z.string().email("Սխալ email ֆորմատ"),
  password: z.string()
    .min(8, "Password-ը պետք է լինի նվազագույնը 8 տառ")
    .regex(/[A-ZԱ-Ֆ]/, "Պետք է պարունակի մեծատառ (A-Z կամ Ա-Ֆ)")
    .regex(/[a-zա-ֆ]/, "Պետք է պարունակի փոքրատառ (a-z կամ ա-ֆ)")
    .regex(/[0-9]/, "Պետք է պարունակի թիվ"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password-ները չեն համապատասխանում",
  path: ["confirmPassword"]
})

type RegisterFormData = z.infer<typeof registerSchema>

export default function RegisterForm() {
  const router = useRouter()
  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema)
  })
  
  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true)
    setError("")
    
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      
      const result = await response.json()
      
      if (!response.ok) {
        setError(result.error)
        return
      }
      
      setSuccess(true)
      // Store email for verification page
      localStorage.setItem('verificationEmail', data.email)
      setTimeout(() => router.push('/auth/verify-code'), 2000)
      
    } catch (error) {
      setError("Սերվերի սխալ: Խնդրում ենք փորձել ավելի ուշ")
    } finally {
      setIsLoading(false)
    }
  }
  
  if (success) {
    return (
      <div className="text-center">
        <div className="p-2.5 md:p-3 bg-green-500/20 border border-green-400/50 rounded-2xl">
          <h3 className="text-sm md:text-base font-semibold text-white mb-1 md:mb-1.5">
            Գրանցումը հաջողվեց!
          </h3>
          <p className="text-white/90 text-xs">
            Ստուգեք ձեր էլ․ փոստը և մուտքագրեք 6-նիշ կոդը
          </p>
        </div>
      </div>
    )
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 md:space-y-4">
      {error && (
        <div className="p-3 bg-red-500/20 border border-red-400/50 rounded-lg text-white text-sm text-center">
          {error}
        </div>
      )}
      
      <div>
        <label className="block text-white text-xs md:text-sm font-normal mb-1 pl-1">Անուն</label>
        <input
          {...register("name")}
          type="text"
          autoComplete="name"
          className="w-full px-2 py-1.5 md:py-2 bg-transparent border-0 border-b-2 border-white/60 text-white text-xs md:text-sm placeholder-white/50 focus:outline-none focus:border-white transition-colors"
          placeholder=""
          disabled={isLoading}
        />
        {errors.name && (
          <p className="text-red-300 text-xs mt-0.5 pl-1">{errors.name.message}</p>
        )}
      </div>
      
      <div>
        <label className="block text-white text-xs md:text-sm font-normal mb-1 pl-1">Էլ․ փոստ</label>
        <input
          {...register("email")}
          type="email"
          autoComplete="email"
          className="w-full px-2 py-1.5 md:py-2 bg-transparent border-0 border-b-2 border-white/60 text-white text-xs md:text-sm placeholder-white/50 focus:outline-none focus:border-white transition-colors"
          placeholder=""
          disabled={isLoading}
        />
        {errors.email && (
          <p className="text-red-300 text-xs mt-0.5 pl-1">{errors.email.message}</p>
        )}
      </div>
      
      <div>
        <label className="block text-white text-xs md:text-sm font-normal mb-1 pl-1">Գաղտնաբառ</label>
        <input
          {...register("password")}
          type="password"
          autoComplete="new-password"
          className="w-full px-2 py-1.5 md:py-2 bg-transparent border-0 border-b-2 border-white/60 text-white text-xs md:text-sm placeholder-white/50 focus:outline-none focus:border-white transition-colors"
          placeholder=""
          disabled={isLoading}
        />
        {errors.password && (
          <div className="space-y-1 mt-0.5">
            <p className="text-red-300 text-xs pl-1">{errors.password.message}</p>
          </div>
        )}
        {!errors.password && (
          <p className="text-white/50 text-xs mt-0.5 pl-1">
            Նվազագույնը 8 տառ, մեծատառ (A-Z կամ Ա-Ֆ), փոքրատառ և թիվ
          </p>
        )}
      </div>
      
      <div>
        <label className="block text-white text-xs md:text-sm font-normal mb-1 pl-1">Հաստատել գաղտնաբառը</label>
        <input
          {...register("confirmPassword")}
          type="password"
          autoComplete="new-password"
          className="w-full px-2 py-1.5 md:py-2 bg-transparent border-0 border-b-2 border-white/60 text-white text-xs md:text-sm placeholder-white/50 focus:outline-none focus:border-white transition-colors"
          placeholder=""
          disabled={isLoading}
        />
        {errors.confirmPassword && (
          <p className="text-red-300 text-xs mt-0.5 pl-1">{errors.confirmPassword.message}</p>
        )}
      </div>
      
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-2 md:py-2.5 bg-white text-purple-900 rounded-full text-xs md:text-sm font-semibold hover:bg-white/90 disabled:opacity-50 transition-all shadow-lg mt-2 md:mt-3"
      >
        {isLoading ? "Բեռնվում է..." : "Գրանցվել"}
      </button>
    </form>
  )
}
