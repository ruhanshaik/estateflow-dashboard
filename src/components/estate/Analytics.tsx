import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";
import { Clock, DollarSign, MapPin } from "lucide-react";
import { Card, PageHeader } from "./ui";
import { revenueGrowth, leadSources, propertyViews } from "@/lib/mock-data";

const COLORS = ["#3b82f6", "#10b981", "#1e3a8a", "#f59e0b"];

export function Analytics() {
  const metrics = [
    { label: "Avg Days to Sell", value: "38", icon: Clock, sub: "↓ 6 days vs last quarter" },
    { label: "Cost per Lead", value: "$24.80", icon: DollarSign, sub: "↓ 12% efficient" },
    { label: "Best Performing City", value: "Miami", icon: MapPin, sub: "28 active listings" },
  ];

  return (
    <div>
      <PageHeader title="Analytics" subtitle="Insights into revenue, lead sources, and property performance." />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
        {metrics.map((m) => {
          const Icon = m.icon;
          return (
            <Card key={m.label} className="p-5">
              <div className="flex items-center justify-between">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald/15 text-emerald">
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-3 font-display text-2xl font-bold">{m.value}</div>
              <div className="text-xs text-muted-foreground">{m.label}</div>
              <div className="text-[11px] text-emerald mt-1.5 font-semibold">{m.sub}</div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Card className="xl:col-span-2 p-5">
          <h3 className="font-display font-bold mb-1">Revenue Growth</h3>
          <p className="text-xs text-muted-foreground mb-4">In millions USD</p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueGrowth} margin={{ left: -10, right: 8, top: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }} formatter={(v) => `$${v}M`} />
                <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: "#10b981" }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="font-display font-bold mb-1">Lead Sources</h3>
          <p className="text-xs text-muted-foreground mb-4">All channels</p>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={leadSources} dataKey="value" nameKey="name" innerRadius={45} outerRadius={80} paddingAngle={3}>
                  {leadSources.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {leadSources.map((c, i) => (
              <div key={c.name} className="flex items-center gap-2 text-xs">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                <span className="text-foreground/80">{c.name}</span>
                <span className="ml-auto font-semibold">{c.value}%</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="xl:col-span-3 p-5">
          <h3 className="font-display font-bold mb-1">Property Views</h3>
          <p className="text-xs text-muted-foreground mb-4">Top performers, last 30 days</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={propertyViews} margin={{ left: -10, right: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="property" tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }} cursor={{ fill: "#f1f5f9" }} />
                <Bar dataKey="views" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}
