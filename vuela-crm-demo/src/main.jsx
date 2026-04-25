import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  Rocket, LayoutDashboard, MessageCircle, CalendarDays, Users, KanbanSquare,
  CreditCard, Globe, Star, Workflow, Search, Zap, Phone, Bell, HelpCircle,
  Plus, MoreVertical, Filter, ChevronDown, Heart, MessageSquare, Share2,
  Send, Mail
} from "lucide-react";

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

const demoCallers = [
  { name: "Maria Lopez", phone: "+1 (503) 555-0148", text: "Hi, I just called. Can someone text me back?" },
  { name: "James Carter", phone: "+1 (541) 555-0182", text: "Can I get pricing and availability?" },
  { name: "Sofia Rivera", phone: "+1 (971) 555-0164", text: "I missed you. Can we schedule something?" },
  { name: "Avery Mitchell", phone: "+1 (458) 555-0199", text: "Hi, I submitted the form. Just checking in." },
];

export default function VuelaCRMReplica() {
  const [page, setPage] = useState("dashboard");
  const [phoneOpen, setPhoneOpen] = useState(false);
  const [incomingCall, setIncomingCall] = useState(false);
  const [activeCaller, setActiveCaller] = useState(demoCallers[0]);
  const [callLog, setCallLog] = useState([]);
  const [modal, setModal] = useState(null);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [opportunityStage, setOpportunityStage] = useState("New Lead");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);
  const [selectedSite, setSelectedSite] = useState(null);

  const activeItem = mainNav.find(([key]) => key === page);
  const title = activeItem?.[1] || "Dashboard";

  useEffect(() => {
    let timer;
    const scheduleNextCall = () => {
      const randomTime = Math.floor(Math.random() * (90000 - 30000 + 1)) + 30000;
      timer = setTimeout(() => {
        const caller = demoCallers[Math.floor(Math.random() * demoCallers.length)];
        setActiveCaller(caller);
        setIncomingCall(true);
        setPhoneOpen(true);
        scheduleNextCall();
      }, randomTime);
    };
    scheduleNextCall();
    return () => clearTimeout(timer);
  }, []);

  const dismissCall = () => {
    if (incomingCall) {
      setCallLog(prev => [{ type: "missed", ...activeCaller, message: activeCaller.text, time: "Just now" }, ...prev]);
      setModal("missedCall");
    }
    setPhoneOpen(false);
    setIncomingCall(false);
  };

  const answerCall = () => {
    setCallLog(prev => [{ type: "answered", ...activeCaller, message: "Call answered in demo mode.", time: "Just now" }, ...prev]);
    setIncomingCall(false);
  };

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
            <button onClick={() => setModal("search")} className="mb-4 flex w-full items-center gap-2 rounded-md border border-[#d7dde7] bg-white px-2 py-2 text-left text-sm text-slate-500 shadow-sm transition hover:border-[#007e6f] hover:bg-[#f0faf8]">
              <Search className="h-4 w-4" />
              <span className="flex-1">Search</span>
              <span className="rounded bg-slate-100 px-1.5 text-xs">⌘K</span>
              <Zap className="h-4 w-4 text-[#007e6f]" />
            </button>
            <nav className="space-y-1 text-[14px]">
              {mainNav.map(([key, label, Icon]) => (
                <button key={key} onClick={() => setPage(key)} className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 font-medium transition ${page === key ? "bg-[#eef5f4] text-[#007e6f]" : "text-slate-600 hover:bg-slate-50"}`}>
                  <Icon className="h-4 w-4" /> {label}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          <TopBar title={title} onPhoneClick={() => setPhoneOpen(true)} onOpenModal={setModal} />
          <div className="lg:hidden border-b border-slate-200 bg-white p-2">
            <div className="flex gap-2 overflow-x-auto">
              {mainNav.map(([key,label]) => <button key={key} onClick={()=>setPage(key)} className={`shrink-0 rounded-full px-3 py-2 text-xs font-semibold ${page===key?'bg-[#007e6f] text-white':'bg-slate-100 text-slate-600'}`}>{label}</button>)}
            </div>
          </div>

          {page === "dashboard" && <Dashboard />}
          {page === "conversations" && <Conversations callLog={callLog} />}
          {page === "opportunities" && <Opportunities onSelectOpportunity={(opp) => { setSelectedOpportunity(opp); setOpportunityStage(opp.stage); }} onCreateOpportunity={() => setModal("createOpportunity")} />}
          {page === "calendars" && <Calendars onSelectAppointment={setSelectedAppointment} onCreateAppointment={() => setModal("createAppointment")} />}
          {page === "payments" && <Payments onSelectInvoice={setSelectedInvoice} onCreateInvoice={() => setModal("createInvoice")} />}
          {page === "sites" && <Sites onSelectSite={setSelectedSite} onCreateSite={() => setModal("createSite")} />}
          {page === "reputation" && <Reputation onReviewRequest={() => setModal("reviewRequest")} />}
          {page === "automations" && <Automations onSelectWorkflow={setSelectedWorkflow} onCreateWorkflow={() => setModal("createWorkflow")} />}
          {page === "contacts" && <Contacts />}
          {page === "launchpad" && <Marketing onOpenModal={setModal} />}

          <GlobalModal
            type={modal}
            callLog={callLog}
            onClose={() => setModal(null)}
            onGoToMessages={() => { setModal(null); setPage("conversations"); }}
          />
          <OpportunityDrawer opportunity={selectedOpportunity} stage={opportunityStage} onStageChange={setOpportunityStage} onClose={() => setSelectedOpportunity(null)} />
          <AppointmentDrawer appointment={selectedAppointment} onClose={() => setSelectedAppointment(null)} />
          <InvoiceDrawer invoice={selectedInvoice} onClose={() => setSelectedInvoice(null)} />
          <WorkflowDrawer workflow={selectedWorkflow} onClose={() => setSelectedWorkflow(null)} />
          <SiteDrawer site={selectedSite} onClose={() => setSelectedSite(null)} />
          <PhoneDialer open={phoneOpen} incoming={incomingCall} caller={activeCaller} onClose={dismissCall} onAnswer={answerCall} />
        </main>
      </div>
    </div>
  );
}

function TopBar({ title, onPhoneClick, onOpenModal }) {
  return (
    <header className="flex h-[70px] items-center justify-between border-b border-[#dfe5ee] bg-white px-5">
      <h1 className="text-xl font-semibold">{title}</h1>
      <div className="flex items-center gap-2">
        <button onClick={onPhoneClick} className="rounded-full transition hover:scale-105"><IconCircle color="#008a63"><Phone className="h-4 w-4" /></IconCircle></button>
        <button onClick={() => onOpenModal("ai")} className="rounded-full bg-[#5c2dbf] px-4 py-2 text-sm font-bold text-white transition hover:scale-105">Ask AI</button>
        <button onClick={() => onOpenModal("notifications")} className="rounded-full transition hover:scale-105"><IconCircle color="#0d9488"><Bell className="h-4 w-4" /></IconCircle></button>
        <button onClick={() => onOpenModal("quickAdd")} className="rounded-full transition hover:scale-105"><IconCircle color="#f97316"><Plus className="h-4 w-4" /></IconCircle></button>
        <button onClick={() => onOpenModal("help")} className="rounded-full transition hover:scale-105"><IconCircle color="#2563eb"><HelpCircle className="h-4 w-4" /></IconCircle></button>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#69427e] text-xs font-bold text-white">MM</div>
      </div>
    </header>
  );
}

function PageTabs({ items }) {
  return <div className="flex h-[52px] items-center gap-7 border-b border-[#dfe5ee] bg-white px-5 text-sm font-semibold text-slate-600">{items.map((item,i)=><button key={item} onClick={() => alert(`${item} opened in demo mode`)} className={`${i===0?'border-b-2 border-[#007e6f] text-[#007e6f]':''} flex h-full items-center`}>{item}</button>)}</div>;
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
        <div className="mt-4 max-w-xl rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600 shadow-sm">
          <p className="font-bold text-[#007e6f]">VUELA Interactive Sandbox</p>
          <p className="mt-2">This is a guided demo environment inspired by our live CRM platform. Some layouts, colors, or features may vary as the live platform receives updates, but the core tools and workflows function the same.</p>
        </div>
      </div>
    </div>
  );
}

function Marketing({ onOpenModal }) {
  return (
    <div>
      <PageTabs items={["Social Planner","Emails","Snippets","Countdown Timers","Trigger Links"]} />
      <div className="grid gap-6 bg-white p-7 xl:grid-cols-[1fr_360px]">
        <div>
          <h2 className="max-w-2xl text-4xl font-semibold leading-tight">Grow faster with a smarter social media calendar</h2>
          <p className="mt-3 text-lg text-slate-600">Plan, schedule, and publish content across all your social platforms.</p>
          <p className="mt-9 text-slate-600">Select the social accounts you want to connect:</p>
          <div className="mt-4 flex flex-wrap gap-3">{["Facebook","Instagram","TikTok","LinkedIn","YouTube"].map(x=><button key={x} onClick={() => alert(`${x} connected in demo mode`)} className="rounded-lg border border-slate-300 bg-white px-4 py-3 font-semibold shadow-sm transition hover:border-[#007e6f] hover:bg-[#f0faf8]">{x}</button>)}</div>
          <button onClick={() => onOpenModal("schedulePost")} className="mt-6 w-full rounded-lg border border-blue-300 bg-blue-50 p-5 text-left transition hover:bg-blue-100"><p className="font-semibold">Save time by scheduling posts</p><p className="mt-2 text-slate-600">Keep your social channels active by scheduling posts!</p><p className="mt-3 font-semibold text-blue-600">Schedule Now →</p></button>
          <div className="mt-8 grid gap-4 md:grid-cols-4">{["Bulk Scheduling with CSV","Evergreen Queue Post","Recurring Post","RSS Feed Automation"].map((x,i)=><button key={x} onClick={() => onOpenModal("schedulePost")} className="rounded-lg border border-slate-200 bg-white p-4 text-left transition hover:border-[#007e6f] hover:bg-[#f0faf8]"><p className="min-h-10 font-bold">{x}</p><p className="mt-5 text-sm font-semibold text-blue-600">{i===0?'Upload CSV':i===3?'Create RSS Post':'Create Post'}</p></button>)}</div>
        </div>
        <div className="mt-10 rounded-xl border border-slate-300 bg-white shadow-sm"><div className="p-4"><div className="flex items-center gap-3"><VuelaLogo small /><div><p className="font-bold">VUELA CO</p><p className="text-xs text-slate-500">Gresham, Oregon</p></div></div></div><div className="h-[300px] bg-gradient-to-br from-sky-100 via-slate-200 to-slate-300 p-4"><div className="mt-28 rounded-xl bg-white/90 p-4 shadow-lg"><p className="font-bold text-[#007e6f]">Scheduled</p><p className="text-sm">May 5, 2026 · 10:00 AM</p></div></div><div className="flex gap-8 p-4 text-blue-600"><Heart /> <MessageSquare /> <Share2 /></div></div>
      </div>
    </div>
  );
}

function Conversations({ callLog = [] }) {
  const missed = callLog.filter(c => c.type === "missed").map(c => ({ name: c.name, phone: c.phone, preview: c.message }));
  const contacts = [
    ...missed,
    { name: "Sarah Johnson", phone: "+1 (503) 555-0198", preview: "Hey! I need a quote for my roof." },
    { name: "Mike Thompson", phone: "+1 (503) 555-0134", preview: "Can we schedule an appointment?" },
    { name: "Emily Davis", phone: "+1 (541) 555-0188", preview: "Thanks! That works for me." },
    { name: "Jason Brown", phone: "+1 (971) 555-0160", preview: "Missed call" },
    { name: "Lisa Martinez", phone: "+1 (458) 555-0177", preview: "Can you send over details?" },
  ];
  const [activeContact, setActiveContact] = useState(contacts[0]);
  useEffect(() => { setActiveContact(contacts[0]); }, [callLog.length]);

  return <div><PageTabs items={["Conversations","Manual Actions","Snippets","Trigger Links","Settings"]} /><div className="grid h-[calc(100vh-122px)] min-h-[730px] grid-cols-[360px_1fr_320px] bg-[#f3f7fb]"><TeamInbox contacts={contacts} activeContact={activeContact} onSelect={setActiveContact} /><ChatWindow contact={activeContact} /><ContactDetails contact={activeContact} /></div></div>;
}

function TeamInbox({ small=false, contacts, activeContact, onSelect }) {
  const list = contacts || [
    { name: "Sarah Johnson", preview: "Hey! I need a quote for my roof." },
    { name: "Mike Thompson", preview: "Can we schedule an appointment?" },
    { name: "Emily Davis", preview: "Thanks! That works for me." },
  ];
  return <div className={`bg-white ${small?'rounded-lg border border-slate-200':'border-r border-slate-200'}`}><div className="border-b border-slate-200 p-4"><div className="flex items-center justify-between"><h3 className="font-bold">Team Inbox</h3><MoreVertical className="h-4 w-4" /></div><div className="mt-4 grid grid-cols-4 text-center text-xs text-slate-500"><span className="font-bold text-[#007e6f]">Unread</span><span>All</span><span>Recents</span><span>Starred</span></div></div><div className="p-3"><div className="mb-3 rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-400">Search conversations</div>{list.map((contact,i)=><button key={contact.name+i} onClick={() => onSelect && onSelect(contact)} className={`mb-2 block w-full rounded-lg p-3 text-left transition hover:bg-[#f0faf8] ${(activeContact?.name===contact.name || (!activeContact && i===0))?'border border-[#007e6f] bg-[#f0faf8]':'border border-transparent'}`}><div className="flex justify-between"><p className="font-semibold text-sm">{contact.name}</p><span className="text-xs text-slate-500">{i===0?'Just now':'1:47 PM'}</span></div><p className="mt-1 text-xs text-slate-500">{contact.preview}</p></button>)}</div></div>;
}

function ChatWindow({ contact }){
  const [messages, setMessages] = useState([]);
  const [reply, setReply] = useState("");
  useEffect(() => {
    setMessages([
      { from: "lead", text: contact?.preview || "Hey! I need a quote for my roof." },
      { from: "team", text: "Hi! Thanks for reaching out. I’d be happy to help. Can you tell me a bit more about your project?" },
      { from: "lead", text: "Sure, I’m looking for pricing and availability." },
    ]);
  }, [contact?.name, contact?.preview]);

  const sendReply = () => {
    if (!reply.trim()) return;
    setMessages(prev => [...prev, { from: "team", text: reply }]);
    setReply("");
    setTimeout(() => setMessages(prev => [...prev, { from: "lead", text: "Perfect, thank you. That helps a lot." }]), 1400);
  };

  return <div className="flex flex-col bg-white"><div className="flex items-center justify-between border-b border-slate-200 p-4"><div><p className="font-bold">{contact?.name || "Sarah Johnson"}</p><p className="text-sm text-slate-500">{contact?.phone || "+1 (503) 555-0198"}</p></div><div className="flex gap-4"><Phone/><Mail/><Star/><MoreVertical/></div></div><div className="flex-1 overflow-y-auto bg-[#f7f9fc] p-8"><div className="mx-auto max-w-[720px] space-y-5"><div className="text-center"><span className="rounded-full bg-white px-4 py-2 text-sm shadow-sm">Today</span></div>{messages.map((m,i)=><Bubble key={i} text={m.text} left={m.from==='lead'} />)}</div></div><div className="border-t bg-white p-4"><div className="flex items-center gap-2 rounded-lg border border-slate-300 p-2"><input value={reply} onChange={(e)=>setReply(e.target.value)} onKeyDown={(e)=>{if(e.key==='Enter')sendReply()}} placeholder="Type a message..." className="flex-1 bg-transparent px-2 outline-none" /><button onClick={sendReply} className="rounded-md bg-[#007e6f] px-4 py-2 text-white">Send</button></div></div></div>
}

function ContactDetails({ contact }){return <div className="bg-white p-4"><h3 className="font-bold">Contact Details</h3><div className="mt-5 rounded-lg border border-slate-200 p-4"><p className="font-bold">{contact?.name || "Sarah Johnson"}</p><p className="text-sm text-slate-500">{contact?.phone || "+1 (503) 555-0198"}</p><p className="mt-2 text-sm text-slate-500">{(contact?.name || "Sarah Johnson").toLowerCase().replaceAll(" ", ".")}@example.com</p></div><div className="mt-4 space-y-3">{["Create Opportunity","Create Task","Add Note","Schedule Appointment"].map(x=><button key={x} onClick={() => alert(`${x} created in demo mode`)} className="block w-full rounded-lg border border-slate-200 p-3 text-left text-sm font-semibold transition hover:bg-[#f0faf8]">{x}</button>)}</div></div>}

function Opportunities({ onSelectOpportunity, onCreateOpportunity }){
  const cols=["New Lead","Hot Lead","New Booking","Visit Attended","Job Won"];
  const cards = {
    "New Lead": ["John Miller","Anne Wilson","David Clark"],
    "Hot Lead": ["Jessica Taylor","Maria Lopez","Robert Lee"],
    "New Booking": ["Emily Davis","Brian Anderson","Sofia Rivera"],
    "Visit Attended": ["Jason Brown","Avery Mitchell","Pine Street Auto"],
    "Job Won": ["Lisa Martinez","Summit Builders","Riverbend Clinic"],
  };
  return <div><PageTabs items={["Opportunities","Pipelines","Bulk Actions"]}/><div className="bg-[#f3f7fb] p-5"><Toolbar title="Marketing Pipeline" button="Add opportunity" onButtonClick={onCreateOpportunity}/><div className="mt-5 grid gap-3 xl:grid-cols-5">{cols.map((c,i)=><div key={c} className="rounded-lg border bg-white"><div className="border-b p-3"><p className="font-bold">{c}</p><p className="text-sm text-slate-500">{12-i*2} Opportunities · ${(6500+i*2400).toLocaleString()}</p></div><div className="space-y-2 p-3">{cards[c].map((n,j)=><button key={n+j} onClick={() => onSelectOpportunity({ name:n, stage:c, value:[650,1000,950][j] || 1200, service:j===2?'CRM Setup':'Website Lead', phone:`+1 (503) 555-01${i}${j}`, email:n.toLowerCase().replaceAll(' ','.')+'@example.com' })} className="block w-full rounded-lg border border-slate-200 bg-white p-3 text-left transition hover:border-[#007e6f] hover:bg-[#f0faf8]"><div className="flex justify-between"><p className="font-bold text-sm">{n}</p><p className="font-bold text-sm">${[650,1000,950][j]}</p></div><p className="mt-2 text-xs text-slate-500">{j===2?'CRM Setup':'Website Lead'}</p><p className="mt-2 text-xs text-slate-400">Apr {29-j}</p></button>)}</div></div>)}</div></div></div>
}

function Calendars({ onSelectAppointment, onCreateAppointment }){
  return <div><PageTabs items={["Calendar View","Appointment List View","Calendar Settings"]}/><div className="grid grid-cols-[1fr_320px] bg-[#f3f7fb]"><div className="p-5"><Toolbar title="May 2026" button="New" onButtonClick={onCreateAppointment}/><CalendarGrid onSelectAppointment={onSelectAppointment} /></div><div className="border-l bg-white p-5"><h3 className="font-bold">Manage View</h3><div className="mt-6 rounded-lg bg-slate-50 p-4"><p className="font-bold">View by type</p>{["All","Appointments","Blocked Slots"].map((x)=><button key={x} onClick={() => alert(`${x} calendar view selected in demo mode`)} className="mt-3 block text-sm hover:text-[#007e6f]">○ {x}</button>)}</div><div className="mt-6"><p className="font-bold">Filters</p><button onClick={() => alert('Calendar filter opened in demo mode')} className="mt-3 w-full rounded-md border p-2 text-left text-sm text-slate-400">Search users, calendars or groups</button></div></div></div></div>
}

function Payments({ onSelectInvoice, onCreateInvoice }){return <div><PageTabs items={["Invoices & Estimates","Documents & Contracts","Orders"]}/><div className="bg-[#f3f7fb] p-5"><Toolbar title="Invoices" button="New" onButtonClick={onCreateInvoice}/><div className="grid gap-4 md:grid-cols-4">{["0 In Draft $0.00","5 In Due $8,450.00","3 Received $6,200.00","1 Overdue $1,250.00"].map(x=><button key={x} onClick={() => alert(`${x} filtered in demo mode`)} className="rounded-lg border bg-white p-4 text-left font-bold transition hover:border-[#007e6f] hover:bg-[#f0faf8]">{x}</button>)}</div><Table onSelectInvoice={onSelectInvoice} /></div></div>}

function Sites({ onSelectSite, onCreateSite }){return <div><PageTabs items={["Funnels","Websites","Stores","Analytics","Blogs","Client Portal","Forms"]}/><div className="bg-[#f3f7fb] p-5"><Toolbar title="Funnels" button="New Funnel" onButtonClick={onCreateSite}/><SimpleList items={["Roofing Lead Capture Funnel","Free Roof Inspection Funnel","Storm Damage Funnel","Estimate Request Funnel","Financing Application Funnel"]} onRowClick={(item) => onSelectSite({ name:item, visits:1240, leads:86, conversion:"6.9%" })}/></div></div>}

function Reputation({ onReviewRequest }){return <div><PageTabs items={["Overview","My Stats","Competitor Analysis"]}/><div className="grid gap-4 bg-[#f3f7fb] p-5 xl:grid-cols-[280px_1fr_280px]"><Panel title="Your Rating"><div className="text-5xl font-bold">4.8</div><div className="mt-3 text-yellow-400 text-xl">★★★★★</div><p className="mt-3 text-sm text-slate-500">Based on 126 reviews</p></Panel><Panel title="Reviews and ratings trend"><div className="mt-5 h-64 rounded-lg bg-gradient-to-t from-[#007e6f]/10 to-transparent"><div className="pt-32 text-center font-bold text-[#007e6f]">Reviews Trend Chart</div></div></Panel><Panel title="Review Summary"><p className="text-4xl font-bold">128</p><p className="text-sm text-slate-500">Total Reviews</p><p className="mt-8 text-4xl font-bold">12</p><p className="text-sm text-slate-500">New Reviews</p><button onClick={onReviewRequest} className="mt-8 rounded-md bg-[#007e6f] px-4 py-2 text-white">Send Review Request</button></Panel></div></div>}

function Automations({ onSelectWorkflow, onCreateWorkflow }){return <div><PageTabs items={["Workflows","Overview","Global Workflow Settings"]}/><div className="bg-[#f3f7fb] p-5"><Toolbar title="Workflow List" button="Create Workflow" onButtonClick={onCreateWorkflow}/><SimpleList items={["New Lead Follow Up","Appointment Reminder","Review Request","Re-Engagement Campaign","Invoice Follow Up"]} onRowClick={(item) => onSelectWorkflow({ name:item, steps:["Trigger received","Send SMS","Wait 1 day","Send email","Create task"] })}/></div></div>}

function Contacts(){return <div><PageTabs items={["Smart Lists","Contacts","Bulk Actions"]}/><div className="bg-[#f3f7fb] p-5"><Toolbar title="Contacts" button="Add Contact"/><SimpleList items={["Sarah Johnson","Mike Thompson","Emily Davis","Jason Brown","Lisa Martinez"]}/></div></div>}

function Toolbar({title,button,onButtonClick}){return <div className="mb-5 flex items-center justify-between"><div><h2 className="text-3xl font-semibold">{title}</h2><p className="text-slate-500">Manage your sample CRM data and activity.</p></div><div className="flex gap-3"><ButtonGhost><Filter className="h-4 w-4"/> Advanced Filters</ButtonGhost><button onClick={onButtonClick || (() => alert(`${button} opened in demo mode`))} className="rounded-md bg-[#007e6f] px-4 py-2 font-semibold text-white"><Plus className="mr-1 inline h-4 w-4"/>{button}</button></div></div>}

function SimpleList({items,onRowClick}){return <div className="rounded-lg border bg-white"><div className="grid grid-cols-[1fr_180px_40px] border-b bg-slate-50 p-3 text-sm font-semibold text-slate-500"><span>Name</span><span>Last Updated</span><span></span></div>{items.map((x,i)=><button key={x} onClick={() => onRowClick ? onRowClick(x) : alert(`${x} opened in demo mode`)} className="grid w-full grid-cols-[1fr_180px_40px] border-b p-4 text-left transition hover:bg-[#f0faf8]"><span className="font-semibold">{x}</span><span className="text-sm text-slate-500">Apr {29-i}, 2026</span><MoreVertical className="h-4 w-4"/></button>)}</div>}

function Table({ onSelectInvoice } = {}){return <div className="mt-5 rounded-lg border bg-white"><div className="grid grid-cols-6 border-b bg-slate-50 p-3 text-xs font-bold text-slate-500"><span>Invoice Name</span><span>Invoice #</span><span>Customer</span><span>Issue Date</span><span>Amount</span><span>Status</span></div>{["Robert Lee","Sarah Johnson","Brian Anderson","Emily Davis","John Miller"].map((n,i)=><button key={n} onClick={() => onSelectInvoice && onSelectInvoice({ invoice:`INV-100${i+1}`, number:`100${i+1}`, customer:n, date:`Apr ${28-i}, 2026`, amount:[2800,1950,2400,1250,1800][i], status:i===3?'Overdue':'Received' })} className="grid w-full grid-cols-6 border-b p-3 text-left text-sm transition hover:bg-[#f0faf8]"><span>INV-100{i+1}</span><span>100{i+1}</span><span>{n}</span><span>Apr {28-i}, 2026</span><span>${[2800,1950,2400,1250,1800][i]}</span><span className="font-bold text-[#007e6f]">{i===3?'Overdue':'Received'}</span></button>)}</div>}

function MiniMarketing(){return <div className="rounded-lg border bg-white p-4"><h3 className="font-bold">Marketing</h3><div className="mt-4 grid grid-cols-2 gap-3">{["Bulk Scheduling","Evergreen Queue","Recurring Post","RSS Feed"].map(x=><SmallCard key={x} title={x} link="Create" />)}</div></div>}
function MiniCalendar(){return <div className="rounded-lg border bg-white p-4"><h3 className="font-bold">Calendar View</h3><CalendarGrid mini /></div>}
function MiniInvoices(){return <div className="rounded-lg border bg-white p-4"><h3 className="font-bold">Invoices & Estimates</h3><Table /></div>}
function CalendarGrid({mini=false,onSelectAppointment}){const events={4:'Discovery Call',8:'Quote Review',12:'Client Onboarding',18:'Follow Up Call',22:'CRM Training'};const cells=Array.from({length:35});return <div className={`mt-4 grid grid-cols-7 ${mini?'text-[10px]':'text-xs'}`}>{cells.map((_,i)=><button key={i} onClick={() => events[i] && onSelectAppointment && onSelectAppointment({ title:events[i], date:`May ${i+1}, 2026`, time:i%2===0?'10:00 AM':'2:30 PM', contact:['Sarah Johnson','Mike Thompson','Emily Davis','Jason Brown','Lisa Martinez'][i%5], type:i===22?'CRM Training':'Appointment' })} className={`${mini?'min-h-12':'min-h-24'} border border-slate-200 bg-white p-1 text-left transition hover:bg-[#f0faf8]`}>{i+1}{events[i]&&<div className="mt-1 rounded bg-[#007e6f]/10 p-1 text-[#007e6f]">{mini?'10:00 AM':events[i]}</div>}</button>)}</div>}
function Metric({title,value,up}){return <button onClick={() => alert(`${title} report opened in demo mode`)} className="rounded-lg border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:border-[#007e6f] hover:bg-[#f0faf8]"><p className="text-sm font-medium text-slate-600">{title}</p><p className="mt-3 text-3xl font-semibold">{value}</p><p className="mt-3 text-sm font-semibold text-[#007e6f]">▲ {up} vs last 30 days</p></button>}
function Panel({title,action,children}){return <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><h3 className="font-bold">{title}</h3>{action&&<button onClick={() => alert(`${action} opened in demo mode`)} className="rounded-md border px-3 py-2 text-sm text-slate-600">{action} <ChevronDown className="inline h-3 w-3"/></button>}</div>{children}</div>}
function SmallCard({title,link}){return <button onClick={() => alert(`${title} opened in demo mode`)} className="rounded-lg border border-slate-200 bg-white p-4 text-left transition hover:border-[#007e6f] hover:bg-[#f0faf8]"><p className="min-h-10 font-bold">{title}</p><p className="mt-5 text-sm font-semibold text-blue-600">{link}</p></button>}
function ButtonGhost({children}){return <button onClick={() => alert('Demo control opened')} className="flex items-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">{children}</button>}
function IconCircle({children,color}){return <div style={{backgroundColor:color}} className="flex h-9 w-9 items-center justify-center rounded-full text-white">{children}</div>}
function Bubble({text,left}){return <div className={`max-w-[58%] rounded-lg p-3 text-sm ${left?'bg-white':'ml-auto bg-[#e8f7f5]'}`}>{text}</div>}
function FunnelChart(){return <div className="mt-7 grid grid-cols-[1fr_220px] items-center gap-6"><div className="mx-auto w-72"><div className="h-14 bg-blue-600"/><div className="mx-auto h-14 w-[85%] bg-blue-400"/><div className="mx-auto h-14 w-[68%] bg-red-500"/><div className="mx-auto h-14 w-[50%] bg-orange-400"/><div className="mx-auto h-14 w-[35%] bg-green-400"/></div><div className="space-y-4 text-sm">{["New Lead 12","Hot Lead 8","New Booking 6","Visit Attended 4","Job Won 2","Total 32"].map(x=><p key={x} className="flex justify-between border-b pb-2"><span>{x.split(' ').slice(0,-1).join(' ')}</span><b>{x.split(' ').at(-1)}</b></p>)}</div></div>}
function Donut(){return <div className="mt-7 flex items-center justify-center gap-12"><div className="grid h-52 w-52 place-items-center rounded-full" style={{background:`conic-gradient(#2563eb 0 38%, #2fb6b1 38% 63%, #ef4444 63% 82%, #f59e0b 82% 94%, #6cc96b 94% 100%)`}}><div className="grid h-28 w-28 place-items-center rounded-full bg-white"><div className="text-center"><p className="text-3xl font-bold">32</p><p className="text-sm">Total</p></div></div></div><div className="space-y-4 text-sm">{["New Lead 37.5%","Hot Lead 25.0%","New Booking 18.8%","Visit Attended 12.5%","Job Won 6.2%"].map(x=><p key={x} className="flex gap-6"><span>{x}</span></p>)}</div></div>}

function GlobalModal({ type, callLog = [], onClose, onGoToMessages }) {
  if (!type) return null;
  const defaultCalls = [{ name: 'Maria Lopez', phone: '+1 (503) 555-0148', message: 'Hi, I just called. Can someone text me back?', time: 'Just now' }];
  const content = {
    ai: { title:"Ask AI", subtitle:"Demo assistant for quick CRM help.", body:<div className="space-y-3"><div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">Try asking: “Summarize today’s leads” or “Create a follow up task for Sarah.”</div><div className="rounded-xl border border-slate-200 p-3 text-sm">What leads need attention today?</div><div className="rounded-xl bg-[#f0faf8] p-4 text-sm text-slate-700">You have 3 warm leads, 2 unread conversations, and 1 invoice that needs follow up.</div><button onClick={() => alert('AI summary generated in demo mode')} className="w-full rounded-xl bg-[#007e6f] px-4 py-3 font-bold text-white">Generate Summary</button></div> },
    notifications: { title:"Notifications", subtitle:"Recent activity in this demo account.", body:<div className="space-y-3">{["New message from Maria Lopez","Avery Mitchell booked an appointment","Invoice INV-1048 was paid","Review request sent to Sofia Rivera"].map(item => <button key={item} onClick={() => alert(item)} className="flex w-full items-center gap-3 rounded-xl border border-slate-200 p-3 text-left text-sm transition hover:bg-[#f0faf8]"><Bell className="h-4 w-4 text-[#007e6f]" />{item}</button>)}</div> },
    quickAdd: { title:"Quick Add", subtitle:"Create sample CRM items in demo mode.", body:<div className="grid gap-3 sm:grid-cols-2">{["New Contact","New Opportunity","New Task","Appointment","Invoice","Review Request"].map(item => <button key={item} onClick={() => alert(`${item} created in demo mode`)} className="rounded-xl border border-slate-200 p-4 text-left font-semibold transition hover:border-[#007e6f] hover:bg-[#f0faf8]">{item}</button>)}</div> },
    search: { title:"Search Demo", subtitle:"Search across contacts, conversations, payments, and workflows.", body:<div className="space-y-4"><div className="flex items-center gap-2 rounded-xl border border-slate-300 p-3"><Search className="h-4 w-4 text-slate-400" /><input autoFocus className="flex-1 bg-transparent outline-none" placeholder="Search Sarah, invoice, workflow..." /></div><div className="space-y-2">{["Sarah Johnson · Contact","New Lead Follow Up · Workflow","INV-1003 · Invoice","Marketing Pipeline · Opportunities"].map(item => <button key={item} onClick={() => alert(`${item} opened in demo mode`)} className="block w-full rounded-xl border border-slate-200 p-3 text-left text-sm transition hover:bg-[#f0faf8]">{item}</button>)}</div></div> },
    help: { title:"Help Center", subtitle:"Demo support menu.", body:<div className="space-y-3">{["How conversations work","How pipelines work","How automations work"].map(item => <button key={item} onClick={() => alert(item)} className="block w-full rounded-xl border p-3 text-left hover:bg-[#f0faf8]">{item}</button>)}</div> },
    createOpportunity: { title:"Create Opportunity", subtitle:"Add a new lead into the sample pipeline.", body:<FormDemo button="Create Demo Opportunity" fields={["Contact name","Opportunity value"]} select={["New Lead","Hot Lead","New Booking","Visit Attended","Job Won"]} /> },
    createAppointment: { title:"Create Appointment", subtitle:"Schedule a sample appointment in demo mode.", body:<FormDemo button="Create Demo Appointment" fields={["Appointment title","Contact name","Date and time"]} /> },
    createInvoice: { title:"Create Invoice", subtitle:"Create a sample invoice in demo mode.", body:<FormDemo button="Create Demo Invoice" fields={["Customer name","Amount"]} select={["Draft","Due","Paid"]} /> },
    createSite: { title:"Create Funnel", subtitle:"Build a sample funnel in demo mode.", body:<FormDemo button="Create Demo Funnel" fields={["Funnel name","Goal"]} /> },
    createWorkflow: { title:"Create Workflow", subtitle:"Build a sample automation in demo mode.", body:<FormDemo button="Create Demo Workflow" fields={["Workflow name","Trigger"]} /> },
    schedulePost: { title:"Schedule Social Post", subtitle:"Create a sample social post.", body:<FormDemo button="Schedule Demo Post" fields={["Post title","Caption","Date and time"]} select={["Facebook","Instagram","LinkedIn","YouTube"]} /> },
    reviewRequest: { title:"Send Review Request", subtitle:"Send a sample review request.", body:<FormDemo button="Send Demo Review Request" fields={["Customer name","Phone or email"]} select={["SMS","Email","SMS and Email"]} /> },
    missedCall: { title:"Missed Call", subtitle:"Demo missed call and text-back workflow.", body:<div className="space-y-3">{(callLog.length ? callLog : defaultCalls).slice(0,3).map((call,index)=><div key={index} className="rounded-xl border border-slate-200 p-4"><p className="font-bold">{call.name}</p><p className="text-sm text-slate-500">{call.phone}</p><p className="mt-3 rounded-lg bg-[#f0faf8] p-3 text-sm text-slate-700">{call.message}</p><p className="mt-2 text-xs text-slate-400">{call.time}</p></div>)}<button onClick={onGoToMessages} className="w-full rounded-xl bg-[#007e6f] px-4 py-3 font-bold text-white">Send Missed Call Text Back</button></div> },
  }[type];

  return <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/35 p-4 backdrop-blur-sm"><div className="w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl"><div className="flex items-start justify-between border-b border-slate-200 p-5"><div><h3 className="text-xl font-bold">{content.title}</h3><p className="mt-1 text-sm text-slate-500">{content.subtitle}</p></div><button onClick={onClose} className="rounded-full bg-slate-100 px-3 py-1 text-sm font-bold text-slate-600">Close</button></div><div className="p-5">{content.body}</div></div></div>;
}

function FormDemo({ fields = [], select, button }) {
  return <div className="space-y-3">{fields.map(f => <input key={f} className="w-full rounded-xl border border-slate-300 p-3 outline-none" placeholder={f} />)}{select && <select className="w-full rounded-xl border border-slate-300 p-3 outline-none">{select.map(s => <option key={s}>{s}</option>)}</select>}<button onClick={() => alert(`${button} completed in demo mode`)} className="w-full rounded-xl bg-[#007e6f] px-4 py-3 font-bold text-white">{button}</button></div>;
}

function OpportunityDrawer({ opportunity, stage, onStageChange, onClose }) {
  if (!opportunity) return null;
  const stages = ["New Lead","Hot Lead","New Booking","Visit Attended","Job Won"];
  return <Drawer title="Opportunity Detail" heading={opportunity.name} sub={`${opportunity.service} · $${opportunity.value}`} onClose={onClose}><div className="rounded-xl border border-slate-200 p-4"><p className="text-sm font-bold">Contact</p><p className="mt-2 text-sm text-slate-600">{opportunity.phone}</p><p className="text-sm text-slate-600">{opportunity.email}</p></div><div><p className="mb-2 text-sm font-bold">Move Stage</p><div className="grid grid-cols-2 gap-2">{stages.map(s => <button key={s} onClick={() => onStageChange(s)} className={`rounded-xl border p-3 text-left text-sm font-semibold ${stage===s ? 'border-[#007e6f] bg-[#f0faf8] text-[#007e6f]' : 'border-slate-200 hover:bg-slate-50'}`}>{s}</button>)}</div></div><div className="grid grid-cols-3 gap-2">{["Add Note","Add Task","Appointment"].map(x => <button key={x} onClick={() => alert(`${x} created in demo mode`)} className="rounded-xl border border-slate-200 p-3 text-sm font-bold hover:bg-[#f0faf8]">{x}</button>)}</div><div className="rounded-xl bg-[#f0faf8] p-4 text-sm text-slate-700">Current demo stage: <b>{stage}</b></div></Drawer>;
}

function AppointmentDrawer({ appointment, onClose }) {
  if (!appointment) return null;
  return <Drawer title="Appointment Detail" heading={appointment.title} sub={`${appointment.date} · ${appointment.time}`} onClose={onClose}><div className="rounded-xl border border-slate-200 p-4"><p className="text-sm font-bold">Contact</p><p className="mt-2 text-sm text-slate-600">{appointment.contact}</p><p className="text-sm text-slate-600">{appointment.type}</p></div><div className="grid grid-cols-2 gap-2">{["Reschedule","Mark Complete","Send Reminder","Add Notes"].map(x => <button key={x} onClick={() => alert(`${x} completed in demo mode`)} className="rounded-xl border border-slate-200 p-3 text-sm font-bold hover:bg-[#f0faf8]">{x}</button>)}</div></Drawer>;
}

function InvoiceDrawer({ invoice, onClose }) {
  if (!invoice) return null;
  return <Drawer title="Invoice Detail" heading={invoice.invoice} sub={`${invoice.customer} · $${invoice.amount}`} onClose={onClose}><div className="rounded-xl border border-slate-200 p-4"><p className="text-sm font-bold">Invoice Info</p><p className="mt-2 text-sm text-slate-600">Invoice Number: {invoice.number}</p><p className="text-sm text-slate-600">Issue Date: {invoice.date}</p><p className="text-sm text-slate-600">Status: {invoice.status}</p></div><div className="grid grid-cols-2 gap-2">{["Mark Paid","Send Reminder","Download","Email Invoice"].map(x => <button key={x} onClick={() => alert(`${x} completed in demo mode`)} className="rounded-xl border border-slate-200 p-3 text-sm font-bold hover:bg-[#f0faf8]">{x}</button>)}</div></Drawer>;
}

function WorkflowDrawer({ workflow, onClose }) {
  if (!workflow) return null;
  return <Drawer title="Workflow Preview" heading={workflow.name} sub="Automation sequence" onClose={onClose}>{workflow.steps.map((step,i) => <div key={step} className="flex items-center gap-3 rounded-xl border border-slate-200 p-3"><div className="grid h-8 w-8 place-items-center rounded-full bg-[#007e6f] text-sm font-bold text-white">{i+1}</div><p className="font-semibold">{step}</p></div>)}<button onClick={() => alert('Workflow activated in demo mode')} className="rounded-xl bg-[#007e6f] px-4 py-3 font-bold text-white">Activate Demo Workflow</button></Drawer>;
}

function SiteDrawer({ site, onClose }) {
  if (!site) return null;
  return <Drawer title="Funnel Preview" heading={site.name} sub="Sample conversion page" onClose={onClose}><div className="grid grid-cols-3 gap-3">{[["Visits",site.visits],["Leads",site.leads],["Conv.",site.conversion]].map(([a,b]) => <div key={a} className="rounded-xl bg-slate-50 p-4 text-center"><p className="text-xs text-slate-500">{a}</p><p className="mt-2 text-xl font-bold">{b}</p></div>)}</div><button onClick={() => alert('Preview opened in demo mode')} className="rounded-xl bg-[#007e6f] px-4 py-3 font-bold text-white">Open Preview</button></Drawer>;
}

function Drawer({ title, heading, sub, onClose, children }) {
  return <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md border-l border-slate-200 bg-white shadow-2xl"><div className="flex items-start justify-between border-b border-slate-200 p-5"><div><p className="text-xs font-bold uppercase tracking-wide text-[#007e6f]">{title}</p><h3 className="mt-1 text-2xl font-bold">{heading}</h3><p className="text-sm text-slate-500">{sub}</p></div><button onClick={onClose} className="rounded-full bg-slate-100 px-3 py-1 text-sm font-bold">Close</button></div><div className="space-y-5 p-5">{children}</div></div>;
}

function PhoneDialer({ open, incoming, caller, onClose, onAnswer }) {
  const [number, setNumber] = useState("5035550198");
  if (!open) return null;
  const keys = ["1","2","3","4","5","6","7","8","9","*","0","#"];
  return <div className="fixed bottom-6 right-6 z-50 w-[340px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"><div className={`${incoming ? "bg-[#bd0101]" : "bg-[#007e6f]"} p-4 text-white`}><div className="flex items-center justify-between"><div><p className="text-xs uppercase tracking-wide opacity-80">{incoming ? "Incoming Call" : "Phone"}</p><p className="text-lg font-bold">{incoming ? caller?.name : "VUELA Dialer"}</p>{incoming && <p className="text-sm opacity-90">{caller?.phone}</p>}</div><button onClick={onClose} className="rounded-full bg-white/20 px-3 py-1 text-sm">Close</button></div></div><div className="p-5">{incoming ? <div className="mb-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-center"><p className="text-sm text-slate-500">Potential new lead</p><p className="mt-2 text-2xl font-bold">{caller?.name}</p><p className="mt-1 text-slate-600">{caller?.phone}</p></div> : <div className="mb-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-center text-2xl font-semibold tracking-wide">{number || "Enter number"}</div>}{!incoming && <div className="grid grid-cols-3 gap-3">{keys.map(key => <button key={key} onClick={() => setNumber(number + key)} className="rounded-xl border border-slate-200 bg-white p-4 text-xl font-bold shadow-sm transition hover:bg-[#f0faf8]">{key}</button>)}</div>}<div className="mt-5 grid grid-cols-2 gap-3">{incoming ? <><button onClick={onClose} className="rounded-xl bg-red-500 px-4 py-3 font-bold text-white">Decline</button><button onClick={onAnswer} className="rounded-xl bg-[#007e6f] px-4 py-3 font-bold text-white">Answer</button></> : <><button onClick={() => setNumber("")} className="rounded-xl border px-4 py-3 font-bold">Clear</button><button onClick={() => alert(`Calling ${number} in demo mode`)} className="rounded-xl bg-[#007e6f] px-4 py-3 font-bold text-white">Call</button></>}</div><p className="mt-4 text-center text-xs text-slate-500">Demo mode only. No real calls are placed.</p></div></div>;
}

function VuelaLogo({small=false}){return <div className={`relative ${small?'h-8 w-12':'h-12 w-20'}`}><div className="absolute left-0 top-2 h-7 w-10 rounded-l-full bg-[#007e6f]" style={{clipPath:'polygon(0 0,100% 30%,75% 70%,20% 100%)'}}/><div className="absolute right-0 top-2 h-7 w-10 rounded-r-full bg-[#ff0000]" style={{clipPath:'polygon(0 30%,100% 0,80% 100%,25% 70%)'}}/><div className="absolute left-1/2 top-3 h-7 w-7 -translate-x-1/2 rounded-full border-4 border-white bg-white"/></div>}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <VuelaCRMReplica />
  </React.StrictMode>
);
