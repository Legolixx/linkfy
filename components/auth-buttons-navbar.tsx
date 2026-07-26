// components/auth-buttons.tsx
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Button } from "./ui/button";

export async function AuthButtons() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return (
      <Button asChild size="sm">
        <Link href="/dashboard">Dashboard</Link>
      </Button>
    );
  }

  return (
    <>
      <Button asChild size="sm" variant="outline">
        <Link href="/auth/login">Entrar</Link>
      </Button>

      <Button asChild size="sm">
        <Link href="/auth/sign-up">Criar conta</Link>
      </Button>
    </>
  );
}