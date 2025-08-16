import { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
    name: 'Shop-it',
    description: "Organize personal shopping items"
}

export const routeTitles: Record<string, string> = {
  dashboard: "Dashboard",
  categories: "Categorias",
  products: "Produtos",
};

export const orderConfigs = {
  ascending: { column: "name", config: "asc" },
  descending: { column: "name", config: "desc" },
  latest: { column: "createdAt", config: "desc" },
} as const;