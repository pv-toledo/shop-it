import { Title } from "./_components/title";
import { EmptyPlaceholder } from "./_components/empty-placeholder";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Categorias'
};

export default function CategoriesPage() {
  return (
    <div className="w-full max-w-6xl mx-auto px-10 lg:px-0">
      <Title />
      <EmptyPlaceholder />
    </div>
  );
}
