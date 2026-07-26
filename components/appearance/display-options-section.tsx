"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Field,
  FieldContent,
  FieldTitle,
  FieldDescription,
} from "@/components/ui/field";
import type { ProfileSettings } from "@/hooks/use-profile-settings";

interface DisplayOptionsSectionProps {
  settings: ProfileSettings;
  onChange: <K extends keyof ProfileSettings>(
    key: K,
    value: ProfileSettings[K],
    debounceMs?: number,
  ) => void;
}

export function DisplayOptionsSection({
  settings,
  onChange,
}: DisplayOptionsSectionProps) {
  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle>Opções de exibição</CardTitle>
        <CardDescription>
          Escolha quais elementos serão exibidos na sua página pública.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col">
        <Field
          orientation="horizontal"
          className="items-center py-4"
        >
          <FieldContent>
            <FieldTitle>Ícones das redes sociais</FieldTitle>
            <FieldDescription>
              Exiba os ícones das suas redes sociais abaixo da sua biografia.
            </FieldDescription>
          </FieldContent>

          <Switch
            className="self-center"
            checked={settings.show_socials}
            onCheckedChange={(checked) =>
              onChange("show_socials", checked, 0)
            }
          />
        </Field>

        {/*
        <Separator />

        <Field
          orientation="horizontal"
          className="items-center py-4"
        >
          <FieldContent>
            <FieldTitle>Marca do Linkfy</FieldTitle>
            <FieldDescription>
              Exiba o selo "Criado com Linkfy" na sua página.
            </FieldDescription>
          </FieldContent>

          <Switch
            className="self-center"
            checked={settings.show_branding}
            onCheckedChange={(checked) =>
              onChange("show_branding", checked, 0)
            }
          />
        </Field>
        */}
      </CardContent>
    </Card>
  );
}