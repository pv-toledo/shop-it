import { Category } from "@/generated/prisma";

type TitleProps = {
    category: Category
}

export function Title({category}: TitleProps) {
  return (
    <section className="w-full flex flex-col gap-2.5 lg:gap-5">
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
        {category.name}
      </h1>
      <p className="text-xl text-muted-foreground lg:text-2xl">
        Gerencie os produtos da categoria {category.name}
      </p>
    </section>
  );
}
