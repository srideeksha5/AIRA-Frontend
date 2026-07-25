import { useEffect, useState } from "react";
import { Activity, AlertTriangle, Bell, Building2, CalendarDays, ChevronDown, ChevronLeft, ChevronRight, CircleHelp, Clock3, FileBarChart, Filter, Hand, Home, LayoutDashboard, LockKeyhole, Mail, Moon, MoreVertical, Power, Search, Send, Settings, Sparkles, Sun, Users } from "lucide-react";
import "./styles/app.css";
import hero from "./assets/images/hero.png";

const conversations = [
  ["Waiting on Product Feedback", "Product Team", "Blocked", "18 hrs", "Align on pending feedback with Design", "◌"],
  ["API Rate Limit Workaround", "Engineering Team", "Blocked", "16 hrs", "Confirm workaround approach", "⌘"],
  ["Infrastructure Capacity Approval", "Platform Team", "Decision", "2 days", "Review capacity request", "▣"],
  ["Security Review Blocking Release", "Security Team", "Ownership", "1 day", "Follow up with Security team for review", "▦"],
];

const teams = [
  ["Engineering", "⌘", "Normal", "2", "Slowing", "75%"],
  ["Design", "◌", "Normal", "2", "Slowing", "81%"],
  ["Marketing", "⚑", "Normal", "2", "Slowing", "81%"],
  ["Security", "▦", "Normal", "1", "Slowing", "73%"],
  ["Product", "◈", "Slowing", "1", "Slowing", "64%"],
  ["Legal", "♢", "Normal", "3", "Normal", "78%"],
];

function Logo({ compact = false }) {
  return <div className={`logo ${compact ? "compact" : ""}`}><span className="logo-mark">⌁</span><span>AIRA</span></div>;
}

function IconButton({ children, label, className = "", onClick }) { return <button className={`icon-button ${className}`} aria-label={label} onClick={onClick}>{children}</button>; }

function AppHeader({ theme, setTheme }) {
  const now = new Date();
  const today = new Intl.DateTimeFormat("en-GB", { weekday: "short", day: "2-digit", month: "short", year: "numeric", hour: "numeric", minute: "2-digit" }).format(now);
  const salutation = now.getHours() < 12 ? "Good morning" : now.getHours() < 17 ? "Good afternoon" : "Good evening";
  return <header className="app-header">
    <Logo compact />
    <div className="greeting"><strong>{salutation}, Luci</strong><small>{today} ·</small></div>
    <label className="search"><Search size={16}/><input placeholder="Search anything..." /></label>
    <IconButton label="Toggle colour theme" className="theme-toggle" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>{theme === "dark" ? <Sun size={18}/> : <Moon size={18}/>}</IconButton>
    <IconButton label="Notifications"><Bell size={18}/></IconButton><IconButton label="Sign out"><Power size={18}/></IconButton>
  </header>;
}

function Tabs({ view, setView }) {
  const tabs = [["overview", "Needs attention"], ["risks", "Emerging risks"], ["teams", "Teams"]];
  return <nav className="tabs">{tabs.map(([id, name]) => <button key={id} className={view === id ? "active" : ""} onClick={() => setView(id)}>{name}</button>)}{view === "detail" && <><i>›</i><button className="active">Team detail</button></>}</nav>;
}

function SectionHeading({ icon, title, subtitle, action }) { return <div className="section-heading"><div className="heading-icon">{icon}</div><div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div>{action && <button className="text-action">{action} →</button>}</div>; }

function ConversationRow({ item, condensed = false }) {
  return <article className={`conversation-row ${condensed ? "condensed" : ""}`}>
    <span className="round-icon">{item[5]}</span><div className="conversation-title"><b>{item[0]}</b><small>{item[1]}</small></div>
    {!condensed && <><div><small>SIGNAL</small><b className={`status ${item[2].toLowerCase()}`}>● {item[2]}</b></div><div><small>WAITING SINCE</small><b>◷ {item[3]}</b></div></>}
    <div className="suggested"><small>SUGGESTED ACTION</small><b>{item[4]}</b></div><span className="chevron">›</span>
  </article>;
}

