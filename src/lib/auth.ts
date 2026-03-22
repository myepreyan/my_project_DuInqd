/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/lib/db"
import { LOGIN_OTP_PREFIX } from "@/lib/login-otp"
import { z } from "zod"

const CredentialsProvider = require("next-auth/providers/credentials").default
const GoogleProvider = require("next-auth/providers/google").default
const FacebookProvider = require("next-auth/providers/facebook").default

const otpLoginSchema = z.object({
  email: z.string().email(),
  otp: z.string().min(6).max(6),
})

export const authOptions = {
  adapter: PrismaAdapter(db) as any,
  
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  
  pages: {
    signIn: '/login',
    error: '/auth/error',
  },
  
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        otp: { label: "OTP", type: "text" },
      },

      async authorize(credentials: any) {
        const validated = otpLoginSchema.safeParse(credentials)
        if (!validated.success) {
          throw new Error("Invalid input")
        }

        const { email, otp } = validated.data
        const emailLower = email.toLowerCase()
        const identifier = `${LOGIN_OTP_PREFIX}${emailLower}`

        const verificationToken = await db.verificationToken.findFirst({
          where: {
            identifier,
            token: otp,
          },
        })

        if (!verificationToken) {
          throw new Error("Սխալ կամ ժամկետանց կոդ")
        }

        if (verificationToken.expires < new Date()) {
          await db.verificationToken.delete({
            where: {
              identifier_token: {
                identifier,
                token: otp,
              },
            },
          }).catch(() => {})
          throw new Error("Կոդի ժամկետը լրացել է: Խնդրում ենք նորից ուղարկել")
        }

        const user = await db.user.findUnique({
          where: { email: emailLower },
          select: {
            id: true,
            email: true,
            name: true,
            isActive: true,
            role: true,
            image: true,
            password: true,
          },
        })

        if (!user) {
          throw new Error("Սխալ email կամ կոդ")
        }

        if (!user.isActive) {
          throw new Error("Խնդրում ենք հաստատել ձեր email հասցեն")
        }

        if (!user.password) {
          throw new Error("Օգտագործեք social login")
        }

        await db.verificationToken.delete({
          where: {
            identifier_token: {
              identifier,
              token: otp,
            },
          },
        })

        await db.user.update({
          where: { id: user.id },
          data: { lastLoginAt: new Date() },
        })

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          image: user.image,
        }
      },
    }),
    
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || "",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
    }),
  ],
  
  callbacks: {
    async signIn({ user, account }: any) {
      if (!user.email) return false
      
      if (account?.provider !== "credentials") {
        await db.user.update({
          where: { email: user.email },
          data: {
            emailVerified: new Date(),
            isActive: true
          }
        }).catch(() => {})
      }
      
      return true
    },
    
    async jwt({ token, user, account, profile }: any) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      
      if (account && profile) {
        if (account.provider === "google") {
          token.picture = (profile as Record<string, string>).picture
        } else if (account.provider === "facebook") {
          const fbProfile = profile as { picture?: { data?: { url?: string } } }
          token.picture = fbProfile.picture?.data?.url
        }
      }
      
      return token
    },
    
    async session({ session, token }: any) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
        session.user.image = token.picture as string
      }
      return session
    },
    
    async redirect({ url, baseUrl }: any) {
      if (url.startsWith("/")) return `${baseUrl}${url}`
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    }
  },
  
  secret: process.env.NEXTAUTH_SECRET,
  
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production'
      }
    }
  },
  
  debug: process.env.NODE_ENV === 'development',
}
