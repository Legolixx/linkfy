import { AuthButton } from "@/components/auth/auth-button";
import { Suspense } from "react";
import { ThemeSwitcher } from "@/components/theme-switcher";
import Image from "next/image";

export function Navbar() {
  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full max-w-[1800px] flex justify-between items-center p-3 px-5 text-sm">
        <div className="relative w-40 h-10">
          <Image
            src="/logo.svg"
            alt="Logo Linkfy"
            fill
            className="object-contain"
          />
        </div>
        <div className="flex flex-row gap-1 items-center">
          <ThemeSwitcher />
          <Suspense>
            <AuthButton />
          </Suspense>
        </div>
      </div>
    </nav>
  );
}
