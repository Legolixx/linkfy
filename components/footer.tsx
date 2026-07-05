"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t py-8">
      <div className="container mx-auto flex items-center justify-center gap-8 px-4 text-center text-xs">
        <p className="text-muted-foreground">
          © {process.env.NEXT_PUBLIC_COPYRIGHT_YEAR}{" "}
          <Link
            href="https://zekastech.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold hover:underline"
          >
            ZekasTech
          </Link>
          . Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
