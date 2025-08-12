import { Badge } from "@/components/ui/badge";
import { ProductWithCategory } from "@/types/database";
import { format } from "date-fns";
import Link from "next/link";

type ProductItemProps = {
  product: ProductWithCategory;
};

export function ProductItem({ product }: ProductItemProps) {
  return (
    <div className="justify-between gap-1 w-full px-5 bg-card py-2.5 lg:p-5 border rounded-md lg:rounded-lg">
      <div className="flex flex-col gap-1 lg:gap-2">
        <div className="w-full flex items-center justify-between">
            <p className="text-lg font-medium lg:text-2xl">{product.name}</p>
            <Badge asChild className="text-foreground lg:text-sm">
                <Link href="">{product.category.name}</Link>
            </Badge>
        </div>
        <p className="text-sm text-muted-foreground font-medium lg:text-lg">
          Criado em: {format(new Date(product.createdAt), "dd/MM/yyyy")}
        </p>
      </div>
    </div>
  );
}
