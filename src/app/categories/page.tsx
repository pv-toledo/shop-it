import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";

export default function CategoriesPage() {
  return (
    <div className="w-full max-w-6xl mx-auto px-10 lg:px-0">
      <div className="flex flex-col gap-5 mt-5 lg:gap-5 lg:mt-8 lg:flex-row lg:justify-between">
        <div className="w-full flex flex-col gap-2.5 lg:gap-5">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            Categorias
          </h1>
          <div className="flex flex-col gap-2.5 lg:flex-row lg:items-center lg:justify-between">
            <p className="text-xl text-muted-foreground lg:text-2xl">
              Crie e gerencie suas categorias
            </p>
            <Button className="w-fit text-foreground lg:text-lg lg:py-6">
              <Icons.plus className="lg:w-5! lg:h-5!" strokeWidth="3" />
              <p>Nova categoria</p>
            </Button>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center w-full max-w-6xl min-h-[400px] border border-dashed border-zinc-600 rounded-xl mt-8">
        <div className="flex flex-col items-center justify-between gap">
          <div className="flex items-center justify-center bg-muted w-20 h-20 rounded-full lg:w-20 lg:h-20">
            <Icons.layoutGrid className="w-10 h-10" />
          </div>
          <p className="text-lg font-medium mt-5 lg:text-2xl">
            Você ainda não tem categorias
          </p>
          <p className="font-medium text-muted-foreground lg:text-lg">
            Comece criando uma
          </p>

          <Button className="w-fit text-foreground mt-2.5 lg:mt-5 lg:text-lg lg:py-6">
            <Icons.plus className="lg:w-5! lg:h-5!" strokeWidth="3" />

            <p>Nova categoria</p>
          </Button>
        </div>
      </div>
    </div>
  );
}
