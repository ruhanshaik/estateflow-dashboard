import { useState } from "react";
import { MapPin, X } from "lucide-react";
import { Badge, Card, PageHeader } from "./ui";
import { initialClients, initialProperties, formatCurrency, type Client } from "@/lib/mock-data";

export function Clients() {
  const [active, setActive] = useState<Client | null>(null);

  return (
    <div>
      <PageHeader title="Clients" subtitle="Profiles, notes, and history for every relationship." />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {initialClients.map((c) => (
          <button
            key={c.id}
            onClick={() => setActive(c)}
            className="text-left"
          >
            <Card className="p-5 hover:-translate-y-0.5 hover:shadow-glow transition-all duration-200 cursor-pointer">
              <div className="flex items-center gap-3">
                <img src={c.avatar} alt={c.name} className="h-14 w-14 rounded-2xl object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="font-display font-bold truncate">{c.name}</div>
                  <div className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" /> {c.city}
                  </div>
                </div>
                <Badge tone={c.type === "Buying" ? "info" : "success"}>{c.type}</Badge>
              </div>
              <div className="mt-4 rounded-xl bg-secondary/50 px-3 py-2.5">
                <div className="text-[10px] uppercase tracking-wide text-muted-foreground font-semibold">Budget</div>
                <div className="font-semibold text-sm">
                  {formatCurrency(c.budgetMin)} – {formatCurrency(c.budgetMax)}
                </div>
              </div>
            </Card>
          </button>
        ))}
      </div>

      {/* Side panel */}
      {active && (
        <>
          <div className="fixed inset-0 z-40 bg-primary/40 backdrop-blur-sm" onClick={() => setActive(null)} />
          <aside className="fixed inset-y-0 right-0 z-50 w-full sm:w-[440px] bg-card border-l border-border shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
            <div className="px-5 py-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={active.avatar} alt={active.name} className="h-12 w-12 rounded-xl object-cover" />
                <div>
                  <div className="font-display font-bold">{active.name}</div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
                    <Badge tone={active.type === "Buying" ? "info" : "success"}>{active.type}</Badge>
                    <span>· {active.city}</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setActive(null)} className="h-9 w-9 grid place-items-center rounded-lg hover:bg-secondary">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-thin px-5 py-5 space-y-6">
              <section>
                <h4 className="font-display font-bold text-sm mb-2">Budget</h4>
                <Card className="p-4 bg-secondary/40">
                  <div className="font-display text-xl font-bold">
                    {formatCurrency(active.budgetMin)} – {formatCurrency(active.budgetMax)}
                  </div>
                </Card>
              </section>

              <section>
                <h4 className="font-display font-bold text-sm mb-2">Notes</h4>
                <Card className="p-4">
                  <p className="text-sm text-foreground/80 leading-relaxed">{active.notes}</p>
                </Card>
              </section>

              <section>
                <h4 className="font-display font-bold text-sm mb-2">Interaction Timeline</h4>
                <div className="space-y-3">
                  {active.timeline.map((t, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="h-2.5 w-2.5 rounded-full bg-accent ring-4 ring-accent/20" />
                        {i < active.timeline.length - 1 && <div className="w-px flex-1 bg-border mt-1" />}
                      </div>
                      <div className="pb-3">
                        <div className="text-xs text-muted-foreground">{t.date}</div>
                        <div className="text-sm font-medium">{t.text}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h4 className="font-display font-bold text-sm mb-2">Saved Properties</h4>
                <div className="space-y-2">
                  {active.savedProperties.map((pid) => {
                    const p = initialProperties.find((x) => x.id === pid);
                    if (!p) return null;
                    return (
                      <Card key={pid} className="p-2.5 flex items-center gap-3">
                        <img src={p.image} alt={p.title} className="h-12 w-16 rounded-lg object-cover" />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold truncate">{p.title}</div>
                          <div className="text-xs text-muted-foreground truncate">{p.address}</div>
                        </div>
                        <div className="font-display font-bold text-sm">{formatCurrency(p.price)}</div>
                      </Card>
                    );
                  })}
                </div>
              </section>
            </div>
          </aside>
        </>
      )}
    </div>
  );
}
