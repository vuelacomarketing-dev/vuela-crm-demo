import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, MessageSquare, Users, KanbanSquare, CalendarDays, CreditCard,
  Globe2, Star, Workflow, Search, Bell, Plus, MoreHorizontal, Send, Phone, Mail,
  Clock, CheckCircle2, TrendingUp, DollarSign, Filter, ChevronDown, Zap
} from "lucide-react";
import "./index.css";

const menu = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "conversations", label: "Conversations", icon: MessageSquare },
  { key: "contacts", label: "Contacts", icon: Users },
  { key: "opportunities", label: "Opportunities", icon: KanbanSquare },
  { key: "calendars", label: "Calendars", icon: CalendarDays },
  { key: "payments", label: "Payments", icon: CreditCard },
  { key: "sites", label: "Sites", icon: Globe2 },
  { key: "reputation", label: "Reputation", icon: Star },
  { key: "automations", label: "Automations", icon: Workflow },
];

const contacts = [
  { name: "Maria Lopez", phone: "(541) 555-0184", email: "maria@example.com", tag: "New Website Lead", value: "$1,250" },
  { name: "James Carter", phone: "(503) 555-0138", email: "james@example.com", tag: "Quote Requested", value: "$860" },
  { name: "Avery Mitchell", phone: "(971) 555-0199", email: "avery@example.com", tag: "Booked", value: "$2,400" },
  { name: "Sofia Rivera", phone: "(458) 555-0172", email: "sofia@example.com", tag: "Follow Up", value: "$675" },
];

const convos = [
  { name: "Maria Lopez", message: "Hi, I need help getting a quote this week.", time: "2m", active: true },
  { name: "James Carter", message: "Can someone call me today?", time: "18m" },
  { name: "Sofia Rivera", message: "Thursday afternoon works for me.", time: "1h" },
  { name: "Avery Mitchell", message: "Thank you, I just booked online.", time: "3h" },
];

const pipeline = [
  { title: "New Leads", amount: "$4,850", items: ["Maria Lopez", "Daniel Nguyen", "Northwest Dental"] },
  { title: "Contacted", amount: "$3,120", items: ["James Carter", "Pine Street Auto"] },
  { title: "Quoted", amount: "$6,430", items: ["Avery Mitchell", "Riverbend Clinic", "Oak Fuel Co"] },
  { title: "Booked", amount: "$7,900", items: ["Sofia Rivera", "Summit Builders"] },
];

const payments = [
  { invoice: "INV-1048", customer: "Summit Builders", status: "Paid", amount: "$1,450" },
  { invoice: "INV-1049", customer: "Maria Lopez", status: "Draft", amount: "$625" },
  { invoice: "INV-1050", customer: "Riverbend Clinic", status: "Due", amount: "$2,100" },
  { invoice: "INV-1051", customer: "Pine Street Auto", status: "Paid", amount: "$880" },
];

const reviews = [
  { name: "Avery Mitchell", rating: 5, text: "Fast response and very easy to schedule." },
  { name: "Sofia Rivera", rating: 5, text: "The follow up was clear and professional." },
  { name: "James Carter", rating: 4, text: "Helpful team and simple process." },
];

