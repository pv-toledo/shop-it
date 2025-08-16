import { Category } from "@/generated/prisma";
import { NewProductInCategoryButton } from "./new-product-in-category-button";

type TitleProps = {
    category: Category
}

export function Title({category}: TitleProps) {
  return (
    <section className="w-full flex flex-col gap-2.5 lg:gap-5">
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
        {category.name}
      </h1>
      <p className="text-xl text-muted-foreground mb-2.5 lg:text-2xl lg:mb-0">
        Gerencie os produtos da categoria {category.name}
      </p>
      <NewProductInCategoryButton category={category} />
    </section>
  );
}
