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

    const { category } = await req.json();

    const newCategory = await prisma.category.create({
      data: {
        name: category,
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

const orderConfigs = {
  ascending: { column: "name", config: "asc" },
  descending: { column: "name", config: "desc" },
  latest: { column: "createdAt", config: "desc" },
} as const;

type OrderKey = keyof typeof orderConfigs;

export async function getUserCategories(order?: string) {
  const session = await getServerAuthSession();
  if (!session) return null;

  const { column, config } =
    orderConfigs[(order as OrderKey) ?? "latest"] ?? orderConfigs.latest;

  return prisma.category.findMany({
    where: { userId: session.user.id },
    orderBy: { [column]: config },
  });
}
