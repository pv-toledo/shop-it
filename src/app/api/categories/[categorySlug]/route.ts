import { getServerAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import z from "zod";

const routeContextSchema = z.object({
  params: z.object({
    categorySlug: z.string(),
  }),
});

export async function GET(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const session = await getServerAuthSession();

    if (!session) {
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/login",
        },
      });
    }

    const { params } = routeContextSchema.parse(context);

    const { categorySlug } = params;

    const category = await prisma.category.findUnique({
      where: {
        slug: categorySlug,
      },
    });

    if (!category) {
      return new Response(
        JSON.stringify({ message: "Categoria não encontrada" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const productsInCategory = await prisma.product.findMany({
      where: {
        categoryId: category.id,
      },
    });

    return new Response(JSON.stringify(productsInCategory), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Erro no backend:", error);
    return new Response(
      JSON.stringify({ message: error.message || "Erro ao buscar produtos da categoria" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
