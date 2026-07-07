// components/sidebar-profile-card.tsx
import Link from "next/link";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

interface SidebarProfileCardProps {
  username: string;
  displayName: string;
  avatarUrl: string | null;
}

export function SidebarProfileCard({ username, displayName, avatarUrl }: SidebarProfileCardProps) {
  return (
    <div className="flex flex-col gap-3">
      <Link
        href={`/${username}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between gap-2 rounded-lg border bg-muted/40 px-3 py-2.5 text-xs transition-colors hover:bg-muted"
      >
        <div className="flex flex-col gap-0.5 truncate">
          <span className="truncate font-semibold">linkfy.to/{username}</span>
          <span className="text-muted-foreground">View public page</span>
        </div>
        <ExternalLink className="size-4 shrink-0 text-muted-foreground" />
      </Link>

      <div className="flex items-center gap-2.5 px-1">
        <Image
          src={avatarUrl ?? "/placeholder.svg"}
          alt={displayName}
          width={32}
          height={32}
          className="size-8 shrink-0 rounded-full object-cover"
        />
        <div className="flex min-w-0 flex-col">
          <span className="truncate text-sm font-medium">{displayName}</span>
          <span className="truncate text-xs text-muted-foreground">@{username}</span>
        </div>
      </div>
    </div>
  );
}