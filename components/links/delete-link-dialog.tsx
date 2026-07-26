"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import type { Link } from "@/hooks/use-links";

interface DeleteLinkDialogProps {
  link: Link | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (id: string) => Promise<void>;
}

export function DeleteLinkDialog({
  link,
  open,
  onOpenChange,
  onConfirm,
}: DeleteLinkDialogProps) {
  const [deleting, setDeleting] = useState(false);

  async function handleConfirm() {
    if (!link) return;
    setDeleting(true);
    await onConfirm(link.id);
    setDeleting(false);
    onOpenChange(false);
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir este link?</AlertDialogTitle>
          <AlertDialogDescription>
            {link ? (
              <>
                Isso excluirá permanentemente <strong>{link.title}</strong>.
                Esta ação não poderá ser desfeita.
              </>
            ) : (
              "Esta ação não poderá ser desfeita."
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleting}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault(); // impede o AlertDialog de fechar sozinho antes do await terminar
              handleConfirm();
            }}
            disabled={deleting}
            className="bg-destructive text-white hover:bg-destructive/90"
          >
            {deleting && <Loader2 className="animate-spin" />}
            Deletar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
