"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface LogoutButtonProps {
  children?: ReactNode;
}

export function LogoutButton({ children }: LogoutButtonProps) {
  const router = useRouter();

  const logout = async () => {
    const supabase = createClient();

    await supabase.auth.signOut();

    router.push("/auth/login");
    router.refresh();
  };

  if (children) {
    return <div onClick={logout}>{children}</div>;
  }

  return <Button onClick={logout}>Logout</Button>;
}