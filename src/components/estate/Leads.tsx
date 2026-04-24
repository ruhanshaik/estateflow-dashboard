import { useState } from "react";
import { Flame, Mail, Phone, Plus, TrendingUp, Users } from "lucide-react";
import { Badge, Button, Card, Field, Input, Modal, PageHeader, Select } from "./ui";
import { initialLeads, formatCurrency, type Lead, type LeadStatus } from "@/lib/mock-data";

const STATUS_TONE: Record<LeadStatus, "info" | "warning" | "success"> = {
  New: "info",
  Contacted: "warning",
  Qualified: "success",
};

export function Leads() {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", budget: "", interestedIn: "", status: "New" as LeadStatus,
  });

  const newCount = leads.filter((l) => l.status === "New").length;
  const hotCount = leads.filter((l) => l.hot).length;
  const conversion = Math.round(
    (leads.filter((l) => l.status === "Qualified").length / leads.length) * 100,
  );

  const stats = [
    { label: "New Leads", value: newCount, icon: Users, tone: "accent" },
    { label: "Hot Leads", value: hotCount, icon: Flame, tone: "danger" },
    { label: "Conversion Rate", value: `${conversion}%`, icon: TrendingUp, tone: "emerald" },
  ];

  const submit = () => {
    if (!form.name || !form.email) return;
    setLeads([
      {
        id: `l${Date.now()}`,
        name: form.name,
        email: form.email,
        phone: form.phone || "—",
        budget: Number(form.budget) || 0,
        interestedIn: form.interestedIn || "—",
        status: form.status,
      },
      ...leads,
    ]);
    setOpen(false);
    setForm({ name: "", email: "", phone: "", budget: "", interestedIn: "", status: "New" });
  };

  return (
    <div>
      <PageHeader
        title="Leads"
        subtitle="Track and nurture every prospect from first touch to qualified."
        action={<Button onClick={() => setOpen(true)}><Plus className="h-4 w-4" /> Add Lead</Button>}
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
        {stats.map((s) => {
          const Icon = s.icon;
          const ringMap: Record<string, string> = {
            accent: "bg-accent/15 text-accent",
            danger: "bg-destructive/15 text-destructive",
            emerald: "bg-emerald/15 text-emerald",
          };
          return (
            <Card key={s.label} className="p-5 flex items-center gap-4">
              <div className={`grid h-12 w-12 place-items-center rounded-2xl ${ringMap[s.tone]}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <div className="font-display text-2xl font-bold">{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Desktop table */}
      <Card className="hidden md:block overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary/50 text-muted-foreground text-xs uppercase tracking-wide">
              <tr>
                <th className="text-left font-semibold px-5 py-3">Name</th>
                <th className="text-left font-semibold px-5 py-3">Email</th>
                <th className="text-left font-semibold px-5 py-3">Phone</th>
                <th className="text-left font-semibold px-5 py-3">Budget</th>
                <th className="text-left font-semibold px-5 py-3">Interested In</th>
                <th className="text-left font-semibold px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((l) => (
                <tr key={l.id} className="border-t border-border hover:bg-secondary/30 transition">
                  <td className="px-5 py-3 font-semibold flex items-center gap-2">
                    {l.hot && <Flame className="h-3.5 w-3.5 text-destructive" />}
                    {l.name}
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">{l.email}</td>
                  <td className="px-5 py-3 text-muted-foreground">{l.phone}</td>
                  <td className="px-5 py-3 font-semibold">{formatCurrency(l.budget)}</td>
                  <td className="px-5 py-3 text-muted-foreground">{l.interestedIn}</td>
                  <td className="px-5 py-3"><Badge tone={STATUS_TONE[l.status]}>{l.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {leads.map((l) => (
          <Card key={l.id} className="p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="font-semibold flex items-center gap-1.5">
                {l.hot && <Flame className="h-3.5 w-3.5 text-destructive" />}
                {l.name}
              </div>
              <Badge tone={STATUS_TONE[l.status]}>{l.status}</Badge>
            </div>
            <div className="mt-2 space-y-1 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5"><Mail className="h-3 w-3" />{l.email}</div>
              <div className="flex items-center gap-1.5"><Phone className="h-3 w-3" />{l.phone}</div>
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-xs">
              <span className="text-muted-foreground">{l.interestedIn}</span>
              <span className="font-bold">{formatCurrency(l.budget)}</span>
            </div>
          </Card>
        ))}
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Add new lead"
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="emerald" onClick={submit}>Save Lead</Button>
          </>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Full name"><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></Field>
          <Field label="Email"><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></Field>
          <Field label="Phone"><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></Field>
          <Field label="Budget (USD)"><Input type="number" value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} /></Field>
          <div className="sm:col-span-2">
            <Field label="Interested in"><Input value={form.interestedIn} onChange={(e) => setForm({ ...form, interestedIn: e.target.value })} placeholder="Apartment, Gandhi Nagar" /></Field>
          </div>
          <Field label="Status">
            <Select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as LeadStatus })}>
              <option>New</option><option>Contacted</option><option>Qualified</option>
            </Select>
          </Field>
        </div>
      </Modal>
    </div>
  );
}
