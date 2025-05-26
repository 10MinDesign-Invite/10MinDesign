import { PrismaClient } from "../generated/client";
var globalForPrisma = global;
export var prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production")
    globalForPrisma.prisma = prisma;
export * from "../generated/client";
