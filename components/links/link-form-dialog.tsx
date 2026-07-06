// components/links/link-form-dialog.tsx
"use client";

import { useEffect, useState } from "react";
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
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@/components/ui/input-group";
import type { Link, LinkInput } from "@/hooks/use-links";

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
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [urlError, setUrlError] = useState<string | null>(null);

  // sincroniza os campos toda vez que o dialog abre pra um link diferente (ou pra criar)
  useEffect(() => {
    if (open) {
      setTitle(editing?.title ?? "");
      setUrl(editing?.url ?? "");
      setUrlError(null);
    }
  }, [open, editing]);

  function validateUrl(value: string): boolean {
    try {
      new URL(normalizeUrl(value));
      return true;
    } catch {
      return false;
    }
  }

  async function handleSave() {
    const trimmedTitle = title.trim();
    const normalizedUrl = normalizeUrl(url);

    if (!trimmedTitle) return;
    if (!validateUrl(normalizedUrl)) {
      setUrlError("Digite uma URL válida.");
      return;
    }

    setSaving(true);
    await onSubmit({ title: trimmedTitle, url: normalizedUrl });
    setSaving(false);
    onOpenChange(false);
  }

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
            <Input
              id="link-title"
              placeholder="My awesome link"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Field>
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
            {urlError && (
              <FieldDescription className="text-destructive">
                {urlError}
              </FieldDescription>
            )}
          </Field>
        </FieldGroup>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={saving}>
              Cancel
            </Button>
          </DialogClose>

          <Button
            onClick={handleSave}
            disabled={saving || !title.trim() || !url.trim()}
          >
            {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {editing ? "Save changes" : "Create link"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
