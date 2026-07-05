"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Link2,
  Palette,
  BarChart3,
  Settings,
} from "lucide-react";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { ReactNode } from "react";

const items = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Links",
    href: "/links",
    icon: Link2,
  },
  {
    title: "Appearance",
    href: "/appearance",
    icon: Palette,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

interface DashboardSidebarProps {
  children?: ReactNode;
}

export function DashboardSidebar({ children }: DashboardSidebarProps) {
  const pathname = usePathname();
  return (
    <aside className="hidden h-screen w-64 shrink-0 border-r bg-background md:flex md:flex-col">
      <div className="flex h-full w-full flex-col">
        <div className="border-b px-6 py-4 max-h-16">
          <div className="relative w-40 h-10">
            <Image
              src="/logo.svg"
              alt="Logo Linkfy"
              fill
              className="object-contain"
            />
          </div>
        </div>

        <nav className="flex-1 space-y-1 p-4">
          {items.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>

        <div className="border-t p-4">{children}</div>
      </div>
    </aside>
  );
}
