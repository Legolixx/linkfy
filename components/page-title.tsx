"use client";

import { usePathname } from "next/navigation";

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/links": "Links",
  "/appearance": "Appearance",
  "/analytics": "Analytics",
  "/settings": "Settings",
};

export function PageTitle() {
  const pathname = usePathname();

  return (
    <h1 className="ml-4 text-lg font-semibold">
      {pageTitles[pathname] ?? "Dashboard"}
    </h1>
  );
}