import { Title } from "./_components/title";
import { EmptyPlaceholder } from "./_components/empty-placeholder";
import { Metadata } from "next";
import { getUserCategories } from "../api/categories/route";
import { CategoryItem } from "./_components/category-item";
import { OrderFilter } from "./_components/order-filter";

export const metadata: Metadata = {
  title: "Categorias",
};

type CategoriesPageProps = {
	searchParams: Promise<{
		order?: string;
	}>;
};


export default async function CategoriesPage({searchParams}:CategoriesPageProps) {

  const {order} = await searchParams

  const userCategories = await getUserCategories(order);

  return (
    <main className="w-full max-w-6xl mx-auto px-10 lg:px-0">
      <Title />
      <OrderFilter />
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
