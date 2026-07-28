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
    // O fundo agora ocupa a tela inteira com a cor do tema,
    // e é a PÁGINA que rola — não um container interno.
    <main
      className="min-h-screen w-full"
      style={{ background: activeTheme.bg, color: activeTheme.fg }}
    >
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center px-5 py-12 sm:max-w-lg sm:px-8 sm:py-16 lg:max-w-xl">
        {/* Cabeçalho */}
        <div className="flex w-full flex-col items-center gap-4 sm:gap-5">
          <Image
            loading="eager"
            src={profile.avatar_url ?? "/placeholder.svg"}
            alt={profile.display_name}
            width={256}
            height={256}
            className="size-24 rounded-full object-cover ring-4 ring-black/5 sm:size-28 lg:size-32"
          />

          <div className="flex flex-col items-center gap-1.5 text-center">
            <span className="text-base font-semibold sm:text-lg">
              {profile.display_name}
            </span>
            <span className="text-sm opacity-70">@{profile.username}</span>
            {profile.bio && (
              <p className="mt-1 max-w-sm whitespace-pre-line text-sm leading-relaxed opacity-80 text-pretty">
                {profile.bio}
              </p>
            )}
          </div>

          {profile.show_socials && (
            <div className="flex items-center gap-5 opacity-80">
              <Globe className="size-5" />
              <AtSign className="size-5" />
              <Share2 className="size-5" />
            </div>
          )}
        </div>

        {/* Lista de links — sem scroll próprio, cresce com a página */}
        <div className="mt-8 flex w-full flex-col gap-3 sm:mt-10 sm:gap-3.5">
          {links.map((link) => {
            const iconMeta = getLinkIcon(link.icon);
            const Icon = iconMeta?.Icon;

            return (
              <a
                key={link.id}
                href={`/api/r/${link.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "group flex w-full items-center gap-3 px-5 py-3.5 text-sm font-medium shadow-sm transition-all",
                  "hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:scale-[0.99]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                  buttonStyleMap[profile.button_style],
                )}
                style={{ background: activeAccent, color: "#fff" }}
              >
                {Icon && <Icon className="size-4 shrink-0" />}
                <span className="flex-1 truncate text-center sm:text-[15px]">
                  {link.title}
                </span>
                <ExternalLink className="size-4 shrink-0 opacity-70 transition-opacity group-hover:opacity-100" />
              </a>
            );
          })}
        </div>

        {/* Rodapé */}
        {profile.show_branding && (
          <span className="mt-10 text-center text-xs opacity-50">
            Made with Linkfy
          </span>
        )}
      </div>
    </main>
  );
}