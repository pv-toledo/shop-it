import { signOut } from "next-auth/react";
import { Icons } from "./icons";
import { Button } from "./ui/button";

export function LogoutButton() {
  return (
    <Button variant="ghost"  onClick={() => signOut()} className="justify-start">
      <div className="flex gap-4 items-center">
        <Icons.logout className="text-red-500" />
        <span className="lg:text-2xl">Log out</span>
      </div>
    </Button>
  );
}
