"use client";

import Link from "next/link";
import {
  Menu,
  LayoutDashboard,
  Link2,
  Palette,
  BarChart3,
  Settings,
} from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
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

interface DashboardMobileNavProps {
  children?: ReactNode;
}
export function DashboardMobileNav({ children }: DashboardMobileNavProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="md:hidden">
          <Menu className="h-6 w-6" />
        </button>
      </SheetTrigger>

      <SheetContent side="left" className="flex h-full w-72 flex-col p-0">
        <div className="flex flex-col pl-3 pt-3">
          <div className="relative h-10 w-40">
            <Image
              src="/logo.svg"
              alt="Logo Linkfy"
              fill
              className="object-contain"
            />
          </div>
        </div>

        <nav className="flex-1 space-y-1 p-4">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted"
            >
              <item.icon className="h-5 w-5" />
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="border-t p-4">{children}</div>
      </SheetContent>
    </Sheet>
  );
}
