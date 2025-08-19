"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Category } from "@/generated/prisma";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const newProductFormSchema = z.object({
  product: z
    .string()
    .min(1, { message: "O nome para o produto é obrigatório" })
    .max(30, { message: "O nome deve ter até 30 caracteres" })
    .trim(),
  categoryId: z.string(),
});

type NewProductForm = z.infer<typeof newProductFormSchema>;

export function NewProductButton() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const productForm = useForm<NewProductForm>({
    resolver: zodResolver(newProductFormSchema),
    defaultValues: {
      product: "",
    },
    mode: "onChange",
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

  async function createProductRequest(data: NewProductForm) {
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "Erro ao criar produto");
    }

    return res.json();
  }

  const { isValid, dirtyFields } = productForm.formState;

  const { mutate: createProduct, isPending } = useMutation({
    mutationFn: createProductRequest,
    onSuccess: () => {
      router.refresh();
      setOpen(false);
      productForm.reset();
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Não foi possível criar o produto");
      }
    },
  });

  const onSubmit = useCallback(
    (values: NewProductForm) => {
      createProduct(values);
    },
    [createProduct]
  );

  const handleOpenChange = useCallback(
    (state: boolean) => {
      if (!state) productForm.reset();
      setOpen(state);
    },
    [productForm]
  );

  const isSubmitDisabled = useMemo(() => {
    return !isValid || Object.keys(dirtyFields).length === 0 || isPending;
  }, [isValid, dirtyFields, isPending]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="w-fit text-white lg:text-lg lg:py-6">
          <Icons.plus className="lg:w-5! lg:h-5!" strokeWidth="3" />
          <p>Novo produto</p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-left text-xl">Criar novo produto</DialogTitle>
          <DialogDescription>
            Crie um novo produto para uma categoria.
          </DialogDescription>
        </DialogHeader>
        <Form {...productForm}>
          <form
            onSubmit={productForm.handleSubmit(onSubmit)}
            className="space-y-5"
          >
            <FormField
              control={productForm.control}
              name="product"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="product" className="text-md">
                    Nome
                  </Label>
                  <Input
                    type="text"
                    id="product"
                    autoComplete="off"
                    {...field}
                  />
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={productForm.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="category" className="text-md">
                    Categoria
                  </Label>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent className="w-full">
                      {availableCategories?.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            ></FormField>
            <Button
              type="submit"
              disabled={isSubmitDisabled}
              className="text-foreground"
            >
              Salvar
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
