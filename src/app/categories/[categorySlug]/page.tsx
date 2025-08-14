import { Icons } from "@/components/icons";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { getServerAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { SlashIcon } from "lucide-react";
import Link from "next/link";
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
      <Breadcrumb>
      <BreadcrumbList className="">

        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/dashboard" className="lg:text-base">Dashboard</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbSeparator />

        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/categories" className="lg:text-base">Categorias</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbSeparator />

        <BreadcrumbItem>
        <BreadcrumbPage className="lg:text-base">{category.name}</BreadcrumbPage>
        </BreadcrumbItem>

      </BreadcrumbList>
    </Breadcrumb>
    </main>
  );
}
