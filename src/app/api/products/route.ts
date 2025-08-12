import { getServerAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerAuthSession();
    if (!session) {
      return new Response(
        JSON.stringify({ message: "Usuário não autenticado" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const { product, categoryId } = await req.json();

    const newProduct = await prisma.product.create({
      data: {
        name: product,
        userId: session.user.id,
        categoryId: categoryId
      },
    });

    return new Response(JSON.stringify(newProduct), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Erro no backend:", error);
    return new Response(
      JSON.stringify({ message: error.message || "Erro ao criar produto" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

const orderConfigs = {
  ascending: { column: "name", config: "asc" },
  descending: { column: "name", config: "desc" },
  latest: { column: "createdAt", config: "desc" },
} as const;

type OrderKey = keyof typeof orderConfigs;

export async function getUserProducts(order?: string) {
  const session = await getServerAuthSession();
  if (!session) return null;

  return prisma.product.findMany({
    where: { userId: session.user.id },
    include: {
      category: true
    }
  });
}
  // const { column, config } =
  //   orderConfigs[(order as OrderKey) ?? "latest"] ?? orderConfigs.latest;