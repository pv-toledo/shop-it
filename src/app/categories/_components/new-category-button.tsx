import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function NewCategoryButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-fit text-foreground lg:text-lg lg:py-6">
          <Icons.plus className="lg:w-5! lg:h-5!" strokeWidth="3" />
          <p>Nova categoria</p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="gap-0.5">
          <DialogTitle className="text-xl">Criar nova categoria</DialogTitle>
          <DialogDescription>
            Crie uma nova categoria para seus produtos.
          </DialogDescription>
        </DialogHeader>

        <Label htmlFor="category" className="text-md">Categoria</Label>
        <Input type="text" id="category" />

        <Button type="submit" className="text-foreground">
          Salvar
        </Button>
      </DialogContent>
    </Dialog>
  );
}
