// components/auth/auth-button.tsx
import Link from "next/link";
import { LogOut, ExternalLink } from "lucide-react";

import { Button } from "../ui/button";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "./logout-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export async function AuthButton() {
  const supabase = await createClient();

  const { data } = await supabase.auth.getClaims();
  const authUser = data?.claims;

  if (!authUser) {
    return (
      <div className="flex gap-2">
        <Button asChild size="sm" variant="outline">
          <Link href="/auth/login">Sign in</Link>
        </Button>
        <Button asChild size="sm">
          <Link href="/auth/sign-up">Sign up</Link>
        </Button>
      </div>
    );
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("username, display_name, avatar_url")
    .eq("id", authUser.sub)
    .single();

  const displayName = profile?.display_name ?? "";
  const username = profile?.username ?? "";

  return (
    <div className="flex flex-col gap-3">
      {profile && (
        <Link
          href={`/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between gap-2 rounded-lg border bg-muted/40 px-3 py-2.5 text-xs transition-colors hover:bg-muted"
        >
          <div className="flex min-w-0 flex-col gap-0.5">
            <span className="truncate font-semibold">linkfy.to/{username}</span>
            <span className="text-muted-foreground">View public page</span>
          </div>
          <ExternalLink className="size-4 shrink-0 text-muted-foreground" />
        </Link>
      )}

      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={profile?.avatar_url ?? "/placeholder.svg"} alt={displayName} />
            <AvatarFallback>{displayName.slice(0, 2).toUpperCase() || "U"}</AvatarFallback>
          </Avatar>

          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{displayName}</p>
            <p className="truncate text-xs text-muted-foreground">@{username}</p>
          </div>
        </div>

        <LogoutButton>
          <Button variant="ghost" size="icon">
            <LogOut className="h-4 w-4" />
          </Button>
        </LogoutButton>
      </div>
    </div>
  );
}