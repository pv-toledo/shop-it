import { getServerAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { toSlug } from "@/lib/slugify";
import { getOrderConfig } from "@/lib/utils";

export async function POST(req: Request) {
  try {
    const session = await getServerAuthSession();
    if (!session) {
      return new Response(
        JSON.stringify({ message: "Usuário não autenticado" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const { category } = await req.json();

    const newCategory = await prisma.category.create({
      data: {
        name: category,
        slug: toSlug(category),
        userId: session.user.id,
      },
    });

    return new Response(JSON.stringify(newCategory), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Erro no backend:", error);
    return new Response(
      JSON.stringify({ message: error.message || "Erro ao criar categoria" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerAuthSession();
    if (!session) {
      return new Response(
        JSON.stringify({ message: "Usuário não autenticado" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const categories = await prisma.category.findMany({
      where: { userId: session.user.id },
      orderBy: { name: "asc" },
    });

    return new Response(JSON.stringify(categories), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Erro no backend:", error);
    return new Response(
      JSON.stringify({ message: error.message || "Erro ao buscar categorias" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function getUserCategories(order?: string) {
  const session = await getServerAuthSession();
  if (!session) return null;

  const { column, config } = getOrderConfig(order);

  return prisma.category.findMany({
    where: { userId: session.user.id },
    include: {
      products: true,
    },
    orderBy: { [column]: config },
  });
}
