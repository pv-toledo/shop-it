"use client";

import { User } from "@/generated/prisma";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { Icons } from "./icons";
import { LogoutButton } from "./logout-button";
import { ThemeToggler } from "./theme-toggler";
import Link from "next/link";

type SheetMenuProps = {
  profile: User | null;
};

export function SheetMenu({ profile }: SheetMenuProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size={"default"}
          className="border border-foreground/20"
        >
          <Icons.menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="lg:min-w-xl p-5">
        <SheetHeader>
          <SheetTitle className="hidden" />
          <p className="text-xl font-medium lg:text-3xl">{profile?.name}</p>
          <p className="text-muted-foreground lg:text-xl">
            {profile?.email}
          </p>
        </SheetHeader>
        <Button variant="ghost" className="justify-start gap-4">
          <Icons.tags />
          <Link href="/products" className="text-lg lg:text-2xl">
            Meus produtos
          </Link>
        </Button>
        <Button variant="ghost" className="justify-start gap-4">
          <Icons.layoutGrid />
          <Link href="/categories" className="text-lg lg:text-2xl">
            Categorias
          </Link>
        </Button>
        <ThemeToggler />
        <LogoutButton />
      </SheetContent>
    </Sheet>
  );
}
