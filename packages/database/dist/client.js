import { PrismaClient } from "../generated/client/index.js";
var globalForPrisma = global;
export var prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production")
    globalForPrisma.prisma = prisma;
// export * from "../generated/client/index.js";
