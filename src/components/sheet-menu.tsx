"use client";

import { User } from "@/generated/prisma";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Icons } from "./icons";
import { LogoutButton } from "./logout-button";
import { ThemeToggler } from "./theme-toggler";

type SheetMenuProps = {
  profile: User | null;
};

export function SheetMenu({ profile }: SheetMenuProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="border border-foreground/20"
        >
          <Icons.menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="p-5">
        <SheetHeader>
          <SheetTitle className="hidden" />
          <p className="text-sm">{profile?.name}</p>
          <p className="text-xs text-muted-foreground">{profile?.email}</p>
        </SheetHeader>
        <ThemeToggler />
        <LogoutButton />
      </SheetContent>
    </Sheet>
  );
}
