import { Category } from "@/generated/prisma";
import { format } from "date-fns";
import Link from "next/link";

type CategoryListProps = {
  category: Category;
};

export function CategoryItem({ category }: CategoryListProps) {
  return (
    <Link href={`/categories/${category.slug}`}>
      <div className="justify-between gap-1 w-full px-5 bg-card py-2.5 lg:p-5 border rounded-md lg:rounded-lg">
        <div className="flex flex-col gap-1 lg:gap-2">
          <p className="text-lg font-medium lg:text-2xl">{category.name}</p>

          <p className="text-sm text-muted-foreground font-medium lg:text-lg">
            Criado em: {format(new Date(category.createdAt), "dd/MM/yyyy")}
          </p>
        </div>
      </div>
    </Link>
  );
}
