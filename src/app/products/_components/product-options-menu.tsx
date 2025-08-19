"use client";

import { useState } from "react";
import { EditProductForm } from "@/app/categories/[categorySlug]/_components/edit-product-form"; // 2. Importar o novo componente de formulário
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Product } from "@/generated/prisma";

type ProductOptionsMenuProps = {
  product: Product;
};

type DialogType = "edit" | "delete" | null;

export function ProductOptionsMenu({ product }: ProductOptionsMenuProps) {
  const [openDialog, setOpenDialog] = useState<DialogType>(null);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            <Icons.ellipsis />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" className="lg:w-40">
          <DropdownMenuItem
            onSelect={() => setOpenDialog("edit")}
            className="flex gap-2 items-center p-2.5 lg:text-base lg:p-3"
          >
            <Icons.edit className="!h-4 !w-4 lg:!w-5 lg:!h-5" />
            <span className="font-semibold">Editar</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex gap-2 items-center p-2.5 lg:text-base lg:p-3">
            <Icons.trash className="text-red-500 !h-4 !w-4 lg:!w-5 lg:!h-5" />
            <span className="font-semibold text-red-500">Excluir</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog
        open={openDialog === "edit"}
        onOpenChange={(isOpen) => !isOpen && setOpenDialog(null)}
      >
        <EditProductForm product={product} />
      </Dialog>
    </>
  );
}
