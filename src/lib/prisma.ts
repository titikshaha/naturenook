import { PrismaClient } from "@prisma/client"
import { Pool } from "pg"
import { PrismaPg } from "@prisma/adapter-pg"

// Strip any sslmode param from the URL — we set SSL explicitly in the Pool config below
const rawUrl = process.env.DATABASE_URL ?? ""
const connectionString = rawUrl.replace(/[?&]sslmode=[^&]*/g, "").replace(/\?$/, "")

const isPostgres = connectionString.startsWith("postgresql://") || connectionString.startsWith("postgres://")

const pool = new Pool({
  connectionString,
  ssl: isPostgres ? { rejectUnauthorized: false } : undefined,
})
const adapter = new PrismaPg(pool)

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter })

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
