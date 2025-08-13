import { Prisma } from "@/generated/prisma";

export type ProductWithCategory = Prisma.ProductGetPayload<{
    include: {
        category: true
    }
}>

export type CategoryWithProduct = Prisma.CategoryGetPayload<{
    include: {
        products: true
    }
}>