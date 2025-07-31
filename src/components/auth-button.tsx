"use client";

import { signIn } from "next-auth/react";
import { Icons } from "./icons";
import { Button } from "./ui/button";

export function AuthButton() {

  return (
    <Button onClick={() => signIn('google')} className="mt-5">
      <div className="bg-accent-foreground rounded-full p-0.5">
        <Icons.google />
      </div>
      <span className="text-foreground">Entrar com Google</span>
    </Button>
  );
}
