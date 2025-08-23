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
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

type EditProductFormProps = {
  product: Product;
  onSuccessClose: () => void;
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

export function EditProductForm({
  product,
  onSuccessClose,
}: EditProductFormProps) {
  const router = useRouter();

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

  async function editProductRequest(data: EditProductForm) {
    const res = await fetch("/api/products", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "Erro ao editar produto");
    }

    return res.json();
  }

  const { mutate: editProduct, isPending } = useMutation({
    mutationFn: editProductRequest,
    onSuccess: () => {
      router.refresh();
      form.reset();
      onSuccessClose();
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Não foi possível criar o produto");
      }
    },
  });

  const { data: availableCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: getAvailableCategories,
  });

  function onSubmit(data: EditProductForm) {
    editProduct(data);
  }

  const { isValid, dirtyFields } = form.formState;

  const isSubmitDisabled =
    !isValid || Object.keys(dirtyFields).length === 0 || isPending;

  return (
    <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
      <DialogHeader>
        <DialogTitle className="text-left text-xl">Editar produto</DialogTitle>
        <DialogDescription>
          Edite o nome ou troque a categoria de seu produto.
        </DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
          <Button disabled={isSubmitDisabled} type="submit" className="text-foreground">
            Salvar
          </Button>
        </form>
      </Form>
    </DialogContent>
  );
}
