import { useState } from "react";
import { Login } from "./Login";
import { Shell, type TabKey } from "./Shell";
import { Overview } from "./Overview";
import { Properties } from "./Properties";
import { Leads } from "./Leads";
import { Clients } from "./Clients";
import { Pipeline } from "./Pipeline";
import { Marketing } from "./Marketing";
import { Analytics } from "./Analytics";
import { CalendarView } from "./Calendar";

export function EstateApp() {
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState<TabKey>("overview");

  if (!authed) return <Login onSuccess={() => setAuthed(true)} />;

  return (
    <Shell active={tab} onChange={setTab} onLogout={() => setAuthed(false)}>
      {tab === "overview" && <Overview />}
      {tab === "properties" && <Properties />}
      {tab === "leads" && <Leads />}
      {tab === "clients" && <Clients />}
      {tab === "deals" && <Pipeline />}
      {tab === "marketing" && <Marketing />}
      {tab === "analytics" && <Analytics />}
      {tab === "calendar" && <CalendarView />}
    </Shell>
  );
}
