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
    <header className="flex items-center justify-between border-b border-b-foreground/20 h-16 px-10">
      <div className="flex items-center gap-2">
        <Icons.logo size={18} />
        <span>Shop-it!</span>
      </div>
      <SheetMenu profile={user} />
    </header>
  );
}
