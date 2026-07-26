"use client";

import { useEffect, useState } from "react";
import { Check, Loader2, X } from "lucide-react";
import { useUsernameAvailability } from "@/hooks/use-username-availability";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field";
import type { ProfileSettings } from "@/hooks/use-profile-settings";
import { AvatarUpload } from "./avatar-upload";

interface ProfileSectionProps {
  userId: string;
  settings: ProfileSettings;
  onChange: <K extends keyof ProfileSettings>(
    key: K,
    value: ProfileSettings[K],
    debounceMs?: number,
  ) => void;
  setLocal: <K extends keyof ProfileSettings>(
    key: K,
    value: ProfileSettings[K],
  ) => void;
}

export function ProfileSection({
  userId,
  settings,
  onChange,
  setLocal,
}: ProfileSectionProps) {
  const [usernameDraft, setUsernameDraft] = useState(settings.username);
  const { status: usernameStatus, check: checkUsername } =
    useUsernameAvailability(userId, settings.username);
  useEffect(() => {
    if (usernameStatus === "available") {
      onChange("username", usernameDraft, 0);
    }
  }, [usernameStatus, usernameDraft, onChange]);

  function handleUsernameChange(value: string) {
    setUsernameDraft(value);
    checkUsername(value);
  }

  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle>Profile</CardTitle>
        <CardDescription>
          Sua foto, nome e biografia exibidos no topo da sua página.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <div className="flex items-center gap-4 pt-3">
          <div className="flex flex-col gap-2">
            <AvatarUpload
              userId={userId}
              displayName={settings.display_name}
              avatarUrl={settings.avatar_url}
              onUploaded={(url) => setLocal("avatar_url", url)}
            />
          </div>
        </div>

        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="display-name">Nome de exibição</FieldLabel>
            <Input
              id="display-name"
              value={settings.display_name}
              onChange={(e) => onChange("display_name", e.target.value)}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="username">Nome de usuário</FieldLabel>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                linkfee.vercel.app/
              </span>
              <div className="relative flex-1">
                <Input
                  id="username"
                  value={usernameDraft}
                  onChange={(e) => handleUsernameChange(e.target.value)}
                />
                <span className="absolute right-2.5 top-1/2 -translate-y-1/2">
                  {usernameStatus === "checking" && (
                    <Loader2 className="size-4 animate-spin text-muted-foreground" />
                  )}
                  {usernameStatus === "available" && (
                    <Check className="size-4 text-emerald-600" />
                  )}
                  {(usernameStatus === "taken" ||
                    usernameStatus === "invalid") && (
                    <X className="size-4 text-destructive" />
                  )}
                </span>
              </div>
            </div>
            <FieldDescription>
              {usernameStatus === "taken" &&
                "Este nome de usuário já está em uso."}

              {usernameStatus === "invalid" &&
                "Use de 3 a 20 caracteres: letras minúsculas, números ou _."}

              {(usernameStatus === "idle" || usernameStatus === "same") &&
                "Este será o endereço público da sua página."}
            </FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor="bio">Biografia</FieldLabel>
            <Textarea
              id="bio"
              rows={3}
              value={settings.bio}
              onChange={(e) => onChange("bio", e.target.value)}
              maxLength={160}
            />
            <FieldDescription>
              {settings.bio.length}/160 caracteres
            </FieldDescription>
          </Field>
        </FieldGroup>
      </CardContent>
    </Card>
  );
}
