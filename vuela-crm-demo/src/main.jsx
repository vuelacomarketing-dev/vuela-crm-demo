import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  Rocket,
  LayoutDashboard,
  MessageCircle,
  CalendarDays,
  Users,
  KanbanSquare,
  CreditCard,
  Globe,
  Star,
  Workflow,
  Search,
  Zap,
  Phone,
  Bell,
  HelpCircle,
  Plus,
  Settings,
  MoreVertical,
  Filter,
  Upload,
  ChevronDown,
  Heart,
  MessageSquare,
  Share2,
  Send,
  Mail,
  Clock,
  FileText,
  Folder,
  Wand2,
} from "lucide-react";

const teal = "#007e6f";
const red = "#bd0101";
const blue = "#2563eb";

const mainNav = [
  ["launchpad", "Launchpad", Rocket],
  ["dashboard", "Dashboard", LayoutDashboard],
  ["conversations", "Conversations", MessageCircle],
  ["calendars", "Calendars", CalendarDays],
  ["contacts", "Contacts", Users],
  ["opportunities", "Opportunities", KanbanSquare],
  ["payments", "Payments", CreditCard],
  ["sites", "Sites", Globe],
  ["reputation", "Reputation", Star],
  ["automations", "Automation", Workflow],
];

export default function VuelaCRMReplica() {
  const [page, setPage] = useState("dashboard");
  const [phoneOpen, setPhoneOpen] = useState(false);
  const [incomingCall, setIncomingCall] = useState(false);
  const activeItem = mainNav.find(([key]) => key === page);
  const title = activeItem?.[1] || "Dashboard";

  useEffect(() => {
    const timer = setTimeout(() => {
      setIncomingCall(true);
      setPhoneOpen(true);
    }, 60000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#f3f7fb] text-[#101828]">
      <div className="mx-auto flex min-h-screen max-w-[1600px] bg-white shadow-2xl">
        <aside className="hidden w-[238px] shrink-0 border-r border-[#dfe5ee] bg-white lg:block">
          <div className="flex h-[78px] items-center justify-center border-b border-[#eef2f6]">
            <div className="flex flex-col items-center">
              <VuelaLogo />
              <div className="mt-2 text-center text-[11px] font-bold leading-none">VUELA CO</div>
              <div className="mt-1 text-[10px] text-slate-500">Gresham, Oregon</div>
            </div>
          </div>

          <div className="p-3">
            <div className="mb-4 flex items-center gap-2 rounded-md border border-[#d7dde7] bg-white px-2 py-2 text-sm text-slate-500 shadow-sm">
              <Search className="h-4 w-4" />
              <span className="flex-1">Search</span>
              <span className="rounded bg-slate-100 px-1.5 text-xs">⌘K</span>
              <Zap className="h-4 w-4 text-[#007e6f]" />
            </div>

            <nav className="space-y-1 text-[14px]">
              {mainNav.map(([key, label, Icon]) => {
                const isActive = page === key;
                return (
                  <button
                    key={key}
                    onClick={() => setPage(key)}
                    className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 font-medium transition ${
                      isActive ? "bg-[#eef5f4] text-[#007e6f]" : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          <TopBar title={title} onPhoneClick={() => setPhoneOpen(true)} />
          <div className="lg:hidden border-b border-slate-200 bg-white p-2">
            <div className="flex gap-2 overflow-x-auto">
              {mainNav.map(([key,label]) => <button key={key} onClick={()=>setPage(key)} className={`shrink-0 rounded-full px-3 py-2 text-xs font-semibold ${page===key?'bg-[#007e6f] text-white':'bg-slate-100 text-slate-600'}`}>{label}</button>)}
            </div>
          </div>
          {page === "dashboard" && <Dashboard />}
          {page === "conversations" && <Conversations />}
          {page === "opportunities" && <Opportunities />}
          {page === "calendars" && <Calendars />}
          {page === "payments" && <Payments />}
          {page === "sites" && <Sites />}
          {page === "reputation" && <Reputation />}
          {page === "automations" && <Automations />}
          {page === "contacts" && <Contacts />}
          {page === "launchpad" && <Marketing />}          <PhoneDialer
            open={phoneOpen}
            incoming={incomingCall}
            onClose={() => {
              setPhoneOpen(false);
              setIncomingCall(false);
            }}
            onAnswer={() => setIncomingCall(false)}
          />
        </main>
      </div>
    </div>
  );
}

function TopBar({ title, onPhoneClick }) {
  return (
    <header className="flex h-[70px] items-center justify-between border-b border-[#dfe5ee] bg-white px-5">
      <div className="flex items-center gap-6">
        <h1 className="text-xl font-semibold">{title}</h1>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={onPhoneClick} className="rounded-full transition hover:scale-105"><IconCircle color="#008a63"><Phone className="h-4 w-4" /></IconCircle></button>
        <button className="rounded-full bg-[#5c2dbf] px-4 py-2 text-sm font-bold text-white">Ask AI</button>
        <IconCircle color="#0d9488"><Bell className="h-4 w-4" /></IconCircle>
        <IconCircle color="#f97316"><Bell className="h-4 w-4" /></IconCircle>
        <IconCircle color="#2563eb"><HelpCircle className="h-4 w-4" /></IconCircle>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#69427e] text-xs font-bold text-white">MM</div>
      </div>
    </header>
  );
}

function PageTabs({ items }) {
  return <div className="flex h-[52px] items-center gap-7 border-b border-[#dfe5ee] bg-white px-5 text-sm font-semibold text-slate-600">{items.map((item,i)=><div key={item} className={`${i===0?'border-b-2 border-[#007e6f] text-[#007e6f]':''} flex h-full items-center`}>{item}</div>)}</div>;
}

function Dashboard() {
  return (
    <div>
      <PageTabs items={["Overview"]} />
      <div className="space-y-4 bg-[#f3f7fb] p-5">
        <div className="flex justify-end gap-3">
          <ButtonGhost>Last 30 Days <ChevronDown className="h-4 w-4" /></ButtonGhost>
          <ButtonGhost>Edit Dashboard</ButtonGhost>
        </div>
        <div className="grid gap-4 xl:grid-cols-4">
          <Metric title="Opportunities" value="32" up="12.5%" />
          <Metric title="Pipeline Value" value="$47,850" up="18.7%" />
          <Metric title="Conversion Rate" value="18.4%" up="8.3%" />
          <Metric title="Won Revenue" value="$12,980" up="23.1%" />
        </div>
        <div className="grid gap-4 xl:grid-cols-[1fr_1fr_330px]">
          <Panel title="Funnel" action="Marketing Pipeline"><FunnelChart /></Panel>
          <Panel title="Stage Distribution" action="Marketing Pipeline"><Donut /></Panel>
          <TeamInbox small />
        </div>
        <div className="grid gap-4 xl:grid-cols-[1.1fr_1fr_1fr]">
          <MiniMarketing />
          <MiniCalendar />
          <MiniInvoices />
        </div>
      </div>
    </div>
  );
}

function Marketing() {
  return (
    <div>
      <PageTabs items={["Social Planner","Emails","Snippets","Countdown Timers","Trigger Links"]} />
      <div className="grid gap-6 bg-white p-7 xl:grid-cols-[1fr_360px]">
        <div>
          <h2 className="max-w-2xl text-4xl font-semibold leading-tight">Grow faster with a smarter social media calendar</h2>
          <p className="mt-3 text-lg text-slate-600">Plan, schedule, and publish content across all your social platforms.</p>
          <p className="mt-9 text-slate-600">Select the social accounts you want to connect:</p>
          <div className="mt-4 flex flex-wrap gap-3">{["Facebook","Instagram","TikTok","Linkedin","YouTube"].map(x=><button key={x} className="rounded-lg border border-slate-300 bg-white px-4 py-3 font-semibold shadow-sm">{x}</button>)}</div>
          <div className="mt-6 rounded-lg border border-blue-300 bg-blue-50 p-5"><p className="font-semibold">Save time by scheduling posts</p><p className="mt-2 text-slate-600">Keep your social channels active by scheduling posts!</p><p className="mt-3 font-semibold text-blue-600">Schedule Now →</p></div>
          <div className="mt-8 grid gap-4 md:grid-cols-4">{["Bulk Scheduling with CSV","Evergreen Queue Post","Recurring Post","RSS Feed Automation"].map((x,i)=><SmallCard key={x} title={x} link={i===0?'Upload CSV':i===3?'Create RSS Post':'Create Post'} />)}</div>
        </div>
        <div className="mt-10 rounded-xl border border-slate-300 bg-white shadow-sm"><div className="p-4"><div className="flex items-center gap-3"><VuelaLogo small /><div><p className="font-bold">VUELA CO</p><p className="text-xs text-slate-500">Gresham, Oregon</p></div></div></div><div className="h-[300px] bg-gradient-to-br from-sky-100 via-slate-200 to-slate-300 p-4"><div className="mt-28 rounded-xl bg-white/90 p-4 shadow-lg"><p className="font-bold text-[#007e6f]">Scheduled</p><p className="text-sm">May 5, 2026 · 10:00 AM</p></div></div><div className="flex gap-8 p-4 text-blue-600"><Heart /> <MessageSquare /> <Share2 /></div></div>
      </div>
    </div>
  );
}

function Conversations() {
  const contacts = [
    { name: "Sarah Johnson", phone: "+1 (503) 555-0198", preview: "Hey! I need a quote for my roof." },
    { name: "Mike Thompson", phone: "+1 (503) 555-0134", preview: "Can we schedule an appointment?" },
    { name: "Emily Davis", phone: "+1 (541) 555-0188", preview: "Thanks! That works for me." },
    { name: "Jason Brown", phone: "+1 (971) 555-0160", preview: "Missed call" },
    { name: "Lisa Martinez", phone: "+1 (458) 555-0177", preview: "Can you send over details?" },
  ];
  const [activeContact, setActiveContact] = useState(contacts[0]);

  return <div><PageTabs items={["Conversations","Manual Actions","Snippets","Trigger Links","Settings"]} /><div className="grid h-[calc(100vh-122px)] min-h-[730px] grid-cols-[360px_1fr_320px] bg-[#f3f7fb]"><TeamInbox contacts={contacts} activeContact={activeContact} onSelect={setActiveContact} /><ChatWindow contact={activeContact} /><ContactDetails contact={activeContact} /></div></div>;
}

function TeamInbox({ small=false, contacts, activeContact, onSelect }) {
  const list = contacts || [
    { name: "Sarah Johnson", preview: "Hey! I need a quote for my roof." },
    { name: "Mike Thompson", preview: "Can we schedule an appointment?" },
    { name: "Emily Davis", preview: "Thanks! That works for me." },
    { name: "Jason Brown", preview: "Missed call" },
    { name: "Lisa Martinez", preview: "Can you send over details?" },
  ];
  return <div className={`bg-white ${small?'rounded-lg border border-slate-200':'border-r border-slate-200'}`}><div className="border-b border-slate-200 p-4"><div className="flex items-center justify-between"><h3 className="font-bold">Team Inbox</h3><MoreVertical className="h-4 w-4" /></div><div className="mt-4 grid grid-cols-4 text-center text-xs text-slate-500"><span className="font-bold text-[#007e6f]">Unread</span><span>All</span><span>Recents</span><span>Starred</span></div></div><div className="p-3"><div className="mb-3 rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-400">Search conversations</div>{list.map((contact,i)=><button key={contact.name} onClick={() => onSelect && onSelect(contact)} className={`mb-2 block w-full rounded-lg p-3 text-left transition hover:bg-[#f0faf8] ${(activeContact?.name===contact.name || (!activeContact && i===0))?'border border-[#007e6f] bg-[#f0faf8]':'border border-transparent'}`}><div className="flex justify-between"><p className="font-semibold text-sm">{contact.name}</p><span className="text-xs text-slate-500">{i===0?'2:34 PM':'1:47 PM'}</span></div><p className="mt-1 text-xs text-slate-500">{contact.preview}</p></button>)}</div></div>;
}

function ChatWindow({ contact }){
  const [messages, setMessages] = useState([
    { from: "lead", text: contact?.preview || "Hey! I need a quote for my roof." },
    { from: "team", text: "Hi! Thanks for reaching out. I’d be happy to help. Can you tell me a bit more about your project?" },
    { from: "lead", text: "Sure, I’m looking for pricing and availability." },
  ]);
  const [reply, setReply] = useState("");

  useEffect(() => {
    setMessages([
      { from: "lead", text: contact?.preview || "Hey! I need a quote for my roof." },
      { from: "team", text: "Hi! Thanks for reaching out. I’d be happy to help. Can you tell me a bit more about your project?" },
      { from: "lead", text: "Sure, I’m looking for pricing and availability." },
    ]);
  }, [contact?.name]);

  const sendReply = () => {
    if (!reply.trim()) return;
    setMessages([...messages, { from: "team", text: reply }]);
    setReply("");
    setTimeout(() => {
      setMessages((prev) => [...prev, { from: "lead", text: "Perfect, thank you. That helps a lot." }]);
    }, 1400);
  };

  return <div className="flex flex-col bg-white"><div className="flex items-center justify-between border-b border-slate-200 p-4"><div><p className="font-bold">{contact?.name || "Sarah Johnson"}</p><p className="text-sm text-slate-500">{contact?.phone || "+1 (503) 555-0198"}</p></div><div className="flex gap-4"><Phone/><Mail/><Star/><MoreVertical/></div></div><div className="flex-1 overflow-y-auto bg-[#f7f9fc] p-8"><div className="mx-auto max-w-[720px] space-y-5"><div className="text-center"><span className="rounded-full bg-white px-4 py-2 text-sm shadow-sm">Today</span></div>{messages.map((m,i)=><Bubble key={i} text={m.text} left={m.from==='lead'} />)}</div></div><div className="border-t bg-white p-4"><div className="flex items-center gap-2 rounded-lg border border-slate-300 p-2"><input value={reply} onChange={(e)=>setReply(e.target.value)} onKeyDown={(e)=>{if(e.key==='Enter')sendReply()}} placeholder="Type a message..." className="flex-1 bg-transparent px-2 outline-none" /><button onClick={sendReply} className="rounded-md bg-[#007e6f] px-4 py-2 text-white">Send</button></div></div></div>
}
function ContactDetails({ contact }){return <div className="bg-white p-4"><h3 className="font-bold">Contact Details</h3><div className="mt-5 rounded-lg border border-slate-200 p-4"><p className="font-bold">{contact?.name || "Sarah Johnson"}</p><p className="text-sm text-slate-500">{contact?.phone || "+1 (503) 555-0198"}</p><p className="mt-2 text-sm text-slate-500">{(contact?.name || "Sarah Johnson").toLowerCase().replaceAll(" ", ".")}@example.com</p></div><div className="mt-4 space-y-3">{["Create Opportunity","Create Task","Add Note","Schedule Appointment"].map(x=><button key={x} onClick={() => alert(`${x} created in demo mode`)} className="block w-full rounded-lg border border-slate-200 p-3 text-left text-sm font-semibold transition hover:bg-[#f0faf8]">{x}</button>)}</div></div>}

function Opportunities(){const cols=["New Lead","Hot Lead","New Booking","Visit Attended","Job Won"];return <div><PageTabs items={["Opportunities","Pipelines","Bulk Actions"]}/><div className="bg-[#f3f7fb] p-5"><Toolbar title="Marketing Pipeline" button="Add opportunity"/><div className="mt-5 grid gap-3 xl:grid-cols-5">{cols.map((c,i)=><div key={c} className="rounded-lg border bg-white"><div className="border-b p-3"><p className="font-bold">{c}</p><p className="text-sm text-slate-500">{12-i*2} Opportunities · ${(6500+i*2400).toLocaleString()}</p></div><div className="space-y-2 p-3">{["John Miller","Anne Wilson","David Clark"].map((n,j)=><div key={n+j} className="rounded-lg border border-slate-200 bg-white p-3"><div className="flex justify-between"><p className="font-bold text-sm">{j===1&&i>0?'Jessica Taylor':n}</p><p className="font-bold text-sm">${[650,1000,950][j]}</p></div><p className="mt-2 text-xs text-slate-500">Roof Replacement</p><p className="mt-2 text-xs text-slate-400">Apr {29-j}</p></div>)}</div></div>)}</div></div></div>}
function Calendars(){return <div><PageTabs items={["Calendar View","Appointment List View","Calendar Settings"]}/><div className="grid grid-cols-[1fr_320px] bg-[#f3f7fb]"><div className="p-5"><Toolbar title="May 2026" button="New"/><CalendarGrid /></div><div className="border-l bg-white p-5"><h3 className="font-bold">Manage View</h3><div className="mt-6 rounded-lg bg-slate-50 p-4"><p className="font-bold">View by type</p>{["All","Appointments","Blocked Slots"].map((x,i)=><p key={x} className="mt-3 text-sm">○ {x}</p>)}</div><div className="mt-6"><p className="font-bold">Filters</p><div className="mt-3 rounded-md border p-2 text-sm text-slate-400">Search users, calendars or groups</div></div></div></div></div>}
function Payments(){return <div><PageTabs items={["Invoices & Estimates","Documents & Contracts","Orders"]}/><div className="bg-[#f3f7fb] p-5"><Toolbar title="Invoices" button="New"/><div className="grid gap-4 md:grid-cols-4">{["0 In Draft $0.00","5 In Due $8,450.00","3 Received $6,200.00","1 Overdue $1,250.00"].map(x=><div key={x} className="rounded-lg border bg-white p-4 font-bold">{x}</div>)}</div><Table /></div></div>}
function Sites(){return <div><PageTabs items={["Funnels","Websites","Stores","Analytics","Blogs","Client Portal","Forms"]}/><div className="bg-[#f3f7fb] p-5"><Toolbar title="Funnels" button="New Funnel"/><SimpleList items={["Roofing Lead Capture Funnel","Free Roof Inspection Funnel","Storm Damage Funnel","Estimate Request Funnel","Financing Application Funnel"]}/></div></div>}
function Reputation(){return <div><PageTabs items={["Overview","My Stats","Competitor Analysis"]}/><div className="grid gap-4 bg-[#f3f7fb] p-5 xl:grid-cols-[280px_1fr_280px]"><Panel title="Your Rating"><div className="text-5xl font-bold">4.8</div><div className="mt-3 text-yellow-400 text-xl">★★★★★</div><p className="mt-3 text-sm text-slate-500">Based on 126 reviews</p></Panel><Panel title="Reviews and ratings trend"><div className="mt-5 h-64 rounded-lg bg-gradient-to-t from-[#007e6f]/10 to-transparent"><div className="pt-32 text-center font-bold text-[#007e6f]">Reviews Trend Chart</div></div></Panel><Panel title="Review Summary"><p className="text-4xl font-bold">128</p><p className="text-sm text-slate-500">Total Reviews</p><p className="mt-8 text-4xl font-bold">12</p><p className="text-sm text-slate-500">New Reviews</p><button className="mt-8 rounded-md bg-[#007e6f] px-4 py-2 text-white">Send Review Request</button></Panel></div></div>}
function Automations(){return <div><PageTabs items={["Workflows","Overview","Global Workflow Settings"]}/><div className="bg-[#f3f7fb] p-5"><Toolbar title="Workflow List" button="Create Workflow"/><SimpleList items={["New Lead Follow Up","Appointment Reminder","Review Request","Re-Engagement Campaign","Invoice Follow Up"]}/></div></div>}
function Contacts(){return <div><PageTabs items={["Smart Lists","Contacts","Bulk Actions"]}/><div className="bg-[#f3f7fb] p-5"><Toolbar title="Contacts" button="Add Contact"/><SimpleList items={["Sarah Johnson","Mike Thompson","Emily Davis","Jason Brown","Lisa Martinez"]}/></div></div>}

function Toolbar({title,button}){return <div className="mb-5 flex items-center justify-between"><div><h2 className="text-3xl font-semibold">{title}</h2><p className="text-slate-500">Manage your sample CRM data and activity.</p></div><div className="flex gap-3"><ButtonGhost><Filter className="h-4 w-4"/> Advanced Filters</ButtonGhost><button className="rounded-md bg-[#007e6f] px-4 py-2 font-semibold text-white"><Plus className="mr-1 inline h-4 w-4"/>{button}</button></div></div>}
function SimpleList({items}){return <div className="rounded-lg border bg-white"><div className="grid grid-cols-[1fr_180px_40px] border-b bg-slate-50 p-3 text-sm font-semibold text-slate-500"><span>Name</span><span>Last Updated</span><span></span></div>{items.map((x,i)=><div key={x} className="grid grid-cols-[1fr_180px_40px] border-b p-4"><span className="font-semibold">{x}</span><span className="text-sm text-slate-500">Apr {29-i}, 2026</span><MoreVertical className="h-4 w-4"/></div>)}</div>}
function Table(){return <div className="mt-5 rounded-lg border bg-white"><div className="grid grid-cols-6 border-b bg-slate-50 p-3 text-xs font-bold text-slate-500"><span>Invoice Name</span><span>Invoice #</span><span>Customer</span><span>Issue Date</span><span>Amount</span><span>Status</span></div>{["Robert Lee","Sarah Johnson","Brian Anderson","Emily Davis","John Miller"].map((n,i)=><div key={n} className="grid grid-cols-6 border-b p-3 text-sm"><span>INV-100{i+1}</span><span>100{i+1}</span><span>{n}</span><span>Apr {28-i}, 2026</span><span>${[2800,1950,2400,1250,1800][i]}</span><span className="font-bold text-[#007e6f]">{i===3?'Overdue':'Received'}</span></div>)}</div>}
function MiniMarketing(){return <div className="rounded-lg border bg-white p-4"><h3 className="font-bold">Marketing</h3><div className="mt-4 grid grid-cols-2 gap-3">{["Bulk Scheduling","Evergreen Queue","Recurring Post","RSS Feed"].map(x=><SmallCard key={x} title={x} link="Create" />)}</div></div>}
function MiniCalendar(){return <div className="rounded-lg border bg-white p-4"><h3 className="font-bold">Calendar View</h3><CalendarGrid mini /></div>}
function MiniInvoices(){return <div className="rounded-lg border bg-white p-4"><h3 className="font-bold">Invoices & Estimates</h3><Table /></div>}
function CalendarGrid({mini=false}){const cells=Array.from({length:35});return <div className={`mt-4 grid grid-cols-7 ${mini?'text-[10px]':'text-xs'}`}>{cells.map((_,i)=><div key={i} className={`${mini?'min-h-12':'min-h-24'} border border-slate-200 bg-white p-1`}>{i+1}{[4,8,12,18,22].includes(i)&&<div className="mt-1 rounded bg-[#007e6f]/10 p-1 text-[#007e6f]">10:00 AM</div>}</div>)}</div>}
function Metric({title,value,up}){return <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"><p className="text-sm font-medium text-slate-600">{title}</p><p className="mt-3 text-3xl font-semibold">{value}</p><p className="mt-3 text-sm font-semibold text-[#007e6f]">▲ {up} vs last 30 days</p></div>}
function Panel({title,action,children}){return <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><h3 className="font-bold">{title}</h3>{action&&<button className="rounded-md border px-3 py-2 text-sm text-slate-600">{action} <ChevronDown className="inline h-3 w-3"/></button>}</div>{children}</div>}
function SmallCard({title,link}){return <div className="rounded-lg border border-slate-200 bg-white p-4"><p className="min-h-10 font-bold">{title}</p><p className="mt-5 text-sm font-semibold text-blue-600">{link}</p></div>}
function ButtonGhost({children}){return <button className="flex items-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">{children}</button>}
function IconCircle({children,color}){return <div style={{backgroundColor:color}} className="flex h-9 w-9 items-center justify-center rounded-full text-white">{children}</div>}
function Bubble({text,left}){return <div className={`max-w-[58%] rounded-lg p-3 text-sm ${left?'bg-white':'ml-auto bg-[#e8f7f5]'}`}>{text}</div>}
function FunnelChart(){return <div className="mt-7 grid grid-cols-[1fr_220px] items-center gap-6"><div className="mx-auto w-72"><div className="h-14 bg-blue-600 clip"/><div className="mx-auto h-14 w-[85%] bg-blue-400"/><div className="mx-auto h-14 w-[68%] bg-red-500"/><div className="mx-auto h-14 w-[50%] bg-orange-400"/><div className="mx-auto h-14 w-[35%] bg-green-400"/></div><div className="space-y-4 text-sm">{["New Lead 12","Hot Lead 8","New Booking 6","Visit Attended 4","Job Won 2","Total 32"].map(x=><p key={x} className="flex justify-between border-b pb-2"><span>{x.split(' ').slice(0,-1).join(' ')}</span><b>{x.split(' ').at(-1)}</b></p>)}</div></div>}
function Donut(){return <div className="mt-7 flex items-center justify-center gap-12"><div className="grid h-52 w-52 place-items-center rounded-full" style={{background:`conic-gradient(#2563eb 0 38%, #2fb6b1 38% 63%, #ef4444 63% 82%, #f59e0b 82% 94%, #6cc96b 94% 100%)`}}><div className="grid h-28 w-28 place-items-center rounded-full bg-white"><div className="text-center"><p className="text-3xl font-bold">32</p><p className="text-sm">Total</p></div></div></div><div className="space-y-4 text-sm">{["New Lead 37.5%","Hot Lead 25.0%","New Booking 18.8%","Visit Attended 12.5%","Job Won 6.2%"].map(x=><p key={x} className="flex gap-6"><span>{x}</span></p>)}</div></div>}
function PhoneDialer({ open, incoming, onClose, onAnswer }) {
  const [number, setNumber] = useState("5035550198");
  if (!open) return null;
  const keys = ["1","2","3","4","5","6","7","8","9","*","0","#"];
  return (
    <div className="fixed bottom-6 right-6 z-50 w-[340px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
      <div className={`${incoming ? "bg-[#bd0101]" : "bg-[#007e6f]"} p-4 text-white`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide opacity-80">{incoming ? "Incoming Call" : "Phone"}</p>
            <p className="text-lg font-bold">{incoming ? "Maria Lopez" : "VUELA Dialer"}</p>
          </div>
          <button onClick={onClose} className="rounded-full bg-white/20 px-3 py-1 text-sm">Close</button>
        </div>
      </div>
      <div className="p-5">
        <div className="mb-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-center text-2xl font-semibold tracking-wide">
          {number || "Enter number"}
        </div>
        <div className="grid grid-cols-3 gap-3">
          {keys.map((key) => (
            <button key={key} onClick={() => setNumber(number + key)} className="rounded-xl border border-slate-200 bg-white p-4 text-xl font-bold shadow-sm transition hover:bg-[#f0faf8]">
              {key}
            </button>
          ))}
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3">
          {incoming ? (
            <>
              <button onClick={onClose} className="rounded-xl bg-red-500 px-4 py-3 font-bold text-white">Decline</button>
              <button onClick={onAnswer} className="rounded-xl bg-[#007e6f] px-4 py-3 font-bold text-white">Answer</button>
            </>
          ) : (
            <>
              <button onClick={() => setNumber("")} className="rounded-xl border px-4 py-3 font-bold">Clear</button>
              <button onClick={() => alert(`Calling ${number} in demo mode`)} className="rounded-xl bg-[#007e6f] px-4 py-3 font-bold text-white">Call</button>
            </>
          )}
        </div>
        <p className="mt-4 text-center text-xs text-slate-500">Demo mode only. No real calls are placed.</p>
      </div>
    </div>
  );
}

function VuelaLogo({small=false}){return <div className={`relative ${small?'h-8 w-12':'h-12 w-20'}`}><div className="absolute left-0 top-2 h-7 w-10 rounded-l-full bg-[#007e6f]" style={{clipPath:'polygon(0 0,100% 30%,75% 70%,20% 100%)'}}/><div className="absolute right-0 top-2 h-7 w-10 rounded-r-full bg-[#ff0000]" style={{clipPath:'polygon(0 30%,100% 0,80% 100%,25% 70%)'}}/><div className="absolute left-1/2 top-3 h-7 w-7 -translate-x-1/2 rounded-full border-4 border-white bg-white"/></div>}
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <VuelaCRMReplica />
  </React.StrictMode>
);
