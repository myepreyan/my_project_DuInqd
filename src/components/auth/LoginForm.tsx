"use client"

import { useState } from "react"
// @ts-ignore - NextAuth v4 compatibility with Next.js 16
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const credentialsSchema = z.object({
  email: z.string().email("Սխալ email ֆորմատ"),
  password: z.string().min(1, "Գաղտնաբառը պարտադիր է"),
  rememberMe: z.boolean().optional(),
})

const otpSchema = z.object({
  otp: z
    .string()
    .length(6, "Մուտքագրեք 6 նիշ")
    .regex(/^\d{6}$/, "Թույլատրվում են միայն թվեր"),
})

type CredentialsFormData = z.infer<typeof credentialsSchema>
type OtpFormData = z.infer<typeof otpSchema>

export default function LoginForm() {
  const router = useRouter()
  const [step, setStep] = useState<"credentials" | "otp">("credentials")
  const [error, setError] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [pendingEmail, setPendingEmail] = useState("")
  const [pendingPassword, setPendingPassword] = useState("")

  const credentialsForm = useForm<CredentialsFormData>({
    resolver: zodResolver(credentialsSchema),
  })

  const otpForm = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  })

  const requestChallenge = async (email: string, password: string) => {
    const res = await fetch("/api/auth/login/challenge", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      throw new Error(
        typeof data.error === "string" ? data.error : "Չհաջողվեց ուղարկել կոդը"
      )
    }
  }

  const onCredentialsSubmit = async (data: CredentialsFormData) => {
    setIsLoading(true)
    setError("")
    try {
      await requestChallenge(data.email, data.password)
      setPendingEmail(data.email)
      setPendingPassword(data.password)
      setStep("otp")
      otpForm.reset({ otp: "" })
    } catch (e) {
      setError(e instanceof Error ? e.message : "Սերվերի սխալ")
    } finally {
      setIsLoading(false)
    }
  }

  const onResendCode = async () => {
    if (!pendingEmail || !pendingPassword) return
    setIsLoading(true)
    setError("")
    try {
      await requestChallenge(pendingEmail, pendingPassword)
    } catch (e) {
      setError(e instanceof Error ? e.message : "Սերվերի սխալ")
    } finally {
      setIsLoading(false)
    }
  }

  const onOtpSubmit = async (data: OtpFormData) => {
    setIsLoading(true)
    setError("")
    try {
      const result = await signIn("credentials", {
        // redirect: false,
        redirect: true, 
      callbackUrl: "/profile",
        email: pendingEmail,
        otp: data.otp,
      })

      if (result?.error) {
        setError(result.error)
        return
      }

      router.push("/profile")
      router.refresh()
      
    } catch {
      setError("Սերվերի սխալ: Խնդրում ենք փորձել ավելի ուշ")
    } finally {
      setIsLoading(false)
    }
  }

  const goBackToCredentials = () => {
    setStep("credentials")
    setError("")
    otpForm.reset({ otp: "" })
  }

  if (step === "otp") {
    return (
      <form
        onSubmit={otpForm.handleSubmit(onOtpSubmit)}
        className="space-y-3 md:space-y-4"
      >
        {error && (
          <div className="p-3 bg-red-500/20 border border-red-400/50 rounded-lg text-white text-sm text-center">
            {error}
          </div>
        )}

        <p className="text-white/90 text-sm text-center">
          Կոդը ուղարկվել է <span className="font-medium">{pendingEmail}</span>
        </p>

        <div>
          <label className="block text-white text-sm font-normal mb-1.5 pl-1">
            Մուտքի կոդ (6 նիշ)
          </label>
          <input
            {...otpForm.register("otp")}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            className="w-full px-2 py-2 md:py-3 bg-transparent border-0 border-b-2 border-white/60 text-white text-center text-2xl tracking-[0.4em] font-mono placeholder-white/50 focus:outline-none focus:border-white transition-colors"
            placeholder="••••••"
            disabled={isLoading}
          />
          {otpForm.formState.errors.otp && (
            <p className="text-red-300 text-xs mt-1 pl-1 text-center">
              {otpForm.formState.errors.otp.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center text-sm">
          <button
            type="button"
            onClick={goBackToCredentials}
            className="text-white/90 hover:underline text-left"
            disabled={isLoading}
          >
            ← Գաղտնաբառով վերադառնալ
          </button>
          <button
            type="button"
            onClick={onResendCode}
            className="text-white/90 hover:underline text-left sm:text-right"
            disabled={isLoading}
          >
            Նորից ուղարկել կոդը
          </button>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2.5 md:py-3 bg-white text-purple-900 rounded-full text-sm md:text-base font-semibold hover:bg-white/90 disabled:opacity-50 transition-all shadow-lg"
        >
          {isLoading ? "Բեռնվում է..." : "Հաստատել և մուտք գործել"}
        </button>
      </form>
    )
  }

  return (
    <form
      onSubmit={credentialsForm.handleSubmit(onCredentialsSubmit)}
      className="space-y-3 md:space-y-4"
    >
      {error && (
        <div className="p-3 bg-red-500/20 border border-red-400/50 rounded-lg text-white text-sm text-center">
          {error}
        </div>
      )}

      <div>
        <label className="block text-white text-sm font-normal mb-1.5 pl-1">
          Էլ․ փոստ
        </label>
        <input
          {...credentialsForm.register("email")}
          type="email"
          autoComplete="email"
          className="w-full px-2 py-2 md:py-3 bg-transparent border-0 border-b-2 border-white/60 text-white text-sm md:text-base placeholder-white/50 focus:outline-none focus:border-white transition-colors"
          placeholder=""
          disabled={isLoading}
        />
        {credentialsForm.formState.errors.email && (
          <p className="text-red-300 text-xs mt-1 pl-1">
            {credentialsForm.formState.errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-white text-sm font-normal mb-1.5 pl-1">
          Գաղտնաբառ
        </label>
        <input
          {...credentialsForm.register("password")}
          type="password"
          autoComplete="current-password"
          className="w-full px-2 py-2 md:py-3 bg-transparent border-0 border-b-2 border-white/60 text-white text-sm md:text-base placeholder-white/50 focus:outline-none focus:border-white transition-colors"
          placeholder=""
          disabled={isLoading}
        />
        {credentialsForm.formState.errors.password && (
          <p className="text-red-300 text-xs mt-1 pl-1">
            {credentialsForm.formState.errors.password.message}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between text-xs md:text-sm">
        <label className="flex items-center text-white cursor-pointer">
          <input
            {...credentialsForm.register("rememberMe")}
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
        {isLoading ? "Բեռնվում է..." : "Շարունակել"}
      </button>
    </form>
  )
}
