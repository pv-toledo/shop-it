import { CategoryBreadcrumb } from "./_components/category-breadcrumb";

export default function CategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen flex-col">
      <CategoryBreadcrumb />
      <div className="flex flex-col">{children}</div>
    </main>
  );
}
