import {
  Building2, TrendingUp, Users, CheckCircle2, DollarSign, CalendarClock, ArrowUpRight,
} from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";
import { Card } from "./ui";
import { leadsOverTime, salesByType, listingsByCity } from "@/lib/mock-data";

const COLORS = ["#3b82f6", "#10b981", "#1e3a8a", "#f59e0b", "#a855f7"];

const KPIS = [
  { label: "Total Properties", value: "248", delta: "+12", icon: Building2, tone: "accent" },
  { label: "Active Listings", value: "156", delta: "+8", icon: TrendingUp, tone: "emerald" },
  { label: "New Leads (Month)", value: "67", delta: "+24%", icon: Users, tone: "accent" },
  { label: "Deals Closed", value: "31", delta: "+5", icon: CheckCircle2, tone: "emerald" },
  { label: "Revenue (Quarter)", value: "$12.8M", delta: "+18%", icon: DollarSign, tone: "accent" },
  { label: "Upcoming Visits", value: "14", delta: "this week", icon: CalendarClock, tone: "emerald" },
];

export function Overview() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
          Welcome back, Admin 👋
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Here's what's happening across your portfolio today.
        </p>
      </div>

      {/* KPI grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        {KPIS.map((k) => {
          const Icon = k.icon;
          const isEmerald = k.tone === "emerald";
          return (
            <Card key={k.label} className="p-4 hover:shadow-glow hover:-translate-y-0.5 transition-all duration-200">
              <div className="flex items-start justify-between">
                <div className={`grid h-9 w-9 place-items-center rounded-xl ${isEmerald ? "bg-emerald/15 text-emerald" : "bg-accent/15 text-accent"}`}>
                  <Icon className="h-4.5 w-4.5" />
                </div>
                <span className={`text-[11px] font-semibold inline-flex items-center gap-0.5 ${isEmerald ? "text-emerald" : "text-accent"}`}>
                  <ArrowUpRight className="h-3 w-3" /> {k.delta}
                </span>
              </div>
              <div className="mt-3 font-display text-2xl font-bold tracking-tight">{k.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{k.label}</div>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Card className="xl:col-span-2 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-display font-bold">Leads Over Time</h3>
              <p className="text-xs text-muted-foreground">Last 6 months</p>
            </div>
            <span className="text-xs font-semibold text-emerald inline-flex items-center gap-1">
              <ArrowUpRight className="h-3 w-3" /> +28.4%
            </span>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={leadsOverTime} margin={{ left: -10, right: 8, top: 8 }}>
                <defs>
                  <linearGradient id="leadsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }} />
                <Line type="monotone" dataKey="leads" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: "#3b82f6" }} activeDot={{ r: 6 }} fill="url(#leadsGrad)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-5">
          <div className="mb-4">
            <h3 className="font-display font-bold">Listings by City</h3>
            <p className="text-xs text-muted-foreground">Current distribution</p>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={listingsByCity} dataKey="value" nameKey="city" cx="50%" cy="50%" innerRadius={50} outerRadius={90} paddingAngle={3}>
                  {listingsByCity.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {listingsByCity.map((c, i) => (
              <div key={c.city} className="flex items-center gap-2 text-xs">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                <span className="text-foreground/80">{c.city}</span>
                <span className="ml-auto font-semibold">{c.value}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="xl:col-span-3 p-5">
          <div className="mb-4">
            <h3 className="font-display font-bold">Sales by Property Type</h3>
            <p className="text-xs text-muted-foreground">Year to date</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesByType} margin={{ left: -10, right: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="type" tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }} cursor={{ fill: "#f1f5f9" }} />
                <Bar dataKey="sales" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}
