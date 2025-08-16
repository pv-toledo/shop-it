import { orderConfigs, routeTitles } from "@/config/site";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRouteTitle(segment: string): string {
  return (
    routeTitles[segment] || segment.charAt(0).toUpperCase() + segment.slice(1)
  );
}

export type BreadcrumbItem = {
  href: string;
  title: string;
  isLast: boolean;
};

export function generateBreadcrumbItems(
  segments: string[],
  getTitleFn: (segment: string) => string
): BreadcrumbItem[] {
  return segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    const isLast = index === segments.length - 1;
    const title = getTitleFn(segment);

    return {
      href,
      title,
      isLast,
    };
  });
}

export function getOrderConfig(order?: string) {

  type OrderKey = keyof typeof orderConfigs;
  
  const { column, config } =
    orderConfigs[(order as OrderKey) ?? "latest"] ?? orderConfigs.latest;

  return { column, config };
}
