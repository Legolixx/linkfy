// components/links/links-empty-state.tsx
"use client";

import { Plus, Search, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "@/components/ui/empty";

interface LinksEmptyStateProps {
  hasQuery: boolean;
  onCreate: () => void;
}

export function LinksEmptyState({ hasQuery, onCreate }: LinksEmptyStateProps) {
  return (
    <Empty className="py-16">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          {hasQuery ? <Search /> : <Link2 />}
        </EmptyMedia>
        <EmptyTitle>
          {hasQuery ? "Nenhum link encontrado" : "Nenhum link criado ainda"}
        </EmptyTitle>
        <EmptyDescription>
          {hasQuery
            ? "Tente usar outro termo de busca para encontrar o que você procura."
            : "Crie seu primeiro link para começar a construir sua página no Linkfy."}
        </EmptyDescription>
      </EmptyHeader>
      {!hasQuery && (
        <EmptyContent>
          <Button onClick={onCreate}>
            <Plus data-icon="inline-start" />
            Criar link
          </Button>
        </EmptyContent>
      )}
    </Empty>
  );
}
