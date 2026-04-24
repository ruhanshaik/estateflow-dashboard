import { useState, type ReactNode } from "react";
import {
  Bell, Building2, Calendar as CalIcon, ChartPie, ChevronLeft, KanbanSquare,
  LayoutDashboard, LogOut, Megaphone, Menu, Search, Users, Home as HomeIcon, UserSquare2,
} from "lucide-react";

export type TabKey =
  | "overview" | "properties" | "leads" | "clients" | "deals" | "marketing" | "analytics" | "calendar";

const NAV: { key: TabKey; label: string; icon: typeof HomeIcon }[] = [
  { key: "overview", label: "Overview", icon: LayoutDashboard },
  { key: "properties", label: "Properties", icon: HomeIcon },
  { key: "leads", label: "Leads", icon: Users },
  { key: "clients", label: "Clients", icon: UserSquare2 },
  { key: "deals", label: "Deals Pipeline", icon: KanbanSquare },
  { key: "marketing", label: "Marketing Hub", icon: Megaphone },
  { key: "analytics", label: "Analytics", icon: ChartPie },
  { key: "calendar", label: "Calendar", icon: CalIcon },
];

interface ShellProps {
  active: TabKey;
  onChange: (k: TabKey) => void;
  onLogout: () => void;
  children: ReactNode;
}

export function Shell({ active, onChange, onLogout, children }: ShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-secondary/40">
      {/* Sidebar — desktop */}
      <aside
        className={`hidden lg:flex fixed inset-y-0 left-0 z-30 flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-all duration-300 ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        <div className="flex items-center justify-between px-5 h-16 border-b border-sidebar-border">
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
              <Building2 className="h-5 w-5" />
            </div>
            {!collapsed && (
              <span className="font-display text-lg font-bold tracking-tight text-white">EstateFlow</span>
            )}
          </div>
          <button
            onClick={() => setCollapsed((c) => !c)}
            className="text-sidebar-foreground/60 hover:text-white transition"
            aria-label="Toggle sidebar"
          >
            <ChevronLeft className={`h-4 w-4 transition-transform ${collapsed ? "rotate-180" : ""}`} />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto scrollbar-thin">
          {NAV.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.key;
            return (
              <button
                key={item.key}
                onClick={() => onChange(item.key)}
                title={collapsed ? item.label : undefined}
                className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition group ${
                  isActive
                    ? "bg-accent text-accent-foreground shadow-glow"
                    : "text-sidebar-foreground/75 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon className="h-4.5 w-4.5 shrink-0" />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        <div className="p-3 border-t border-sidebar-border">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-sidebar-foreground/75 hover:bg-white/5 hover:text-white transition"
          >
            <LogOut className="h-4 w-4" />
            {!collapsed && "Sign out"}
          </button>
        </div>
      </aside>

      {/* Mobile sidebar drawer */}
      {mobileOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 z-40 bg-primary/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="lg:hidden fixed inset-y-0 left-0 z-50 w-72 bg-sidebar text-sidebar-foreground flex flex-col">
            <div className="flex items-center gap-2 px-5 h-16 border-b border-sidebar-border">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-accent text-accent-foreground">
                <Building2 className="h-5 w-5" />
              </div>
              <span className="font-display text-lg font-bold tracking-tight text-white">EstateFlow</span>
            </div>
            <nav className="flex-1 px-3 py-4 space-y-1">
              {NAV.map((item) => {
                const Icon = item.icon;
                const isActive = active === item.key;
                return (
                  <button
                    key={item.key}
                    onClick={() => { onChange(item.key); setMobileOpen(false); }}
                    className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                      isActive
                        ? "bg-accent text-accent-foreground"
                        : "text-sidebar-foreground/75 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </button>
                );
              })}
            </nav>
            <div className="p-3 border-t border-sidebar-border">
              <button
                onClick={onLogout}
                className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-sidebar-foreground/75 hover:bg-white/5 hover:text-white"
              >
                <LogOut className="h-4 w-4" /> Sign out
              </button>
            </div>
          </aside>
        </>
      )}

      {/* Main */}
      <div className={`transition-all duration-300 ${collapsed ? "lg:pl-20" : "lg:pl-64"}`}>
        {/* Top navbar */}
        <header className="sticky top-0 z-20 bg-background/85 backdrop-blur-xl border-b border-border">
          <div className="flex items-center gap-3 px-4 sm:px-6 h-16">
            <button
              className="lg:hidden grid h-9 w-9 place-items-center rounded-lg hover:bg-secondary"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div className="lg:hidden flex items-center gap-2">
              <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground">
                <Building2 className="h-4 w-4" />
              </div>
              <span className="font-display font-bold">EstateFlow</span>
            </div>

            <div className="hidden md:flex flex-1 max-w-xl">
              <div className="relative w-full">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search properties, leads, clients…"
                  className="w-full rounded-xl border border-input bg-secondary/60 pl-10 pr-4 py-2 text-sm outline-none focus:bg-background focus:border-accent focus:ring-2 focus:ring-accent/20 transition"
                />
              </div>
            </div>

            <div className="flex-1 md:hidden" />

            <div className="flex items-center gap-2 sm:gap-3 ml-auto">
              <button className="relative grid h-9 w-9 place-items-center rounded-lg hover:bg-secondary transition" aria-label="Notifications">
                <Bell className="h-4.5 w-4.5" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-emerald" />
              </button>
              <div className="hidden sm:flex items-center gap-2.5 pl-2 border-l border-border">
                <div className="text-right leading-tight">
                  <div className="text-xs font-semibold">Admin User</div>
                  <div className="text-[10px] text-muted-foreground">Senior Broker</div>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&h=80&q=80"
                  alt="Avatar"
                  className="h-9 w-9 rounded-full object-cover ring-2 ring-background"
                />
              </div>
            </div>
          </div>
        </header>

        <main className="px-4 sm:px-6 lg:px-8 py-6 lg:py-8 max-w-[1600px] mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
