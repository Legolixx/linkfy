"use client";

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
  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle>Profile</CardTitle>
        <CardDescription>
          Your picture, name, and bio shown at the top of your page.
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
            <FieldLabel htmlFor="display-name">Display name</FieldLabel>
            <Input
              id="display-name"
              value={settings.display_name}
              onChange={(e) => onChange("display_name", e.target.value)}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="username">Username</FieldLabel>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">linkfy.to/</span>
              <Input
                id="username"
                value={settings.username}
                onChange={(e) => onChange("username", e.target.value)}
              />
            </div>
            <FieldDescription>
              This is your public page address.
            </FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor="bio">Bio</FieldLabel>
            <Textarea
              id="bio"
              rows={3}
              value={settings.bio}
              onChange={(e) => onChange("bio", e.target.value)}
              maxLength={160}
            />
            <FieldDescription>
              {settings.bio.length}/160 characters
            </FieldDescription>
          </Field>
        </FieldGroup>
      </CardContent>
    </Card>
  );
}
