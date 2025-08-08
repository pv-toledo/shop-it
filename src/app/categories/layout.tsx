import { Header } from "@/components/header";

export default function CategoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-col">{children}</div>
      
    </main>
  );
}
