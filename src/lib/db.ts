import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

/**
 * Neon often appends `channel_binding=require`. Prisma on Node (incl. Vercel) can fail with
 * PrismaClientInitializationError; dropping this param fixes connection without changing credentials.
 */
function getSanitizedDatabaseUrl(): string | undefined {
  const raw = process.env.DATABASE_URL?.trim()
  if (!raw) return undefined
  try {
    const u = new URL(raw)
    u.searchParams.delete('channel_binding')
    return u.toString()
  } catch {
    return raw
  }
}

const prismaOptions: ConstructorParameters<typeof PrismaClient>[0] = {
  log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
}
const sanitizedUrl = getSanitizedDatabaseUrl()
if (sanitizedUrl) {
  prismaOptions.datasources = { db: { url: sanitizedUrl } }
}

export const db =
  globalForPrisma.prisma ?? new PrismaClient(prismaOptions)

// Reuse one client in all environments (Vercel serverless + dev HMR) to avoid extra DB connections.
globalForPrisma.prisma = db