function App() {
  const [active, setActive] = useState("dashboard");
  const page = useMemo(() => menu.find((m) => m.key === active), [active]);
  const PageIcon = page?.icon || LayoutDashboard;

  return (
    <div className="min-h-screen bg-[#f6f8fb] text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-[1500px] overflow-hidden bg-white shadow-2xl">
        <aside className="hidden w-[248px] shrink-0 border-r border-slate-200 bg-white lg:block">
          <div className="flex h-16 items-center gap-3 border-b border-slate-100 px-5">
            <VuelaLogo />
            <div><p className="text-sm font-bold tracking-wide">VUELA CO</p><p className="text-[11px] text-slate-500">CRM Demo</p></div>
          </div>
          <div className="p-3">
            <div className="mb-4 rounded-2xl border border-slate-200 bg-slate-50 p-3">
              <p className="text-xs font-semibold text-slate-500">Demo Account</p><p className="mt-1 text-sm font-semibold">Sample Business</p>
            </div>
            <nav className="space-y-1">
              {menu.map((item) => {
                const Icon = item.icon; const selected = active === item.key;
                return <button key={item.key} onClick={() => setActive(item.key)} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${selected ? "bg-[#007e6f] text-white shadow-sm" : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"}`}><Icon className="h-4 w-4" />{item.label}</button>;
              })}
            </nav>
          </div>
        </aside>
        <main className="min-w-0 flex-1">
          <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur md:px-6">
            <div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#007e6f]/10 text-[#007e6f]"><PageIcon className="h-5 w-5" /></div><div><h1 className="text-base font-bold md:text-lg">{page?.label}</h1><p className="hidden text-xs text-slate-500 sm:block">Interactive VUELA CRM sandbox with sample data</p></div></div>
            <div className="flex items-center gap-2"><div className="hidden items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 md:flex"><Search className="h-4 w-4 text-slate-400" /><span className="text-sm text-slate-400">Search demo</span></div><Button variant="outline"><Bell className="h-4 w-4" /></Button><Button><Plus className="mr-2 h-4 w-4" />Add</Button></div>
          </header>
          <div className="border-b border-slate-200 bg-white px-4 py-3 lg:hidden"><div className="flex gap-2 overflow-x-auto pb-1">{menu.map((item) => <button key={item.key} onClick={() => setActive(item.key)} className={`shrink-0 rounded-full px-3 py-2 text-xs font-semibold ${active === item.key ? "bg-[#007e6f] text-white" : "bg-slate-100 text-slate-600"}`}>{item.label}</button>)}</div></div>
          <AnimatePresence mode="wait"><motion.div key={active} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="p-4 md:p-6">
            {active === "dashboard" && <Dashboard />}{active === "conversations" && <Conversations />}{active === "contacts" && <Contacts />}{active === "opportunities" && <Opportunities />}{active === "calendars" && <Calendars />}{active === "payments" && <Payments />}{active === "sites" && <Sites />}{active === "reputation" && <Reputation />}{active === "automations" && <Automations />}
          </motion.div></AnimatePresence>
        </main>
      </div>
    </div>
  );
}

function Dashboard() { return <div className="space-y-5"><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"><Stat title="New Leads" value="42" change="18% this month" icon={Users} /><Stat title="Booked Jobs" value="19" change="12 scheduled" icon={CalendarDays} /><Stat title="Pipeline Value" value="$22,300" change="Sample revenue" icon={DollarSign} /><Stat title="Response Time" value="1m 14s" change="Auto reply active" icon={Clock} /></div><div className="grid gap-5 xl:grid-cols-[1.25fr_0.75fr]"><Card><SectionHeader title="Lead Activity" action="Last 30 days" /><div className="mt-6 flex h-64 items-end gap-3">{[35,55,42,70,50,86,62,95,74,88,68,100].map((h,i)=><div key={i} className="flex-1 rounded-t-xl bg-[#007e6f]/80" style={{height:`${h}%`}} />)}</div></Card><Card><SectionHeader title="Today" action="Live demo" /><div className="mt-5 space-y-3"><Activity icon={MessageSquare} text="Auto reply sent to Maria Lopez" /><Activity icon={Phone} text="Missed call text back triggered" /><Activity icon={CalendarDays} text="Avery booked an appointment" /><Activity icon={Star} text="Review request sent" /></div></Card></div></div>; }
function Conversations() { return <div className="grid min-h-[680px] gap-4 xl:grid-cols-[300px_1fr_320px]"><Card flush><div className="border-b p-4"><SectionHeader title="Inbox" action="4 open" /></div>{convos.map((c)=><div key={c.name} className={`border-b p-4 ${c.active ? "bg-[#007e6f]/5" : "bg-white"}`}><div className="flex justify-between"><p className="font-semibold">{c.name}</p><p className="text-xs text-slate-400">{c.time}</p></div><p className="mt-1 line-clamp-1 text-sm text-slate-500">{c.message}</p></div>)}</Card><Card flush><div className="flex h-full flex-col"><div className="border-b p-4"><p className="font-bold">Maria Lopez</p><p className="text-xs text-slate-500">Website Lead · SMS Conversation</p></div><div className="flex-1 space-y-4 bg-slate-50 p-5"><Bubble left text="Hi, I need help getting a quote this week." /><Bubble text="Thanks for reaching out. We received your request and can help you get scheduled." /><Bubble left text="Great, can someone call me today?" /><Bubble text="Absolutely. A team member can call shortly. What time works best?" /></div><div className="border-t bg-white p-4"><div className="flex items-center gap-2 rounded-2xl border border-slate-200 p-2"><span className="flex-1 px-2 text-sm text-slate-400">Type a reply...</span><Button><Send className="h-4 w-4" /></Button></div></div></div></Card><Card><SectionHeader title="Contact Details" action="Lead" /><div className="mt-5 space-y-4"><Detail label="Phone" value="(541) 555-0184" /><Detail label="Email" value="maria@example.com" /><Detail label="Source" value="Website Form" /><Detail label="Pipeline" value="New Leads" /></div><Button red className="mt-6 w-full">Create Opportunity</Button></Card></div>; }
function Contacts() { return <TablePage title="Contacts" subtitle="Manage leads, customers, tags, and contact history." rows={contacts} />; }
function Opportunities() { return <div className="space-y-4"><div className="flex flex-col justify-between gap-3 md:flex-row md:items-center"><div><h2 className="text-xl font-bold">Sales Pipeline</h2><p className="text-sm text-slate-500">Drag style sample board with fake opportunity data.</p></div><Button variant="outline"><Filter className="mr-2 h-4 w-4" /> Pipeline <ChevronDown className="ml-2 h-4 w-4" /></Button></div><div className="grid gap-4 xl:grid-cols-4">{pipeline.map((col)=><Card key={col.title} className="bg-slate-50"><div className="mb-4 flex items-center justify-between"><div><p className="font-bold">{col.title}</p><p className="text-xs text-slate-500">{col.amount}</p></div><MoreHorizontal className="h-4 w-4 text-slate-400" /></div><div className="space-y-3">{col.items.map((name,i)=><div key={name} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><p className="font-semibold">{name}</p><p className="mt-1 text-xs text-slate-500">Follow up task · {i+1} day ago</p><div className="mt-3 h-1.5 rounded-full bg-[#007e6f]/20"><div className="h-full rounded-full bg-[#007e6f]" style={{width:`${45+i*18}%`}} /></div></div>)}</div></Card>)}</div></div>; }
function Calendars() { const events = ["Discovery Call", "Quote Review", "Client Onboarding", "Follow Up Call", "Website Strategy", "CRM Training"]; return <Card><SectionHeader title="Calendar" action="April 2026" /><div className="mt-5 grid grid-cols-7 gap-2 text-center text-xs font-semibold text-slate-500">{["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d=><div key={d}>{d}</div>)}</div><div className="mt-3 grid grid-cols-7 gap-2">{Array.from({length:35}).map((_,i)=><div key={i} className="min-h-24 rounded-2xl border border-slate-200 bg-white p-2"><p className="text-xs font-semibold text-slate-400">{i+1}</p>{[3,6,10,15,18,23,28].includes(i) && <div className="mt-2 rounded-xl bg-[#007e6f]/10 p-2 text-left text-[11px] font-semibold text-[#007e6f]">{events[i%events.length]}</div>}</div>)}</div></Card>; }
function Payments() { return <div className="space-y-5"><div className="grid gap-4 md:grid-cols-3"><Stat title="Paid" value="$12,480" change="This month" icon={CheckCircle2} /><Stat title="Outstanding" value="$3,250" change="3 invoices" icon={Clock} /><Stat title="Drafts" value="5" change="Ready to send" icon={CreditCard} /></div><TablePage title="Invoices" subtitle="Sample invoice and payment tracking." rows={payments.map(p=>({name:p.invoice, phone:p.customer, email:p.status, tag:"Invoice", value:p.amount}))} /></div>; }
function Sites() { return <CardsGrid title="Sites and Funnels" subtitle="Landing pages, forms, funnels, and conversion paths." items={["Website Home", "CRM Demo Page", "Lead Capture Funnel", "Thank You Page", "Booking Form", "Quote Request Form"]} />; }
function Reputation() { return <div className="space-y-5"><div className="grid gap-4 md:grid-cols-3"><Stat title="Average Rating" value="4.9" change="Sample reviews" icon={Star} /><Stat title="Reviews Sent" value="84" change="Automated requests" icon={Send} /><Stat title="SEO Signals" value="Growing" change="Local trust" icon={TrendingUp} /></div><div className="grid gap-4 md:grid-cols-3">{reviews.map(r=><Card key={r.name}><div className="mb-3 text-[#bd0101]">{"★".repeat(r.rating)}</div><p className="text-sm text-slate-600">“{r.text}”</p><p className="mt-4 font-semibold">{r.name}</p></Card>)}</div></div>; }
function Automations() { return <CardsGrid title="Automations" subtitle="Sample workflows that keep leads moving." items={["Instant Lead Reply", "Missed Call Text Back", "No Response Follow Up", "Appointment Reminder", "Review Request", "New Client Onboarding"]} automation />; }
function TablePage({ title, subtitle, rows }) { return <Card flush><div className="flex items-center justify-between border-b p-5"><div><h2 className="text-xl font-bold">{title}</h2><p className="text-sm text-slate-500">{subtitle}</p></div><Button><Plus className="mr-2 h-4 w-4" />New</Button></div><div className="overflow-x-auto"><table className="w-full min-w-[760px] text-sm"><thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500"><tr><th className="p-4">Name</th><th className="p-4">Phone / Customer</th><th className="p-4">Email / Status</th><th className="p-4">Tag</th><th className="p-4 text-right">Value</th></tr></thead><tbody>{rows.map((r)=><tr key={r.name} className="border-t"><td className="p-4 font-semibold">{r.name}</td><td className="p-4 text-slate-600">{r.phone}</td><td className="p-4 text-slate-600">{r.email}</td><td className="p-4"><span className="rounded-full bg-[#007e6f]/10 px-3 py-1 text-xs font-semibold text-[#007e6f]">{r.tag}</span></td><td className="p-4 text-right font-semibold">{r.value}</td></tr>)}</tbody></table></div></Card>; }
function CardsGrid({ title, subtitle, items, automation }) { return <div className="space-y-5"><div><h2 className="text-xl font-bold">{title}</h2><p className="text-sm text-slate-500">{subtitle}</p></div><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{items.map((item)=><Card key={item}><div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#007e6f]/10 text-[#007e6f]">{automation ? <Zap className="h-5 w-5" /> : <Globe2 className="h-5 w-5" />}</div><p className="font-bold">{item}</p><p className="mt-2 text-sm text-slate-500">Demo asset with sample setup and fake data.</p><div className="mt-4 flex items-center justify-between text-xs text-slate-400"><span>Updated today</span><span className="font-semibold text-[#bd0101]">Active</span></div></Card>)}</div></div>; }

function Card({ children, className = "", flush = false }) { return <div className={`rounded-2xl border border-slate-200 bg-white shadow-sm ${className}`}>{flush ? children : <div className="p-5">{children}</div>}</div>; }
function Button({ children, className = "", variant, red, ...props }) { const base = "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition"; const style = variant === "outline" ? "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50" : red ? "bg-[#bd0101] text-white hover:bg-[#9f0101]" : "bg-[#007e6f] text-white hover:bg-[#006b5f]"; return <button className={`${base} ${style} ${className}`} {...props}>{children}</button>; }
function Stat({ title, value, change, icon: Icon }) { return <Card><div className="flex items-start justify-between"><div><p className="text-sm text-slate-500">{title}</p><p className="mt-2 text-2xl font-bold">{value}</p><p className="mt-2 text-xs font-medium text-[#007e6f]">{change}</p></div><div className="rounded-2xl bg-[#007e6f]/10 p-3 text-[#007e6f]"><Icon className="h-5 w-5" /></div></div></Card>; }
function SectionHeader({ title, action }) { return <div className="flex items-center justify-between"><h2 className="font-bold">{title}</h2><span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">{action}</span></div>; }
function Activity({ icon: Icon, text }) { return <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-3"><div className="rounded-xl bg-[#007e6f]/10 p-2 text-[#007e6f]"><Icon className="h-4 w-4" /></div><p className="text-sm text-slate-600">{text}</p></div>; }
function Detail({ label, value }) { return <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3"><p className="text-xs text-slate-500">{label}</p><p className="mt-1 text-sm font-semibold">{value}</p></div>; }
function Bubble({ text, left }) { return <div className={`max-w-[78%] rounded-2xl p-3 text-sm shadow-sm ${left ? "bg-white text-slate-700" : "ml-auto bg-[#007e6f] text-white"}`}>{text}</div>; }
function VuelaLogo() { return <div className="relative flex h-10 w-10 items-center justify-center"><div className="absolute left-0 h-7 w-4 rounded-l-full rounded-tr-lg bg-[#007e6f]" style={{ transform: "skewY(-18deg)" }} /><div className="absolute right-0 h-7 w-4 rounded-r-full rounded-tl-lg bg-[#bd0101]" style={{ transform: "skewY(18deg)" }} /><div className="relative h-4 w-4 rounded-full border-2 border-white bg-slate-900 shadow" /></div>; }

createRoot(document.getElementById("root")).render(<App />);
