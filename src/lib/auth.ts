/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/lib/db"
import bcrypt from "bcryptjs"
import { z } from "zod"

const CredentialsProvider = require("next-auth/providers/credentials").default
const GoogleProvider = require("next-auth/providers/google").default
const FacebookProvider = require("next-auth/providers/facebook").default

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
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
        password: { label: "Password", type: "password" }
      },
      
      async authorize(credentials: any) {
        const validated = loginSchema.safeParse(credentials)
        if (!validated.success) {
          throw new Error("Invalid input")
        }
        
        const { email, password } = validated.data
        
        const user = await db.user.findUnique({
          where: { email: email.toLowerCase() },
          select: {
            id: true,
            email: true,
            name: true,
            password: true,
            isActive: true,
            role: true,
            image: true,
          }
        })
        
        if (!user) {
          throw new Error("Սխալ email կամ password")
        }
        
        if (!user.isActive) {
          throw new Error("Խնդրում ենք հաստատել ձեր email հասցեն")
        }
        
        if (!user.password) {
          throw new Error("Օգտագործեք social login")
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
          throw new Error("Սխալ email կամ password")
        }
        
        await db.user.update({
          where: { id: user.id },
          data: { lastLoginAt: new Date() }
        })
        
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          image: user.image,
        }
      }
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
