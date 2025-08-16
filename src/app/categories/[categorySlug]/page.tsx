import { getServerAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

type CategoryPageProps = {
  params: Promise<{
    categorySlug: string;
  }>;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const session = await getServerAuthSession();
  if (!session) {
    redirect("/login");
  }

  const { categorySlug } = await params;

  const category = await prisma.category.findUnique({
    where: {
      slug: categorySlug,
    },
  });

  if (!category) {
    throw new Error("Categoria não encontrada");
  }

  const products = await prisma.product.findMany({
    where: {
      categoryId: category.id,
    },
  });

  return (
    <main className="w-full max-w-6xl mx-auto px-10 lg:px-0">
      
    </main>
  );
}
