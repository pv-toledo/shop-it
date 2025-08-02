"use client";

import { User } from "@/generated/prisma";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Icons } from "./icons";

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
      <SheetContent>
        <p>{profile?.name}</p>
      </SheetContent>
    </Sheet>
  );
}
