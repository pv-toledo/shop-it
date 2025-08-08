import { Icons } from "./icons";
import { SheetMenu } from "./sheet-menu";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function Header() {
  const session = await getServerSession(authOptions);

  if (!session?.user.email) return null;

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email,
    },
  });

  return (
    <header className="flex items-center justify-between border-b border-b-foreground/20 h-16 px-10 lg:h-22">
      <div className="max-w-6xl w-full flex items-center mx-auto justify-between">
        <div className="flex items-center gap-2">
          <Icons.logo className="w-6 h-6 lg:w-8 lg:h-8" />
          <span className="text-xl font-medium lg:text-2xl">Shop-it!</span>
        </div>
        <SheetMenu profile={user} />
      </div>
    </header>
  );
}
