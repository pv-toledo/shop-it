"use client";

import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category, Product } from "@/generated/prisma";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import z from "zod";

type EditProductFormProps = {
  product: Product;
};

const editProductFormSchema = z.object({
  id: z.string(),
  name: z
    .string()
    .min(1, { message: "O nome para o produto é obrigatório" })
    .max(30, { message: "O nome deve ter até 30 caracteres" })
    .trim(),
  categoryId: z.string(),
});

type EditProductForm = z.infer<typeof editProductFormSchema>;

export function EditProductForm({ product }: EditProductFormProps) {
  const form = useForm<EditProductForm>({
    resolver: zodResolver(editProductFormSchema),
    defaultValues: {
      id: product.id,
      name: product.name,
      categoryId: product.categoryId,
    },
  });

  async function getAvailableCategories(): Promise<Category[]> {
    const res = await fetch("/api/categories");

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "Erro ao buscar categorias");
    }

    return res.json();
  }

  const { data: availableCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: getAvailableCategories,
  });

  return (
    <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
      <DialogHeader >
        <DialogTitle className="text-left text-xl">Editar produto</DialogTitle>
        <DialogDescription>
          Edite o nome ou troque a categoria de seu produto.
        </DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form className="space-y-5">
          <FormField
            control={form.control}
            name="id"
            render={({ field }) => <input type="hidden" {...field} />}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="name" className="text-md">
                  Nome
                </FormLabel>
                <Input type="text" id="name" autoComplete="off" {...field} />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="categoryId" className="text-md">
                  Categoria
                </FormLabel>
                <Select
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="w-full" id="categoryId">
                    {availableCategories?.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <Button type="submit" className="text-foreground">Salvar</Button>
        </form>
      </Form>
    </DialogContent>
  );
}
