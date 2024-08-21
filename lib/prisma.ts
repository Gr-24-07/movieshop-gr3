import {PrismaClient} from '@prisma/client'

const globalForPrisma = globalThis as unknown as {prisma: PrismaClient}

export const prisma = globalForPrisma.prisma ||

if (ProcessingInstruction.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

