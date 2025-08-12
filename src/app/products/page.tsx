import { Metadata } from "next";
import { Title } from "./_components/title";

export const metadata: Metadata = {
  title: "Produtos",
};
export default function ProductsPage() {
  return (
    <main className="w-full max-w-6xl mx-auto px-10 lg:px-0">
      <Title />
    </main>
  );
}
