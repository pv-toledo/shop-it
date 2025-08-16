import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ProductOptionsMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <Icons.ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="lg:w-40">
        <DropdownMenuItem className="flex gap-2 items-center p-2.5 lg:text-base lg:p-3">
          <Icons.edit className="!h-4 !w-4 lg:!w-5 lg:!h-5" />
          <span className="font-semibold">Editar</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex gap-2 items-center p-2.5 lg:text-base lg:p-3">
          <Icons.trash className="text-red-500 !h-4 !w-4 lg:!w-5 lg:!h-5" />
          <span className="font-semibold text-red-500">Excluir</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
