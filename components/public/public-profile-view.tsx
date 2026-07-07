import { Globe, AtSign, Share2, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { themePresets, accentColors } from "@/lib/mock-data";
import { getLinkIcon } from "@/lib/link-icons";
import Image from "next/image";

const buttonStyleMap: Record<string, string> = {
  rounded: "rounded-xl",
  square: "rounded-none",
  pill: "rounded-full",
};

interface PublicLink {
  id: string;
  title: string;
  url: string;
  icon: string | null;
  position: number;
}

interface PublicProfile {
  display_name: string;
  username: string;
  bio: string;
  avatar_url: string | null;
  theme: string;
  accent_color: string;
  button_style: string;
  show_socials: boolean;
  show_branding: boolean;
}

interface PublicProfileViewProps {
  profile: PublicProfile;
  links: PublicLink[];
}

export function PublicProfileView({ profile, links }: PublicProfileViewProps) {
  const activeTheme =
    themePresets.find((t) => t.id === profile.theme) ?? themePresets[0];
  const activeAccent =
    accentColors.find((a) => a.id === profile.accent_color)?.value ??
    accentColors[0].value;

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-10">
      <div
        className="flex h-[65vh] max-h-[820px] w-full max-w-sm flex-col rounded-[40px] border border-border p-6 shadow-sm"
        style={{ background: activeTheme.bg, color: activeTheme.fg }}
      >
        {/* Cabeçalho — nunca rola */}
        <div className="flex shrink-0 flex-col items-center gap-5">
          <Image
          loading="eager"
            src={profile.avatar_url ?? "/placeholder.svg"}
            alt={profile.display_name}
            width={64}
            height={64}
            className="size-16 rounded-full object-cover"
          />

          <div className="flex flex-col items-center gap-1.5 text-center">
            <span className="font-semibold">{profile.display_name}</span>
            <span className="text-xs opacity-70">@{profile.username}</span>
            <p className="text-xs leading-relaxed opacity-80 text-pretty">
              {profile.bio}
            </p>
          </div>

          {profile.show_socials && (
            <div className="flex items-center gap-4 opacity-80">
              <Globe className="size-5" />
              <AtSign className="size-5" />
              <Share2 className="size-5" />
            </div>
          )}
        </div>

        {/* Lista de links — única parte que rola */}
        <div className="mt-5 flex-1 overflow-y-auto overflow-x-hidden">
          <div className="flex flex-col gap-2.5 pb-2">
            {links.map((link) => {
              const iconMeta = getLinkIcon(link.icon);
              const Icon = iconMeta?.Icon;

              return (
                <a
                  key={link.id}
                  href={`/api/r/${link.id}`}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2.5 text-xs font-medium transition-transform hover:scale-[1.02]",
                    buttonStyleMap[profile.button_style],
                  )}
                  style={{ background: activeAccent, color: "#fff" }}
                >
                  {Icon && <Icon className="size-3.5 shrink-0" />}
                  <span className="flex-1 truncate">{link.title}</span>
                  <ExternalLink className="size-3.5 shrink-0 opacity-80" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Rodapé — nunca rola */}
        {profile.show_branding && (
          <span className="shrink-0 pt-4 text-center text-[10px] opacity-50">
            Made with Linkfy
          </span>
        )}
      </div>
    </main>
  );
}
