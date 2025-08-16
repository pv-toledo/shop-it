'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getRouteTitle, generateBreadcrumbItems } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

export function CategoryBreadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  
  const breadcrumbItems = generateBreadcrumbItems(segments, getRouteTitle);

  return (
    <section className="w-full max-w-6xl mx-auto px-10 py-4 lg:px-0">
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbItems.map((item) => (
            <Fragment key={item.href}>
              <BreadcrumbItem>
                {item.isLast ? (
                  <BreadcrumbPage className="lg:text-base">
                    {item.title}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={item.href} className="lg:text-base">
                      {item.title}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              
              {!item.isLast && <BreadcrumbSeparator />}
            </Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </section>
  );
}