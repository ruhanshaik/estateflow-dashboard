import { useState } from "react";
import { Eye, Heart, Mail, Plus, Send } from "lucide-react";
import { Badge, Button, Card, Field, Input, Modal, PageHeader, Select, Textarea } from "./ui";
import { campaigns as seedCampaigns, landingPages, socialPosts, type Campaign } from "@/lib/mock-data";

export function Marketing() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(seedCampaigns);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", subject: "", body: "" });

  const submit = () => {
    if (!form.name) return;
    setCampaigns([
      { id: `cm${Date.now()}`, name: form.name, sent: 0, openRate: 0, clickRate: 0, status: "Draft" },
      ...campaigns,
    ]);
    setOpen(false);
    setForm({ name: "", subject: "", body: "" });
  };

  return (
    <div>
      <PageHeader
        title="Marketing Hub"
        subtitle="Email campaigns, landing pages and social marketing — all in one place."
      />

      {/* Email Campaigns */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display font-bold text-lg">Email Campaigns</h2>
          <Button onClick={() => setOpen(true)}><Plus className="h-4 w-4" /> Create Campaign</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {campaigns.map((c) => (
            <Card key={c.id} className="p-5 hover:shadow-glow transition">
              <div className="flex items-start justify-between mb-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent/15 text-accent">
                  <Mail className="h-5 w-5" />
                </div>
                <Badge tone={c.status === "Active" ? "success" : c.status === "Draft" ? "muted" : "info"}>{c.status}</Badge>
              </div>
              <div className="font-display font-bold truncate">{c.name}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{c.sent.toLocaleString()} sent</div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                <div className="rounded-xl bg-secondary/50 px-3 py-2">
                  <div className="text-[10px] uppercase font-semibold text-muted-foreground">Open</div>
                  <div className="font-display font-bold">{c.openRate}%</div>
                </div>
                <div className="rounded-xl bg-secondary/50 px-3 py-2">
                  <div className="text-[10px] uppercase font-semibold text-muted-foreground">Click</div>
                  <div className="font-display font-bold">{c.clickRate}%</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Landing Pages */}
      <section className="mb-8">
        <h2 className="font-display font-bold text-lg mb-3">Landing Pages</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {landingPages.map((lp) => (
            <Card key={lp.id} className="overflow-hidden group hover:-translate-y-0.5 hover:shadow-glow transition-all">
              <div className="aspect-video relative overflow-hidden">
                <img src={lp.image} alt={lp.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-primary-foreground">
                  <div className="font-display font-bold">{lp.title}</div>
                </div>
              </div>
              <div className="p-3 flex items-center justify-between text-xs">
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Eye className="h-3.5 w-3.5" /> {lp.visits.toLocaleString()} visits
                </span>
                <button className="font-semibold text-accent hover:underline">View</button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Social Posts */}
      <section>
        <h2 className="font-display font-bold text-lg mb-3">Social Media Posts</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {socialPosts.map((p) => (
            <div key={p.id} className="group relative aspect-square rounded-2xl overflow-hidden border border-border">
              <img src={p.image} alt="post" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/0 to-transparent opacity-0 group-hover:opacity-100 transition" />
              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-primary-foreground text-xs opacity-0 group-hover:opacity-100 transition">
                <span className="rounded-full bg-background/20 backdrop-blur px-2 py-0.5 font-semibold">{p.platform}</span>
                <span className="flex items-center gap-1"><Heart className="h-3 w-3 fill-current" />{p.likes.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Create Email Campaign"
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="emerald" onClick={submit}><Send className="h-4 w-4" />Save as Draft</Button>
          </>
        }
      >
        <div className="space-y-4">
          <Field label="Campaign name"><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Summer Listings 2025" /></Field>
          <Field label="Subject line"><Input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder="Just listed: 3 stunning waterfront homes" /></Field>
          <Field label="Audience">
            <Select>
              <option>All subscribers (12,480)</option>
              <option>Hot Leads (74)</option>
              <option>Past Clients (3,210)</option>
            </Select>
          </Field>
          <Field label="Email body"><Textarea rows={5} value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} placeholder="Write your message…" /></Field>
        </div>
      </Modal>
    </div>
  );
}
