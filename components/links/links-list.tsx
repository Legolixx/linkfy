"use client";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
  arrayMove,
} from "@dnd-kit/sortable";

import { LinkCard } from "./link-card";
import type { Link } from "@/hooks/use-links";

interface LinksListProps {
  links: Link[];
  onToggle: (id: string, enabled: boolean) => void;
  onEdit: (link: Link) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
  onReorder: (orderedIds: string[]) => void;
}

export function LinksList({
  links,
  onToggle,
  onEdit,
  onDelete,
  onDuplicate,
  onReorder,
}: LinksListProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      // exige um pequeno arrasto antes de iniciar o drag,
      // pra não conflitar com cliques normais nos botões/switch do card
      activationConstraint: { distance: 6 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = links.findIndex((l) => l.id === active.id);
    const newIndex = links.findIndex((l) => l.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;

    const reordered = arrayMove(links, oldIndex, newIndex);
    onReorder(reordered.map((l) => l.id));
  }

  return (
    <DndContext
      id="links-dnd-context"
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={links.map((l) => l.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex flex-col gap-3">
          {links.map((link) => (
            <LinkCard
              key={link.id}
              link={link}
              onToggle={onToggle}
              onEdit={onEdit}
              onDelete={onDelete}
              onDuplicate={onDuplicate}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