function FilterBar({ title, subtitle, icon }) { return <div className="filter-bar"><SectionHeading icon={icon} title={title} subtitle={subtitle}/><div><label className="mini-search"><Search size={13}/><input placeholder="Search teams..." /></label><button className="filter"><Filter size={13}/> Filter</button></div></div>; }

function Overview({ setView }) { return <>
  <div className="dashboard-grid">
    <section className="panel attention"><h2>3 conversations need your attention</h2><p>These items are waiting for your next move.</p>{conversations.slice(0,3).map((c, i) => <ConversationRow item={c} condensed key={i}/>)}</section>
    <section className="panel risk-list"><h2>Emerging risks</h2><p>Potential blockers worth reviewing.</p>{["Mobile release may slow", "Product launch may stall", "Client onboarding may delay"].map((x, i) => <div className="risk-line" key={x}><span>⌁</span><div><b>{x}</b><small>Waiting on QA approval</small></div><em>Impact: {i === 0 ? "High" : i === 1 ? "Medium" : "Low"}</em><i>›</i></div>)}</section>
    <section className="panel insights"><h2>Quick insights</h2><p>A snapshot of what’s happening across teams.</p><div className="stat-grid">{[["97%", "Conversations progressing", "4"], ["4", "Blocked conversations", "!"], ["+18%", "Response time", "↗"], ["3", "Ownership gaps", "⌁"]].map(s => <div className="stat" key={s[1]}><span>{s[2]}</span><b>{s[0]}</b><small>{s[1]}</small></div>)}</div></section>
  </div>
  <section className="panel team-health"><SectionHeading icon="♧" title="Team Health" action="View teams"/><div className="health-list">{teams.slice(0,4).map(t => <button onClick={() => setView("detail")} key={t[0]}><span className="round-icon">{t[1]}</span><b>{t[0]} team</b><small className={t[2] === "Slowing" ? "warn" : "ok"}>● {t[2]}</small></button>)}</div></section>
</>; }

function Attention() { return <section className="workspace-section"><FilterBar icon="♧" title="Needs attention" subtitle="Execution issues that require intervention."/>
  <div className="rows">{[...conversations, ...conversations.slice(0,2)].map((c,i) => <ConversationRow item={c} key={i}/>)}</div></section>; }

function Risks() { const riskNames=["Mobile release", "API Integration", "Design Handoff", "Client Onboarding", "Product Launch", "Security Review"]; return <section className="workspace-section"><FilterBar icon="⌁" title="Emerging Risks" subtitle="Execution issues likely to impact if not addressed."/><div className="risk-cards">{riskNames.map((name,i) => <article className="risk-card" key={name}><span className="round-icon">{["⌁","▣","◌","▧","◈","▦"][i]}</span><h3>{name}</h3><small>{["Engineering Team","Platform Team","Design Team","Customer Success Team","Product Team","Security Team"][i]}</small><h4>Signals</h4><p>• Response Delay<br/>• Ownership Missing<br/>• No New Response</p><h4>Risk</h4><p className={i % 3 === 0 ? "danger" : "warn"}>● {i % 3 === 0 ? "High" : i % 3 === 1 ? "Medium" : "Low"}</p><h4>Suggested action</h4><p>Follow up with team to finalize.</p><i>›</i></article>)}</div></section>; }

function Teams({ setView }) { return <section className="workspace-section"><FilterBar icon="♧" title="Teams" subtitle="High-level view of execution across teams."/><div className="team-cards">{teams.map(t => <button className="team-card" onClick={() => setView("detail")} key={t[0]}><span className="round-icon">{t[1]}</span><h3>{t[0]}</h3><i>›</i><hr/><div><small>□ Execution Health</small><b className={t[2] === "Slowing" ? "warn" : "ok"}>● {t[2]}</b></div><div><small>♧ Needs Attention</small><b>{t[3]}</b></div><div><small>□ Response Health</small><b className="warn">● {t[4]}</b></div><div><small>♧ Ownership Clarity</small><b>● {t[5]}</b></div></button>)}</div></section>; }

