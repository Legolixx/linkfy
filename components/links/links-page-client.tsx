// components/links/links-page-client.tsx — trechos ajustados
"use client";

import { useMemo, useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/page-header";
import { LinksSearch } from "./links-search";
import { LinksList } from "./links-list";
import { LinksEmptyState } from "./links-empty-state";
import { LinkFormDialog } from "./link-form-dialog";
import { DeleteLinkDialog } from "./delete-link-dialog";
import { useLinks, type Link } from "@/hooks/use-links";

interface LinksPageClientProps {
  profileId: string;
  initialLinks: Link[];
}

export function LinksPageClient({
  profileId,
  initialLinks,
}: LinksPageClientProps) {
  const {
    links,
    createLink,
    updateLink,
    toggleLink,
    deleteLink,
    duplicateLink,
    reorderLinks,
    error,
  } = useLinks(profileId, initialLinks);

  const [query, setQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Link | null>(null);

  const [deleteTarget, setDeleteTarget] = useState<Link | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return links;
    return links.filter(
      (l) =>
        l.title.toLowerCase().includes(q) || l.url.toLowerCase().includes(q),
    );
  }, [links, query]);

  const activeCount = links.filter((l) => l.enabled).length;

  function openCreate() {
    setEditing(null);
    setDialogOpen(true);
  }

  function openEdit(link: Link) {
    setEditing(link);
    setDialogOpen(true);
  }

  function openDeleteConfirm(id: string) {
    const link = links.find((l) => l.id === id);
    if (!link) return;
    setDeleteTarget(link);
    setDeleteDialogOpen(true);
  }

  async function handleSubmit(input: {
    title: string;
    url: string;
    icon?: string | null;
  }) {
    if (editing) {
      await updateLink(editing.id, input);
    } else {
      await createLink(input);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Links"
        description={`${links.length} links · ${activeCount} ativos`}
      >
        <Button size="sm" onClick={openCreate}>
          <Plus data-icon="inline-start" />
          Criar link
        </Button>
      </PageHeader>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <LinksSearch value={query} onChange={setQuery} />

      {filtered.length > 0 ? (
        <LinksList
          links={filtered}
          onToggle={toggleLink}
          onEdit={openEdit}
          onDelete={openDeleteConfirm}
          onDuplicate={duplicateLink}
          onReorder={reorderLinks}
        />
      ) : (
        <LinksEmptyState
          hasQuery={query.trim().length > 0}
          onCreate={openCreate}
        />
      )}

      <LinkFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        editing={editing}
        onSubmit={handleSubmit}
      />

      <DeleteLinkDialog
        link={deleteTarget}
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={deleteLink}
      />
    </div>
  );
}
