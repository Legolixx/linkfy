// lib/link-icons.tsx
import { Globe, Mail, type LucideIcon } from "lucide-react";
import {
  SiInstagram,
  SiX,
  SiYoutube,
  SiTiktok,
  SiLinkerd,
  SiGithub,
  SiFacebook,
  SiTwitch,
  SiWhatsapp,
} from "react-icons/si";
import type { IconType } from "react-icons";

export type LinkIconId =
  | "instagram"
  | "twitter"
  | "youtube"
  | "tiktok"
  | "website"
  | "linkedin"
  | "github"
  | "facebook"
  | "twitch"
  | "email"
  | "whatsapp";

export const linkIcons: {
  id: LinkIconId;
  label: string;
  Icon: IconType | LucideIcon;
}[] = [
  { id: "instagram", label: "Instagram", Icon: SiInstagram },
  { id: 'whatsapp', label: 'WhatsApp', Icon: SiWhatsapp },
  { id: "twitter", label: "X / Twitter", Icon: SiX },
  { id: "youtube", label: "YouTube", Icon: SiYoutube },
  { id: "tiktok", label: "TikTok", Icon: SiTiktok },
  { id: "linkedin", label: "LinkedIn", Icon: SiLinkerd },
  { id: "github", label: "GitHub", Icon: SiGithub },
  { id: "facebook", label: "Facebook", Icon: SiFacebook },
  { id: "twitch", label: "Twitch", Icon: SiTwitch },
  { id: "email", label: "Email", Icon: Mail },
  { id: "website", label: "Website", Icon: Globe },
];

export function getLinkIcon(id: string | null) {
  return linkIcons.find((i) => i.id === id) ?? null;
}
