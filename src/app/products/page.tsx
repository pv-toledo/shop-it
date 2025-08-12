import { Metadata } from "next";
import { Title } from "./_components/title";
import { getUserProducts } from "../api/products/route";
import { EmptyPlaceholder } from "./_components/empty-placeholder";
import { ProductItem } from "./_components/product-item";

export const metadata: Metadata = {
  title: "Produtos",
};
export default async function ProductsPage() {
  const userProducts = await getUserProducts();

  return (
    <main className="w-full max-w-6xl mx-auto px-10 lg:px-0">
      <Title />
      {!userProducts || userProducts.length === 0 ? (
        <EmptyPlaceholder />
      ) : (
        <section className="flex flex-col gap-2.5 w-full mt-10 lg:gap-5 lg:mt-15">
          {userProducts?.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </section>
        
      )}
    </main>
  );
}
