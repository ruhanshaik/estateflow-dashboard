import { useState, type DragEvent } from "react";
import { GripVertical } from "lucide-react";
import { Card, PageHeader } from "./ui";
import { initialDeals, formatCurrency, type Deal, type DealStage } from "@/lib/mock-data";

const STAGES: DealStage[] = ["New Lead", "Property Visit", "Negotiation", "Contract", "Closed"];
const STAGE_COLORS: Record<DealStage, string> = {
  "New Lead": "bg-accent",
  "Property Visit": "bg-warning",
  "Negotiation": "bg-chart-5",
  "Contract": "bg-primary",
  "Closed": "bg-emerald",
};

export function Pipeline() {
  const [deals, setDeals] = useState<Deal[]>(initialDeals);
  const [dragId, setDragId] = useState<string | null>(null);
  const [overStage, setOverStage] = useState<DealStage | null>(null);

  const onDragStart = (e: DragEvent, id: string) => {
    setDragId(id);
    e.dataTransfer.effectAllowed = "move";
  };
  const onDragOver = (e: DragEvent, stage: DealStage) => {
    e.preventDefault();
    setOverStage(stage);
  };
  const onDrop = (stage: DealStage) => {
    if (!dragId) return;
    setDeals((prev) => prev.map((d) => (d.id === dragId ? { ...d, stage } : d)));
    setDragId(null);
    setOverStage(null);
  };

  const totalValue = deals.reduce((s, d) => s + d.value, 0);
  const closedValue = deals.filter((d) => d.stage === "Closed").reduce((s, d) => s + d.value, 0);

  return (
    <div>
      <PageHeader
        title="Deals Pipeline"
        subtitle={`${deals.length} active deals · ${formatCurrency(totalValue)} total · ${formatCurrency(closedValue)} closed`}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4 overflow-x-auto pb-2">
        {STAGES.map((stage) => {
          const stageDeals = deals.filter((d) => d.stage === stage);
          const stageVal = stageDeals.reduce((s, d) => s + d.value, 0);
          const isOver = overStage === stage;
          return (
            <div
              key={stage}
              onDragOver={(e) => onDragOver(e, stage)}
              onDragLeave={() => setOverStage(null)}
              onDrop={() => onDrop(stage)}
              className={`rounded-2xl bg-secondary/40 border-2 p-3 min-w-[260px] transition ${
                isOver ? "border-accent bg-accent/5" : "border-transparent"
              }`}
            >
              <div className="flex items-center justify-between px-1 mb-3">
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${STAGE_COLORS[stage]}`} />
                  <span className="font-display font-bold text-sm">{stage}</span>
                  <span className="text-[11px] font-semibold text-muted-foreground bg-background px-1.5 py-0.5 rounded-full">
                    {stageDeals.length}
                  </span>
                </div>
              </div>
              <div className="text-[11px] text-muted-foreground mb-3 px-1">
                {formatCurrency(stageVal)}
              </div>

              <div className="space-y-2.5 min-h-[120px]">
                {stageDeals.map((d) => (
                  <div
                    key={d.id}
                    draggable
                    onDragStart={(e) => onDragStart(e, d.id)}
                    className={`group cursor-grab active:cursor-grabbing ${dragId === d.id ? "opacity-40" : ""}`}
                  >
                    <Card className="p-3 hover:shadow-glow transition">
                      <div className="flex items-start gap-2">
                        <GripVertical className="h-4 w-4 text-muted-foreground/40 mt-0.5 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="text-xs text-muted-foreground">{d.client}</div>
                          <div className="font-semibold text-sm truncate mt-0.5">{d.property}</div>
                          <div className="mt-2 font-display font-bold text-emerald">{formatCurrency(d.value)}</div>
                        </div>
                      </div>
                    </Card>
                  </div>
                ))}
                {stageDeals.length === 0 && (
                  <div className="text-center text-[11px] text-muted-foreground py-6 rounded-xl border-2 border-dashed border-border">
                    Drop deals here
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
