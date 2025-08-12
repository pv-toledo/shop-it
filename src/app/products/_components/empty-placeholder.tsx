import { Icons } from "@/components/icons";
import { NewProductButton } from "./new-product-button";


export function EmptyPlaceholder() {
  return (
    <div className="flex items-center justify-center w-full max-w-6xl min-h-[400px] border border-dashed border-zinc-600 rounded-xl mt-8">
      <div className="flex flex-col items-center justify-between">
        <div className="flex items-center justify-center bg-muted w-20 h-20 rounded-full lg:w-20 lg:h-20">
          <Icons.tags className="w-10 h-10" />
        </div>
        <p className="text-lg font-medium mt-5 lg:text-2xl">
          Você ainda não tem produtos
        </p>
        <p className="font-medium text-muted-foreground mb-2.5 lg:mb-5 lg:text-lg">
          Comece criando um
        </p>

        <NewProductButton />
      </div>
    </div>
  );
}