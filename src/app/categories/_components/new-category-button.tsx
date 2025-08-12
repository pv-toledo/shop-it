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
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { queryClient } from "@/lib/query-client";

const newCategoryFormSchema = z.object({
  category: z
    .string()
    .min(1, { message: "O nome para a categoria é obrigatório" })
    .max(30, { message: "O nome deve ter até 30 caracteres" })
    .trim(),
});

type NewCategoryForm = z.infer<typeof newCategoryFormSchema>;

export function NewCategoryButton() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const categoryForm = useForm<NewCategoryForm>({
    resolver: zodResolver(newCategoryFormSchema),
    defaultValues: {
      category: "",
    },
    mode: "onChange",
  });

  async function createCategoryRequest(data: NewCategoryForm) {
    const res = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "Erro ao criar categoria");
    }

    return res.json();
  }

  const { isValid, dirtyFields } = categoryForm.formState;

  const { mutate: createCategory, isPending } = useMutation({
    mutationFn: createCategoryRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      router.refresh();
      setOpen(false);
      categoryForm.reset();
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Não foi possível criar a categoria");
      }
    },
  });

  const onSubmit = useCallback(
    (values: NewCategoryForm) => {
      createCategory(values);
    },
    [createCategory]
  );

  const handleOpenChange = useCallback(
    (state: boolean) => {
      if (!state) categoryForm.reset();
      setOpen(state);
    },
    [categoryForm]
  );

  const isSubmitDisabled = useMemo(() => {
    return !isValid || Object.keys(dirtyFields).length === 0 || isPending;
  }, [isValid, dirtyFields, isPending]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="w-fit text-white lg:text-lg lg:py-6">
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
        <Form {...categoryForm}>
          <form
            onSubmit={categoryForm.handleSubmit(onSubmit)}
            className="space-y-5"
          >
            <FormField
              control={categoryForm.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="category" className="text-md">
                    Categoria
                  </Label>
                  <Input
                    type="text"
                    id="category"
                    autoComplete="off"
                    {...field}
                  />
                </FormItem>
              )}
            ></FormField>
            <Button
              size="lg"
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
