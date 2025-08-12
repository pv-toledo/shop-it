import { Prisma } from "@/generated/prisma";

export type ProductWithCategory = Prisma.ProductGetPayload<{
    include: {
        category: true
    }
}>