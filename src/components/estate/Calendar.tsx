import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Badge, Button, Card, Field, Input, Modal, PageHeader, Select } from "./ui";
import { initialEvents, type CalendarEvent } from "@/lib/mock-data";

const TYPE_TONE: Record<CalendarEvent["type"], "info" | "success" | "danger"> = {
  Visit: "info",
  Meeting: "success",
  Deadline: "danger",
};

export function CalendarView() {
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  const [cursor, setCursor] = useState(() => {
    const t = new Date();
    return new Date(t.getFullYear(), t.getMonth(), 1);
  });
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", date: new Date().toISOString().slice(0, 10), time: "10:00 AM", type: "Visit" as CalendarEvent["type"] });

  const monthLabel = cursor.toLocaleString(undefined, { month: "long", year: "numeric" });
  const todayISO = new Date().toISOString().slice(0, 10);

  const days = useMemo(() => {
    const year = cursor.getFullYear();
    const month = cursor.getMonth();
    const firstDay = new Date(year, month, 1);
    const startOffset = firstDay.getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    const cells: { date: string | null; day: number | null }[] = [];
    for (let i = 0; i < startOffset; i++) cells.push({ date: null, day: null });
    for (let d = 1; d <= lastDate; d++) {
      const dt = new Date(year, month, d);
      cells.push({ date: dt.toISOString().slice(0, 10), day: d });
    }
    while (cells.length % 7 !== 0) cells.push({ date: null, day: null });
    return cells;
  }, [cursor]);

  const submit = () => {
    if (!form.title) return;
    setEvents([
      ...events,
      { id: `e${Date.now()}`, title: form.title, date: form.date, time: form.time, type: form.type },
    ]);
    setOpen(false);
    setForm({ title: "", date: todayISO, time: "10:00 AM", type: "Visit" });
  };

  const upcoming = [...events]
    .filter((e) => e.date >= todayISO)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 5);

  return (
    <div>
      <PageHeader
        title="Calendar"
        subtitle="Visits, client meetings, and contract deadlines at a glance."
        action={<Button onClick={() => setOpen(true)}><Plus className="h-4 w-4" /> Add Event</Button>}
      />

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
        <Card className="xl:col-span-3 p-4 sm:p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-bold text-lg">{monthLabel}</h3>
            <div className="flex items-center gap-1">
              <button onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))} className="h-8 w-8 grid place-items-center rounded-lg hover:bg-secondary"><ChevronLeft className="h-4 w-4" /></button>
              <button onClick={() => { const t = new Date(); setCursor(new Date(t.getFullYear(), t.getMonth(), 1)); }} className="h-8 px-3 text-xs font-semibold rounded-lg hover:bg-secondary">Today</button>
              <button onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))} className="h-8 w-8 grid place-items-center rounded-lg hover:bg-secondary"><ChevronRight className="h-4 w-4" /></button>
            </div>
          </div>

          <div className="overflow-x-auto scrollbar-thin">
            <div className="min-w-[640px]">
              <div className="grid grid-cols-7 mb-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                  <div key={d} className="text-[11px] uppercase font-semibold text-muted-foreground text-center py-2">{d}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1.5">
                {days.map((cell, i) => {
                  const dayEvents = cell.date ? events.filter((e) => e.date === cell.date) : [];
                  const isToday = cell.date === todayISO;
                  return (
                    <div
                      key={i}
                      className={`min-h-[88px] rounded-xl p-1.5 border transition ${
                        cell.date
                          ? isToday
                            ? "border-accent bg-accent/5"
                            : "border-border bg-background hover:border-accent/40"
                          : "border-transparent"
                      }`}
                    >
                      {cell.day && (
                        <div className={`text-xs font-semibold mb-1 ${isToday ? "text-accent" : "text-foreground/70"}`}>
                          {cell.day}
                        </div>
                      )}
                      <div className="space-y-1">
                        {dayEvents.slice(0, 2).map((e) => (
                          <div
                            key={e.id}
                            className={`truncate rounded-md px-1.5 py-0.5 text-[10px] font-semibold ${
                              e.type === "Visit" ? "bg-accent/15 text-accent" :
                              e.type === "Meeting" ? "bg-emerald/15 text-emerald" :
                              "bg-destructive/15 text-destructive"
                            }`}
                          >
                            {e.title}
                          </div>
                        ))}
                        {dayEvents.length > 2 && (
                          <div className="text-[10px] text-muted-foreground px-1">+{dayEvents.length - 2} more</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-5 h-fit">
          <h3 className="font-display font-bold mb-4">Upcoming</h3>
          <div className="space-y-3">
            {upcoming.length === 0 && <div className="text-xs text-muted-foreground">Nothing scheduled.</div>}
            {upcoming.map((e) => (
              <div key={e.id} className="flex items-start gap-3 pb-3 border-b border-border last:border-0 last:pb-0">
                <div className="rounded-lg bg-secondary text-center px-2 py-1 min-w-[52px]">
                  <div className="text-[10px] uppercase font-semibold text-muted-foreground">
                    {new Date(e.date).toLocaleString(undefined, { month: "short" })}
                  </div>
                  <div className="font-display font-bold text-base">{new Date(e.date).getDate()}</div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm truncate">{e.title}</div>
                  <div className="text-xs text-muted-foreground">{e.time}</div>
                  <div className="mt-1.5"><Badge tone={TYPE_TONE[e.type]}>{e.type}</Badge></div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Add Event"
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="emerald" onClick={submit}>Save Event</Button>
          </>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2"><Field label="Title"><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Property visit – 123 Main St" /></Field></div>
          <Field label="Date"><Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} /></Field>
          <Field label="Time"><Input value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} placeholder="10:00 AM" /></Field>
          <div className="sm:col-span-2">
            <Field label="Type">
              <Select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as CalendarEvent["type"] })}>
                <option>Visit</option><option>Meeting</option><option>Deadline</option>
              </Select>
            </Field>
          </div>
        </div>
      </Modal>
    </div>
  );
}
