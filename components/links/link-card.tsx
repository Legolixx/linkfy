// components/links/link-card.tsx
"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  GripVertical,
  Pencil,
  Trash2,
  Copy,
  ExternalLink,
  MoreHorizontal,
  MousePointerClick,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import type { Link } from "@/hooks/use-links";
import { getLinkIcon } from "@/lib/link-icons";

interface LinkCardProps {
  link: Link;
  onToggle: (id: string, enabled: boolean) => void;
  onEdit: (link: Link) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
}

export function LinkCard({
  link,
  onToggle,
  onEdit,
  onDelete,
  onDuplicate,
}: LinkCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: link.id,
  });

  const iconMeta = getLinkIcon(link.icon);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={cn(
        "transition-opacity",
        !link.enabled && "opacity-60",
        isDragging && "z-10 opacity-80 shadow-lg",
      )}
    >
      <div className="flex items-center gap-3 px-3">
        <button
          type="button"
          aria-label="Drag to reorder"
          className="shrink-0 cursor-grab touch-none rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground active:cursor-grabbing"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="size-4" />
        </button>

        <div className="flex min-w-0 flex-1 flex-col gap-0.5 p-3">
          <div className="flex items-center gap-2">
            {iconMeta && (
              <iconMeta.Icon className="size-4 shrink-0 text-muted-foreground" />
            )}
            <span className="truncate text-sm font-medium">{link.title}</span>
            {!link.enabled && (
              <Badge variant="outline" className="shrink-0">
                Hidden
              </Badge>
            )}
          </div>
          <span className="truncate text-xs text-muted-foreground">
            {link.url}
          </span>
        </div>

        <div className="hidden items-center gap-1.5 text-xs text-muted-foreground sm:flex">
          <MousePointerClick className="size-3.5" />
          <span className="tabular-nums">{link.clicks.toLocaleString()}</span>
        </div>

        <Switch
          checked={link.enabled}
          onCheckedChange={(checked) => onToggle(link.id, checked)}
          aria-label={`Toggle ${link.title}`}
        />

        {/* Desktop actions */}
        <div className="hidden items-center gap-0.5 md:flex">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => onEdit(link)}
            aria-label="Edit link"
          >
            <Pencil className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => onDuplicate(link.id)}
            aria-label="Duplicate link"
          >
            <Copy className="size-4" />
          </Button>
          <Button variant="ghost" size="icon-sm" asChild aria-label="Open link">
            <a href={link.url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="size-4" />
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => onDelete(link.id)}
            aria-label="Delete link"
            className="text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="size-4" />
          </Button>
        </div>

        {/* Mobile actions */}
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon-sm" aria-label="Link actions">
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(link)}>
                <Pencil />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDuplicate(link.id)}>
                <Copy />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink />
                  Open
                </a>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onDelete(link.id)}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </Card>
  );
}
