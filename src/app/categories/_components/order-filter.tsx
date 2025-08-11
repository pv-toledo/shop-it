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
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const orderFormSchema = z.object({
  order: z.enum(["latest", "ascending", "descending"]),
});

type orderFormInput = z.infer<typeof orderFormSchema>;

export function OrderFilter() {
  const [open, setOpen] = useState(false);

  const orderForm = useForm<orderFormInput>({
    resolver: zodResolver(orderFormSchema),
  });

  return (
    <div className="mt-5">
      <Form {...orderForm}>
        <form>
          <FormField
            control={orderForm.control}
            name="order"
            render={({ field }) => (
              <FormItem className="flex gap-2.5">
                <FormLabel>Ordenar por: </FormLabel>
                <FormControl>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="ghost"
                        type="button"
                        aria-expanded={open}
                        className="font-bold w-fit px-0!"
                      >
                        Mais recentes
                        <ChevronDown
                          className="ml-2 h-4 w-4 shrink-0"
                          strokeWidth={3}
                        />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="start" className="w-fit px-2.5 py-1">
                      <Command>
                        <CommandGroup>
                          <CommandItem value="latest">
                            Mais recentes
                          </CommandItem>
                          <CommandItem value="ascending">De A a Z</CommandItem>
                          <CommandItem value="descending">De Z a A</CommandItem>
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
