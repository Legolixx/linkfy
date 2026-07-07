// app/(protected)/layout.tsx
import { Suspense } from "react";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { DashboardMobileNav } from "@/components/dashboard-mobile-nav";
import { AuthButton } from "@/components/auth/auth-button";
import { PageTitle } from "@/components/page-title";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <DashboardSidebar>
        <Suspense fallback={null}>
          <AuthButton />
        </Suspense>
      </DashboardSidebar>

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 shrink-0 items-center border-b px-6">
          <DashboardMobileNav>
            <Suspense fallback={null}>
              <AuthButton />
            </Suspense>
          </DashboardMobileNav>
          <div className="flex w-full flex-row justify-between">
            <PageTitle />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}