function TeamDetail() { return <section className="workspace-section team-detail"><div className="team-banner"><span className="round-icon">⌘</span><h2>Engineering</h2><b className="ok">● HEALTHY</b><span>Ownership: <em>Needs Attention</em></span><small>• Response Health: Normal &nbsp; • Ownership Clarity: 80% &nbsp; • Active Conversations: 12</small></div><section className="panel"><SectionHeading icon="⌘" title="Follow-up Dependencies" subtitle="This team is waiting on other teams to move forward."/><div className="dependency-list">{["Engineering → Infrastructure", "Design → Marketing", "Design → Marketing"].map(x => <div key={x}><span className="round-icon">⌁</span><b>{x}</b><small>6 waiting conversations</small></div>)}</div></section><section className="panel"><SectionHeading icon="▧" title="Open Conversations" subtitle="Follow conversations impacting execution." action="View all conversations"/><div className="rows">{conversations.slice(1).map((c,i)=><ConversationRow item={c} condensed key={i}/>)}</div></section></section>; }

function Sidebar({ view, setView }) { const nav = [["overview", LayoutDashboard, "Command Center"], ["attention", AlertTriangle, "Needs attention", "3"], ["risks", Activity, "Emerging risks", "4"], ["teams", Users, "Teams"]]; return <aside className="sidebar"><div><Logo/><div className="workspace-switch"><span className="workspace-avatar">L</span><div><b>Luci's workspace</b><small>Manager view</small></div><ChevronDown size={14}/></div><p className="nav-label">WORKSPACE</p><nav className="side-nav">{nav.map(([id,Icon,label,count])=><button key={id} className={view===id || (id==="teams" && view==="detail") ? "active" : ""} onClick={()=>setView(id)}><span><Icon size={17}/></span>{label}{count && <em>{count}</em>}</button>)}</nav><p className="nav-label">MANAGE</p><nav className="side-nav"><button><span><FileBarChart size={17}/></span>Reports</button><button><span><Settings size={17}/></span>Workspace settings</button></nav></div><div className="sidebar-bottom"><div className="help-card"><span><Sparkles size={18}/></span><b>Need a hand?</b><small>Explore the manager guide</small><button>View guide <ChevronRight size={12}/></button></div><div className="user-chip"><span>LU</span><div><b>Luci</b><small>Product Manager</small></div><MoreVertical size={16}/></div></div></aside>; }

function Dashboard() { const [view,setView]=useState("overview"); const [theme,setTheme]=useState(() => localStorage.getItem("aira-theme") || "light"); useEffect(() => { localStorage.setItem("aira-theme", theme); }, [theme]); return <main className={`app-layout ${theme}`}><Sidebar view={view} setView={setView}/><div className="dashboard-shell"><AppHeader theme={theme} setTheme={setTheme}/><Tabs view={view} setView={setView}/>{view === "overview" && <Overview setView={setView}/>} {view === "attention" && <Attention/>}{view === "risks" && <Risks/>}{view === "teams" && <Teams setView={setView}/>} {view === "detail" && <TeamDetail/>}</div></main>; }

const attentionItems = [
  ["Infrastructure approval blocking API rollout", "Engineering is waiting on Infrastructure team to approve firewall changes required for the API rollout.", ["Engineering", "Infrastructure", "API rollout"], "Infrastructure Lead", "High", "48h", "18"],
  ["Interview approvals pending for 3 candidates", "Offer approvals are pending with hiring managers for more than 36 hours.", ["Hiring", "Talent Acquisition"], "Hiring Managers", "High", "48h", "18"],
  ["Customer escalation awaiting response", "A key enterprise customer has not received a response regarding the reported issue.", ["Customer success", "Talent Acquisition"], "Customer Success", "Medium", "32h", "9"],
  ["Finance approval required for cloud spend", "Additional cloud spend approval is pending for AWS infrastructure.", ["Finance", "Talent Acquisition"], "Finance Lead", "Medium", "48h", "8"],
  ["Legal review pending for vendor contract", "Vendor contract is waiting for legal review for the last 28 hours.", ["Legal", "Vendor contract"], "Legal Team", "Low", "28h", "5"],
];

const risks = [
  ["Hiring velocity slowing", "Interview feedback delays have included significantly this week and may impact critical hires.", "85", "High", "Talent Acquisition", "Talent"],
  ["Finance approvals taking longer", "Approval turnaround time has increased for procurement and vendor payments.", "65", "Medium", "Finance", "Procurement"],
  ["Marketing campaign response slowing", "External vendor responses for campaign assets are slower than usual.", "32", "Low", "Marketing", "Vendor"],
  ["Hiring velocity slowing", "Interview feedback delays have included significantly this week and may impact critical hires.", "85", "High", "Talent Acquisition", "Talent"],
  ["Hiring velocity slowing", "Interview feedback delays have included significantly this week and may impact critical hires.", "85", "High", "Talent Acquisition", "Talent"],
];

function ExactLogo() { return <div className="exact-logo"><img src="/logo.png" alt="AIRA"/><span>AIRA</span></div>; }
function ExactSidebar({ page, setPage }) { const nav = [["home", Home, "Home"], ["attention", Hand, "Needs Attention"], ["risks", Hand, "Emerging Risks"], ["health", Building2, "Execution Health"], ["brief", CalendarDays, "Weekly Brief"]]; return <aside className="exact-sidebar"><ExactLogo/><nav>{nav.map(([id,Icon,label]) => { const isBrief = id === "brief"; return <button key={id} className={`${page===id || (page==="detail" && id==="attention") ? "active" : ""}${isBrief ? " no-link" : ""}`} onClick={() => !isBrief && setPage(id)}><>
  <Icon size={12} />
  <span>{label}</span>
</></button>; })}</nav><div className="exact-user"><b>Navatej</b><small>Founder & CEO</small></div></aside>; }
function ExactHeader({ title, subtitle }) { return <header className="exact-header"><div><h1>{title}</h1><p>{subtitle}</p></div><button className="notification-bell" aria-label="Notifications"><Bell size={15}/></button></header>; }
function Priority({ value }) {
  const normalized = value && (value === "High" || value === "Medium" || value === "Low") ? `${value} RISK` : value;
  const cls = String(value || '').toLowerCase().replace(/\s+/g, '-');
  return <span className={`priority ${cls}`}>{normalized}</span>;
}
function DetailLink({ children = "View details" }) { return <button className="detail-link">{children} <Arrow /></button>; }
function Arrow() { return <ChevronRight size={14}/>; }
function HomeView({ setPage }) { const cards = [["High impact", "red"], ["Medium", "amber"], ["Low", "green"]]; return <><ExactHeader title="Good morning, Navatej 👋" subtitle="Here’s your execution summary for today."/><section className="exact-section"><div className="section-top"><h2>Needs Attention</h2><DetailLink children="View All"/></div><div className="home-cards">{cards.map(([tag,tone])=><article className={`home-alert ${tone}`} key={tone} onClick={() => setPage("detail")}><div className="alert-title"><span><AlertTriangle size={15}/></span><b>Infrastructure is blocking API rollout</b><MoreVertical size={16}/></div><p>Engineering is waiting on Infrastructure approvals for the past 48 hours.</p><Priority value={tag}/><small>Recommended Action</small><strong>Follow up with Infrastructure Lead</strong><button onClick={() => setPage("detail")}>View Details <Arrow/></button></article>)}</div></section><section className="exact-section"><div className="section-top"><h2>Emerging Risks</h2><DetailLink children="View All"/></div><div className="home-cards risks-home">{[["Hiring velocity slowing","Medium","amber"],["Hiring velocity slowing","High","red"],["Hiring velocity slowing","Low","green"]].map(([title,tag,tone])=><article className={`home-alert ${tone}`} key={`${tag}${tone}`}><div className="alert-title"><span><AlertTriangle size={15}/></span><b>{title}</b></div><p>Interview feedback delays have increased by 35% this week.</p><Priority value={tag}/><button onClick={() => setPage("risks")}>View Details <Arrow/></button></article>)}</div></section><section className="exact-section weekly"><div className="section-top"><h2>Weekly Brief</h2><DetailLink children="View Brief"/></div>{Array.from({ length: 5 }, (_,i)=><p key={i}><span>↗</span> Execution health improved by 6% this week.</p>)}</section></>; }
function Filters({ risks: risksFilter = false }) { return <div className="exact-filters"><div><button className="selected">All <b>{risksFilter ? 23 : 23}</b></button><button>High <b>8</b></button><button>Medium <b>11</b></button><button>Low <b>4</b></button></div><div>{risksFilter ? <button>Sort by risk score <ChevronDown size={11}/></button> : <><button>All Teams <ChevronDown size={11}/></button><button>All Categories <ChevronDown size={11}/></button><button>Sort: Priority <ChevronDown size={11}/></button></>}</div></div>; }
function AttentionList() { return <><ExactHeader title="Needs Attention" subtitle="Items that need your action or decision."/><Filters/><section className="attention-list">{attentionItems.map((item,i)=><article className={`attention-item ${item[4].toLowerCase()}`} key={item[0]}><span className="item-icon"><FileBarChart size={15}/></span><div className="item-summary"><h3>{item[0]}</h3><p>{item[1]}</p><div className="item-tags">{item[2].map((tag,index)=><em key={`${tag}-${index}`} className="item-tag">{tag}</em>)}</div></div><div><small>Waiting for</small><b>{item[3]}</b><small>Waiting since</small><b>{item[5]}</b></div><div><small>Impact</small><b className={`impact-value ${item[4].toLowerCase()}`}><i/> {item[4]}</b><small>Conversations</small><b>{item[6]}</b></div><DetailLink/></article>)}</section><footer className="exact-pagination"><span>Showing 1 to 5 of 15 items</span><div><button><ChevronLeft size={12}/> Back</button><button>1</button><button className="current">2</button><button>3</button><button>4</button><button>5</button><button>Next <ChevronRight size={12}/></button></div></footer></>; }
function AttentionDetail() { return <><ExactHeader title="Needs Attention" subtitle="Items that need your action or decision."/><section className="detail-overview"><p>NEEDS ATTENTION</p><div><h2>Infrastructure is blocking API rollout</h2><span className="priority blue-impact">High Impact</span></div><span>Engineering is waiting on Infrastructure approvals for the past 48 hours.</span><small className="detail-time">Today, <Clock3 size={10}/> 10:42 AM</small><div className="overview-metrics">{[["BLOCKING FOR","48h","Since May 21, 10:30 AM"],["AFFECTED TEAM","Engineering","12 members"],["IMPACT","API Rollout","Customer Portal"],["RISK IF DELAYED","High","Delivery at risk"]].map(x=><div key={x[0]}><small>{x[0]}</small><b>{x[1]}</b><span>{x[2]}</span></div>)}</div></section><section className="happening"><h3>What’s happening</h3><p><b>Engineering requested Infrastructure approval in</b> <strong>#api-integration</strong> 2 days ago.<br/><small>No response yet. 3 follow-ups have been sent with no reply.</small></p></section><section className="recommend"><span><img src="/recommended-action.svg" alt=""/></span><div><small>RECOMMENDED ACTION</small><h3>Follow up with Infrastructure Lead.</h3><p>A quick nudge can help unblock this and keep the rollout on track.</p></div><button><Send size={13}/> Send Nudge</button></section></>; }
function RisksView() { return <><ExactHeader title="Emerging Risks" subtitle="Early warning signals that could become bigger issues if not addressed."/><Filters risks/><section className="risk-table">{risks.map(item=><article className={item[3].toLowerCase()} key={`${item[0]}${item[2]}`}><div className="risk-main"><span><AlertTriangle size={15}/></span><div><h3>{item[0]}</h3><p>{item[1]}</p><div className="risk-tags"><em>{item[4]}</em><em>{item[5]}</em></div></div></div><div className="risk-score"><small>RISK SCORE</small><b>{item[2]}</b><Priority value={item[3]}/></div><div><h4>Why we see this</h4><p>• Avg interview feedback time increased by 20hrs.<br/>• 14 candidates waiting for feedback.<br/>• Feedback pending with 7 managers</p></div><div><h4>Potential Impact & Recommended Action</h4><p>Project delays in the Apollo launch due to loss of key institutional knowledge.</p><small>Recommended action</small><DetailLink children={item[3] === "High" ? "Review retention strategy" : "Follow up with Finance Team"}/></div></article>)}</section><footer className="exact-pagination"><span>Showing 1 to 5 of 15 items</span><div><button><ChevronLeft size={12}/> Back</button><button>1</button><button className="current">2</button><button>3</button><button>4</button><button>5</button><button>Next <ChevronRight size={12}/></button></div></footer></>; }
function HealthView() {
  const health = [
    ["Response Health","How quickly your team responds in conversations","Good","89/100"],
    ["Ownership Clarity","Clarity of ownership and steps in discussions","Fair","78/100"],
    ["Decision Velocity","Speed of making and confirming decisions","Good","88/100"],
    ["Blocked Work","Work items waiting on responses or decisions","Needs Attention","62/100"],
    ["Follow-up Health","Timeliness and quality of follow-ups","Fair","71/100"]
  ];

  // Icons uploaded to public/. Keep filenames in sync with `public/` directory.
  const icons = [
    "/SVG.png",
    "/SVG (1).svg",
    "/SVG (3).svg",
    "/SVG (4).svg",
    "/SVG (5).svg",
  ];

  return <>
    <ExactHeader title="Execution Health" subtitle="Real-time view of how your team is executing."/>
    <div className="health-columns">
      <section>
        <h3>Health by Area</h3>
        {health.map((x,i) => {
          const statusClass = x[2].toLowerCase().replace(/\s+/g, '-');
          const percent = parseInt(x[3], 10) || 0;
          return (
  <article key={x[0]}>
    <span className="health-icon">
      <img src={icons[i]} alt={x[0]} />
    </span>

    <div>
      <b>{x[0]}</b>
      <p>{x[1]}</p>
    </div>

    <div className="health-status">
    <Priority value={x[2]} />
</div>

    <div className={`meter ${statusClass}`}>
      <i>
        <span style={{ width: `${percent}%` }} />
      </i>

      {(() => {
        const [num, den] = String(x[3]).split("/");

        return (
          <em>
            <strong className="numerator">{num}</strong>/
            <span className="denom">{den}</span>
          </em>
        );
      })()}
    </div>
  </article>
);
})} </section>
      <section className="health-feed">
        <h3>What’s Driving Your Score</h3>
        {[
  {
    title: "Decisions happening faster",
    text: "Decision velocity improved by 10% across key projects.",
    icon: 7,
    type: "green",
  },
  {
    title: "Blocked work increased",
    text: "More threads are waiting on responses for over 24 hours.",
    icon: 8,
    type: "amber",
  },
  {
    title: "Ownership gaps detected",
    text: "12 conversations have unclear ownership or next steps.",
    icon: 8,
    type: "amber",
  },
  {
    title: "Decisions happening faster",
    text: "Decision velocity improved by 10% across key projects.",
    icon: 7,
    type: "green",
  },
  {
    title: "Ownership gaps detected",
    text: "12 conversations have unclear ownership or next steps.",
    icon: 8,
    type: "amber",
  },
  {
    title: "Decisions happening faster",
    text: "Decision velocity improved by 10% across key projects.",
    icon: 7,
    type: "green",
  },
].map((item, i) => (
  <p key={i} className={`health-feed-item ${item.type}`}>
    <span>
      <img src={`/SVG (${item.icon}).svg`} alt="" />
    </span>
    <b>{item.title}</b>
    <small>{item.text}</small>
  </p>
))}
      </section>
    </div>
    <section className="trend">
      <div><h3>Health Trend</h3><button>Last 4 Weeks <ChevronDown size={11}/></button></div>
<div className="trend-chart">
  <div className="y-axis">
    <span>100</span>
    <span>75</span>
    <span>50</span>
    <span>20</span>
    <span>0</span>
  </div>

  <div className="chart-area">
    <svg viewBox="0 0 700 180" preserveAspectRatio="none">
      <defs>
        <linearGradient id="healthFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6C63FF" stopOpacity="0.55"/>
          <stop offset="100%" stopColor="#6C63FF" stopOpacity="0.05"/>
        </linearGradient>
      </defs>

      {/* Grid */}
      <line x1="0" y1="20" x2="700" y2="20" className="grid"/>
      <line x1="0" y1="60" x2="700" y2="60" className="grid"/>
      <line x1="0" y1="100" x2="700" y2="100" className="grid"/>
      <line x1="0" y1="140" x2="700" y2="140" className="grid"/>

      {/* Filled Area */}
      <path
        fill="url(#healthFill)"
        d="M0 170
           L80 160
           L180 130
           L300 75
           L420 85
           L520 120
           L620 80
           L700 50
           L700 180
           L0 180 Z"
      />

      {/* Line */}
      <path
  d="M0 170
     L80 160
     L180 130
     L300 75
     L420 85
     L520 120
     L620 80
     L700 50"
  fill="none"
  stroke="#6C63FF"
  strokeWidth="2"
  strokeDasharray="0.1 6"
  strokeLinecap="round"
/>
    </svg>

    <div className="months">
      <span>Jan</span>
      <span>Feb</span>
      <span>Mar</span>
      <span>Apr</span>
      <span>May</span>
      <span>Jun</span>
      <span>Jul</span>
      <span>2023</span>
    </div>
  </div>
</div>      
    </section>
  </>;
}
function ExactDashboard({ legacyDashboard }) { const [page,setPage]=useState("home"); const content = page === "home" ? <HomeView setPage={setPage}/> : page === "attention" ? <AttentionList/> : page === "detail" ? <AttentionDetail/> : page === "risks" ? <RisksView/> : page === "health" ? <HealthView/> : <HomeView setPage={setPage}/>; return <main className="exact-app" data-legacy={Boolean(legacyDashboard)}><ExactSidebar page={page} setPage={setPage}/><div className="exact-content">{content}</div></main>; }

function Auth() { const [screen,setScreen]=useState("login"); const [signedIn,setSignedIn]=useState(false); if(signedIn) return <ExactDashboard legacyDashboard={Dashboard}/>; const create=screen==="create"; return <main className={`auth ${create ? "create" : ""}`}><aside className="auth-art">{create ? <><div className="orb">●</div><Logo/><p>Operational awareness.<br/>Connected teams.<br/><b>Better decisions.</b></p></> : <img src={hero} alt="AIRA workspace preview"/>}</aside><section className="auth-panel"><Logo/><div className="auth-content"><h1>{create ? "Create Your Password" : "Welcome to "}<em>{create ? "" : "AIRA"}</em></h1><p>{create ? "Your account has been activated using a temporary password. Create a new password to continue." : "Sign in to continue to your workspace"}</p>{create ? <><Input label="Previous Password" type="password"/><Input label="New Password" type="password"/><div className="strength"><i/><i/><i/><i/><span>Strong</span></div><Input label="Confirm New Password" type="password"/><div className="requirements">◉ At least 8 characters &nbsp; ◉ One number<br/>◉ One uppercase letter &nbsp; ◉ One special character</div><button className="primary" onClick={()=>setSignedIn(true)}>Create Password</button></> : <><Input label="Work Email" placeholder="you@company.com"/><Input label="Password" type="password" placeholder="Enter your password"/><div className="remember"><label><input type="checkbox"/> Remember me</label><button onClick={()=>setScreen("create")}>Forgot Password?</button></div><button className="primary" onClick={()=>setSignedIn(true)}>Sign In</button><div className="help">Need Help?<br/><a>Contact your administrator</a></div></>}<div className="help auth-footer">Need Help?<br/><a>Contact your administrator</a></div></div></section></main>; }
function Input({label,type="text",placeholder}) {return <label className="field"><span>{label}</span><div><i>{type==="password"?<LockKeyhole size={15}/>:<Mail size={15}/>}</i><input type={type} placeholder={placeholder}/>{type==="password"&&<i><CircleHelp size={15}/></i>}</div></label>}

export { Auth };

export default function App() { return <ExactDashboard legacyDashboard={Dashboard}/>; }
