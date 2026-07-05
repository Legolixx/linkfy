import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { DashboardMobileNav } from "@/components/dashboard-mobile-nav";
//import { Suspense } from "react";
//import { AuthButton } from "@/components/auth/auth-button";
import { PageTitle } from "@/components/page-title";
import { AuthButton } from "@/components/auth/auth-button";
import { Suspense } from "react";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-background">
      <DashboardSidebar>
        <Suspense fallback={null}>
          <AuthButton />
        </Suspense>
      </DashboardSidebar>
      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center border-b px-6">
          <DashboardMobileNav>
            <Suspense fallback={null}>
              <AuthButton />
            </Suspense>
          </DashboardMobileNav>
          <div className="flex flex-row w-full justify-between">
            <PageTitle />
            {/*
            <Suspense>
              <AuthButton />
            </Suspense>
              */}
          </div>
        </header>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
