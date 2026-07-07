// components/links/link-form-dialog.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, LinkIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Field,
  FieldLabel,
  FieldGroup,
  FieldDescription,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@/components/ui/input-group";
import { IconPicker } from "./icon-picker";
import { EmojiPickerButton } from "./emoji-picker-button";
import {
  buildWhatsappUrl,
  parseWhatsappUrl,
  isValidWhatsappPhone,
} from "@/lib/whatsapp";
import type { Link, LinkInput } from "@/hooks/use-links";
import type { LinkIconId } from "@/lib/link-icons";

interface LinkFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editing: Link | null;
  onSubmit: (input: LinkInput) => Promise<void>;
}

function normalizeUrl(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return trimmed;
  if (!/^https?:\/\//i.test(trimmed)) return `https://${trimmed}`;
  return trimmed;
}

export function LinkFormDialog({
  open,
  onOpenChange,
  editing,
  onSubmit,
}: LinkFormDialogProps) {
  const titleInputRef = useRef<HTMLInputElement | null>(null);

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [icon, setIcon] = useState<LinkIconId | null>(null);
  const [whatsappPhone, setWhatsappPhone] = useState("");
  const [whatsappMessage, setWhatsappMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [urlError, setUrlError] = useState<string | null>(null);

  const isWhatsapp = icon === "whatsapp";

  useEffect(() => {
    if (!open) return;

    setTitle(editing?.title ?? "");
    setIcon((editing?.icon as LinkIconId) ?? null);
    setUrlError(null);

    if (editing?.icon === "whatsapp" && editing.url) {
      const parsed = parseWhatsappUrl(editing.url);
      setWhatsappPhone(parsed?.phone ?? "");
      setWhatsappMessage(parsed?.message ?? "");
      setUrl("");
    } else {
      setUrl(editing?.url ?? "");
      setWhatsappPhone("");
      setWhatsappMessage("");
    }
  }, [open, editing]);

  // se o usuário trocar o ícone pra whatsapp no meio da edição,
  // tenta aproveitar o que já tinha na URL normal como telefone (best-effort)
  function handleIconChange(next: LinkIconId | null) {
    setIcon(next);
    setUrlError(null);
  }

  function validateStandardUrl(value: string): boolean {
    try {
      new URL(normalizeUrl(value));
      return true;
    } catch {
      return false;
    }
  }

  async function handleSave() {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    let finalUrl: string;

    if (isWhatsapp) {
      if (!isValidWhatsappPhone(whatsappPhone)) {
        setUrlError(
          "Digite um número válido com código do país (ex: 5511999999999).",
        );
        return;
      }
      finalUrl = buildWhatsappUrl(whatsappPhone, whatsappMessage);
    } else {
      const normalizedUrl = normalizeUrl(url);
      if (!validateStandardUrl(normalizedUrl)) {
        setUrlError("Digite uma URL válida.");
        return;
      }
      finalUrl = normalizedUrl;
    }

    setSaving(true);
    await onSubmit({ title: trimmedTitle, url: finalUrl, icon });
    setSaving(false);
    onOpenChange(false);
  }

  const isDisabled =
    saving ||
    !title.trim() ||
    (isWhatsapp ? !whatsappPhone.trim() : !url.trim());

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{editing ? "Edit link" : "Create link"}</DialogTitle>
          <DialogDescription>
            {editing
              ? "Update the title and destination for this link."
              : "Add a new link to your Linkfy page."}
          </DialogDescription>
        </DialogHeader>

        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="link-title">Title</FieldLabel>
            <div className="flex items-center gap-1">
              <Input
                id="link-title"
                ref={titleInputRef}
                placeholder="My awesome link"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="flex-1"
              />
              <EmojiPickerButton
                inputRef={titleInputRef}
                value={title}
                onChange={setTitle}
              />
            </div>
          </Field>

          <Field>
            <FieldLabel>Icon</FieldLabel>
            <IconPicker value={icon} onChange={handleIconChange} />
          </Field>

          {isWhatsapp ? (
            <>
              <Field>
                <FieldLabel htmlFor="whatsapp-phone">
                  Número do WhatsApp
                </FieldLabel>
                <Input
                  id="whatsapp-phone"
                  placeholder="5511999999999"
                  value={whatsappPhone}
                  onChange={(e) => {
                    setWhatsappPhone(e.target.value);
                    setUrlError(null);
                  }}
                />
                <FieldDescription>
                  Código do país + DDD + número, só números (ex: Brasil = 55).
                </FieldDescription>
              </Field>
              <Field>
                <FieldLabel htmlFor="whatsapp-message">
                  Mensagem pré-definida (opcional)
                </FieldLabel>
                <Textarea
                  id="whatsapp-message"
                  rows={2}
                  placeholder="Olá! Vim através da sua página."
                  value={whatsappMessage}
                  onChange={(e) => setWhatsappMessage(e.target.value)}
                />
              </Field>
            </>
          ) : (
            <Field>
              <FieldLabel htmlFor="link-url">Destination URL</FieldLabel>
              <InputGroup>
                <InputGroupAddon>
                  <LinkIcon />
                </InputGroupAddon>
                <InputGroupInput
                  id="link-url"
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => {
                    setUrl(e.target.value);
                    setUrlError(null);
                  }}
                />
              </InputGroup>
            </Field>
          )}

          {urlError && (
            <FieldDescription className="text-destructive">
              {urlError}
            </FieldDescription>
          )}
        </FieldGroup>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={saving}>
              Cancel
            </Button>
          </DialogClose>

          <Button onClick={handleSave} disabled={isDisabled}>
            {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {editing ? "Save changes" : "Create link"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
