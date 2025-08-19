import { getServerAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Title } from "./_components/title";
import { ProductInCategoryItem } from "./_components/product-in-category-item";
import { getOrderConfig } from "@/lib/utils";

type CategoryPageProps = {
  params: Promise<{
    categorySlug: string;
  }>;
  searchParams: Promise<{
    order?: string;
  }>;
};

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  
  const session = await getServerAuthSession();
  if (!session) {
    redirect("/login");
  }

  const { categorySlug } = await params;
  const { order } = await searchParams;

  const category = await prisma.category.findUnique({
    where: {
      slug: categorySlug,
    },
  });

  if (!category) {
    throw new Error("Categoria não encontrada");
  }

  const { column, config } = getOrderConfig(order);

  const products = await prisma.product.findMany({
    where: {
      categoryId: category.id,
    },
    
    orderBy: {
      [column]: config,
    },
  });

  return (
    <main className="w-full max-w-6xl mx-auto px-10 lg:px-0">
      <Title category={category} />
      <section className="flex flex-col gap-2.5 w-full mt-7.5 lg:gap-5 lg:mt-15">
        {products.map((product) => (
          <ProductInCategoryItem key={product.id} product={product} />
        ))}
      </section>
    </main>
  );
}
