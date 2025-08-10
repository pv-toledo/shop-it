import { Title } from "./_components/title";
import { EmptyPlaceholder } from "./_components/empty-placeholder";
import { Metadata } from "next";
import { getUserCategories } from "../api/categories/route";
import { CategoryItem } from "./_components/category-item";

export const metadata: Metadata = {
  title: "Categorias",
};

export default async function CategoriesPage() {
  const userCategories = await getUserCategories();

  return (
    <main className="w-full max-w-6xl mx-auto px-10 lg:px-0">
      <Title />
      {!userCategories || userCategories.length === 0 ? (
        <EmptyPlaceholder />
      ) : (
        <section className="flex flex-col gap-2.5 w-full mt-10 lg:gap-5 lg:mt-15">
          {userCategories?.map((category) => (
            <CategoryItem key={category.id} category={category} />
          ))}
        </section>
      )}
    </main>
  );
}
