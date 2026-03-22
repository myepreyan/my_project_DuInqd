"use client"

import { useState } from "react"
// @ts-ignore - NextAuth v4 compatibility with Next.js 16
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const loginSchema = z.object({
  email: z.string().email("Սխալ email ֆորմատ"),
  password: z.string().min(1, "Password պարտադիր է"),
  rememberMe: z.boolean().optional()
})

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginForm() {
  const router = useRouter()
  const [error, setError] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  })
  
  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    setError("")
    
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      })
      
      if (result?.error) {
        setError(result.error)
        return
      }
      
      router.push('/profile')
      router.refresh()
      
    } catch (error) {
      setError("Սերվերի սխալ: Խնդրում ենք փորձել ավելի ուշ")
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 md:space-y-4">
      <h1 className="text-2xl md:text-3xl font-bold text-white text-center mb-4 md:mb-6">Մուտք</h1>
      
      {error && (
        <div className="p-3 bg-red-500/20 border border-red-400/50 rounded-lg text-white text-sm text-center">
          {error}
        </div>
      )}
      
      <div>
        <label className="block text-white text-sm font-normal mb-1.5 pl-1">Էլ․ փոստ</label>
        <input
          {...register("email")}
          type="email"
          autoComplete="email"
          className="w-full px-2 py-2 md:py-3 bg-transparent border-0 border-b-2 border-white/60 text-white text-sm md:text-base placeholder-white/50 focus:outline-none focus:border-white transition-colors"
          placeholder=""
          disabled={isLoading}
        />
        {errors.email && (
          <p className="text-red-300 text-xs mt-1 pl-1">{errors.email.message}</p>
        )}
      </div>
      
      <div>
        <label className="block text-white text-sm font-normal mb-1.5 pl-1">Գաղտնաբառ</label>
        <input
          {...register("password")}
          type="password"
          autoComplete="current-password"
          className="w-full px-2 py-2 md:py-3 bg-transparent border-0 border-b-2 border-white/60 text-white text-sm md:text-base placeholder-white/50 focus:outline-none focus:border-white transition-colors"
          placeholder=""
          disabled={isLoading}
        />
        {errors.password && (
          <p className="text-red-300 text-xs mt-1 pl-1">{errors.password.message}</p>
        )}
      </div>
      
      <div className="flex items-center justify-between text-xs md:text-sm">
        <label className="flex items-center text-white cursor-pointer">
          <input
            {...register("rememberMe")}
            type="checkbox"
            className="w-3.5 h-3.5 md:w-4 md:h-4 mr-1.5 md:mr-2 accent-white"
          />
          <span>Հիշել ինձ</span>
        </label>
        <button
          type="button"
          className="text-white hover:underline"
        >
          Մոռացել եմ գաղտնաբառը
        </button>
      </div>
      
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-2.5 md:py-3 bg-white text-purple-900 rounded-full text-sm md:text-base font-semibold hover:bg-white/90 disabled:opacity-50 transition-all shadow-lg"
      >
        {isLoading ? "Բեռնվում է..." : "Մուտք գործել"}
      </button>
    </form>
  )
}
