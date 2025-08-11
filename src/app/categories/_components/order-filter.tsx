"use client";

import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const orderFormSchema = z.object({
  order: z.enum(["latest", "ascending", "descending"]),
});

type OrderFormInput = z.infer<typeof orderFormSchema>;

const orderOptions = [
  { name: "Mais recente", value: "latest" },
  { name: "De A a Z", value: "ascending" },
  { name: "De Z a A", value: "descending" },
];

export function OrderFilter() {
  const [open, setOpen] = useState(false);
  const params = useSearchParams();
  const router = useRouter();

  const orderForm = useForm<OrderFormInput>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      order: "latest"
    }
  });

  function onSubmit(data: OrderFormInput) {
    const currentParams = new URLSearchParams(params.toString());

    if (data.order !== currentOrder) {
      currentParams.set("order", data.order);
    }
    router.push(`?${currentParams.toString()}`);
    router.refresh()
  }

  const currentOrder = useMemo(() => {
    return params.get("order");
  }, [params]);

  return (
    <div className="mt-5">
      <Form {...orderForm}>
        <form>
          <FormField
            control={orderForm.control}
            name="order"
            render={({ field }) => (
              <FormItem className="flex gap-2.5">
                <FormLabel className="lg:text-lg">Ordenar por: </FormLabel>
                <FormControl>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="ghost"
                        type="button"
                        aria-expanded={open}
                        className="font-bold w-fit px-0! lg:text-lg"
                      >
                        {currentOrder ? (orderOptions.find((option) => option.value === currentOrder))?.name : "Mais recente"}
                        <ChevronDown
                          className="ml-2 h-4 w-4 shrink-0"
                          strokeWidth={3}
                        />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="start" className="w-fit px-2.5 py-1">
                      <Command>
                        <CommandGroup>
                          {orderOptions.map((option) => (
                            <CommandItem
                              key={option.value}
                              className="font-medium lg:text-lg"
                              value={option.value}
                              onSelect={() => {
                                field.onChange(option.value);
                                orderForm.handleSubmit(onSubmit)();
                                setOpen(false);
                              }}
                            >
                              <Check
                                strokeWidth={3}
                                className={cn("text-foreground", currentOrder === option.value ? "opacity-100" : "opacity-0")}
                              />
                              {option.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
