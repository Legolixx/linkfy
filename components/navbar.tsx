import { ThemeSwitcher } from "@/components/theme-switcher";
import Image from "next/image";
import { Button } from "./ui/button";
import { Suspense } from "react";
import { AuthButtons } from "./auth-buttons-navbar";

export async function Navbar() {

  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full max-w-[1800px] flex justify-between items-center p-3 px-5 text-sm">
        <div className="relative w-40 h-10">
          <Image
            src="/logo.svg"
            alt="Logo Linkfy"
            fill
            priority
            className="object-contain"
          />
        </div>

        <div className="flex items-center gap-2">
          <ThemeSwitcher />

          <Suspense
            fallback={
              <>
                <Button size="sm" variant="outline" disabled>
                  Entrar
                </Button>
                <Button size="sm" disabled>
                  Criar conta
                </Button>
              </>
            }
          >
            <AuthButtons />
          </Suspense>
        </div>
      </div>
    </nav>
  );
}
