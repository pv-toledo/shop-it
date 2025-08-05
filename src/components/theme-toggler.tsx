"use client";

import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { Icons } from "./icons";

export function ThemeToggler() {
  const { theme, setTheme } = useTheme();

  function handleThemeToggle() {
    setTheme(theme === "dark" ? "ligth" : "dark");
  }
  return (
    <Button
      variant="ghost"
      onClick={() => handleThemeToggle()}
      className="justify-start gap-4"
      aria-label="Alternar tema"
    >
      {theme === "dark" ? <Icons.moon /> : <Icons.sun />}
      <span className="lg:text-2xl">Tema {theme === "dark" ? "escuro" : "claro"}</span>
    </Button>
  );
}
