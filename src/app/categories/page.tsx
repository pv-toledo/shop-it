import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Title } from "./_components/title";
import { EmptyPlaceholder } from "./_components/empty-placeholder";

export default function CategoriesPage() {
  return (
    <div className="w-full max-w-6xl mx-auto px-10 lg:px-0">
      <Title />
      <EmptyPlaceholder />
    </div>
  );
}
