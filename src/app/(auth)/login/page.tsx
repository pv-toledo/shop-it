import { Icons } from "@/components/icons";
import { Metadata } from "next";
import { AuthButton } from "@/components/auth-button";

export const metadata: Metadata = {
  title: "Login",
};

export default function AuthPage() {
  return (
    <>
      <div className="flex h-full w-full flex-col items-center justify-center space-y-6 px-5 lg:px-0">
        <div className="flex w-full flex-col max-w-md items-center space-y-2 border border-solid rounded-lg p-5">
          <Icons.logo className="h-6 w-6" />
          <h1 className="text-2xl font-semibold tracking-tight">
            Bem vindo de volta!
          </h1>
          <p className="text-sm text-muted-foreground">
            Faça login com sua conta do Google
          </p>
          <AuthButton />
        </div>
      </div>
    </>
  );
}
