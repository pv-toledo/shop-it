import { NewProductButton } from "./new-product-button";


export function Title() {
  return (
    <section className="flex flex-col gap-5 mt-5 lg:gap-5 lg:mt-8 lg:flex-row lg:justify-between">
      <div className="w-full flex flex-col gap-2.5 lg:gap-5">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Produtos
        </h1>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-xl text-muted-foreground lg:text-2xl">
            Crie e gerencie seus produtos
          </p>
          <NewProductButton />
        </div>
      </div>
    </section>
  );
}