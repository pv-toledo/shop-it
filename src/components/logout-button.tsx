import { signOut } from "next-auth/react";
import { Icons } from "./icons";
import { Button } from "./ui/button";

export function LogoutButton() {
  return (
    <Button variant="ghost" onClick={() => signOut()} className="justify-start">
      <div className="flex gap-2 items-center">
        <Icons.logout className="text-red-500" />
        <span className="font-normal">Log out</span>
      </div>
    </Button>
  );
}
