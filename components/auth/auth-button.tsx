import Link from "next/link";
import { LogOut } from "lucide-react";

import { Button } from "../ui/button";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "./logout-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export async function AuthButton() {
  const supabase = await createClient();

  const { data } = await supabase.auth.getClaims();

  const user = data?.claims;

  return user ? (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage
            src={user.user_metadata?.avatar_url ?? "/placeholder.svg"}
            alt={user.user_metadata?.display_name}
          />
          <AvatarFallback>
            {user.user_metadata?.display_name?.slice(0, 2).toUpperCase() ?? "U"}
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0">
          <p className="truncate text-sm font-medium">
            {user.user_metadata?.display_name}
          </p>
          <p className="truncate text-xs text-muted-foreground">
            @{user.user_metadata?.username}
          </p>
        </div>
      </div>

      <LogoutButton>
        <Button variant="ghost" size="icon">
          <LogOut className="h-4 w-4" />
        </Button>
      </LogoutButton>
    </div>
  ) : (
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
