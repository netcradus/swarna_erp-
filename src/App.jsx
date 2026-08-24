import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import {
  Gem, ShieldCheck, Users, Package, Diamond, Hammer, RefreshCcw, Building2,
  Receipt, BarChart3, Lock, Cloud, Smartphone, Laptop, Monitor, Tablet,
  CheckCircle2, ArrowRight, Menu, X, TrendingUp, MapPin, ClipboardList,
  FileText, Scale, Coins, ShoppingBag, ChevronRight, KeyRound, Activity,
  History, DatabaseBackup, Wallet, Boxes,
  Fingerprint, Layers, Sparkles
} from "lucide-react";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip,
  PieChart, Pie, Cell, BarChart, Bar, CartesianGrid,
} from "recharts";

import { AuthProvider } from "./auth/AuthContext";
import { ProtectedRoute } from "./auth/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import DashboardPage from "./pages/DashboardPage";
import PoweredByBadge from "./components/common/PoweredByBadge";

/* ------------------------------------------------------------------ */
/*  Design tokens                                                      */
/* ------------------------------------------------------------------ */
const GOLD = "#C9A227";
const GOLD_LIGHT = "#E8CD7A";
const DIAMOND = "#BFE9F7";

/* ------------------------------------------------------------------ */
/*  Reveal-on-scroll hook                                              */
/* ------------------------------------------------------------------ */
function useReveal() {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setShown(true)),
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, shown];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, shown] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: shown ? "translateY(0)" : "translateY(24px)",
        opacity: shown ? 1 : 0,
        transition: `opacity 0.7s cubic-bezier(.2,.7,.2,1) ${delay}ms, transform 0.7s cubic-bezier(.2,.7,.2,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Animated counter                                                   */
/* ------------------------------------------------------------------ */
function Counter({ to, prefix = "", suffix = "", decimals = 0 }) {
  const [ref, shown] = useReveal();
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!shown) return;
    let raf;
    const start = performance.now();
    const dur = 1400;
    const tick = (now) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(to * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [shown, to]);
  return (
    <span ref={ref}>
      {prefix}
      {val.toLocaleString("en-IN", { maximumFractionDigits: decimals, minimumFractionDigits: decimals })}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Section eyebrow                                                    */
/* ------------------------------------------------------------------ */
function Eyebrow({ children }) {
  return (
    <div className="eyebrow">
      <span className="eyebrow-dot" />
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Navbar                                                             */
/* ------------------------------------------------------------------ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = ["Home", "Features", "Modules", "Solutions", "Why Us", "Contact"];
  return (
    <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <div className="nav__inner">
        <a href="#home" className="nav__brand">
          <span className="nav__mark">
            <Gem size={18} strokeWidth={1.6} />
          </span>
          <span className="nav__brand-text">
            Svarna<span className="nav__brand-accent">ERP</span>
          </span>
          <PoweredByBadge />
        </a>

        <nav className="nav__links">
          {links.map((l) => (
            <a key={l} href={`#${l.toLowerCase().replace(/\s+/g, "-")}`} className="nav__link">
              {l}
            </a>
          ))}
        </nav>

        <div className="nav__actions">
          <Link to="/login" className="nav__login">Login</Link>
          <a href="#demo" className="btn btn--gold btn--sm">
            Book a Demo
          </a>
        </div>

        <button className="nav__burger" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="nav__mobile">
          {links.map((l) => (
            <a key={l} href={`#${l.toLowerCase().replace(/\s+/g, "-")}`} onClick={() => setOpen(false)}>
              {l}
            </a>
          ))}
          <div className="nav__mobile-actions">
            <Link to="/login" className="nav__login" onClick={() => setOpen(false)}>Login</Link>
            <a href="#demo" className="btn btn--gold btn--sm">Book a Demo</a>
          </div>
        </div>
      )}
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero — signature gold-calculation widget                           */
/* ------------------------------------------------------------------ */
function GoldCalcSignature() {
  const [gross, setGross] = useState(18.4);
  const rate = 7412; // illustrative per-gram 22K rate
  const purity = 0.916;
  const wastagePct = 6;
  const fine = gross * purity;
  const netAfterWastage = fine + fine * (wastagePct / 100);
  const amount = netAfterWastage * rate;

  return (
    <div className="calc">
      <div className="calc__head">
        <Scale size={14} strokeWidth={1.6} />
        <span>Live Fine-Weight Calculation</span>
      </div>

      <label className="calc__slider">
        <span>Gross Weight</span>
        <input
          type="range"
          min="2"
          max="60"
          step="0.1"
          value={gross}
          onChange={(e) => setGross(parseFloat(e.target.value))}
        />
        <b>{gross.toFixed(1)} g</b>
      </label>

      <div className="calc__grid">
        <div>
          <span>Purity</span>
          <b>22K · 91.6%</b>
        </div>
        <div>
          <span>Wastage</span>
          <b>{wastagePct}%</b>
        </div>
        <div>
          <span>Fine Weight</span>
          <b>{netAfterWastage.toFixed(2)} g</b>
        </div>
        <div>
          <span>Gold Rate</span>
          <b>₹{rate.toLocaleString("en-IN")}/g</b>
        </div>
      </div>

      <div className="calc__total">
        <span>Payable Amount</span>
        <strong>₹{Math.round(amount).toLocaleString("en-IN")}</strong>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero__glow" aria-hidden="true" />
      <div className="hero__inner">
        <Reveal>
          <div className="hero__eyebrow">
            <Sparkles size={14} strokeWidth={1.6} />
            Built for jewellers, not adapted for them
          </div>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="hero__title">
            The Smarter ERP<br />Built for <span className="text-gold">Modern Jewellers</span>
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="hero__sub">
            Manage inventory, gold rates, diamonds, billing, customers, karigars,
            branches and accounts — all from one powerful jewellery management platform.
          </p>
        </Reveal>

        <Reveal delay={240}>
          <div className="hero__ctas">
            <a href="#demo" className="btn btn--gold">
              Book a Free Demo <ArrowRight size={16} />
            </a>
            <a href="#features" className="btn btn--ghost">
              Explore Features
            </a>
          </div>
        </Reveal>

        <Reveal delay={320}>
          <div className="hero__trust">
            {["Secure", "Cloud Based", "Real-Time", "Multi-Branch"].map((t) => (
              <span key={t}>
                <CheckCircle2 size={14} strokeWidth={1.8} /> {t}
              </span>
            ))}
          </div>
        </Reveal>

        <div className="hero__visual">
          <Reveal delay={200}>
            <div className="dash-mock dash-mock--float">
              <div className="dash-mock__bar">
                <div className="dash-mock__dots">
                  <span /><span /><span />
                </div>
                <span className="dash-mock__title">Overview · Today</span>
              </div>

              <div className="dash-mock__stats">
                <div className="dash-stat">
                  <span>Today's Sales</span>
                  <b><Counter to={438200} prefix="₹" /></b>
                </div>
                <div className="dash-stat">
                  <span>Gold Rate (22K)</span>
                  <b><Counter to={7412} prefix="₹" suffix="/g" /></b>
                </div>
                <div className="dash-stat">
                  <span>Total Inventory</span>
                  <b><Counter to={12450} suffix=" items" /></b>
                </div>
                <div className="dash-stat">
                  <span>Pending Orders</span>
                  <b><Counter to={64} /></b>
                </div>
              </div>

              <div className="dash-mock__chart-area">
                <div className="dash-mock__chart">
                  <ResponsiveContainer width="100%" height={120}>
                    <AreaChart data={salesTrend}>
                      <defs>
                        <linearGradient id="heroFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={GOLD} stopOpacity={0.5} />
                          <stop offset="100%" stopColor={GOLD} stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <Area type="monotone" dataKey="v" stroke={GOLD} strokeWidth={2} fill="url(#heroFill)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="hero__calc-wrap">
                  <GoldCalcSignature />
                </div>
              </div>

              <div className="dash-mock__foot">
                <div>
                  <span>Customer Outstanding</span>
                  <b>₹2,84,600</b>
                </div>
                <div>
                  <span>Branch Performance</span>
                  <b className="text-gold">▲ 12.4%</b>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="float-card float-card--1">
            <Coins size={16} strokeWidth={1.6} />
            <div>
              <span>Gold Rate</span>
              <b>₹74,120 / 10g</b>
            </div>
          </div>
          <div className="float-card float-card--2">
            <Wallet size={16} strokeWidth={1.6} />
            <div>
              <span>Today's Sales</span>
              <b>₹4,38,200</b>
            </div>
          </div>
          <div className="float-card float-card--3">
            <Boxes size={16} strokeWidth={1.6} />
            <div>
              <span>Inventory</span>
              <b>12,450 Items</b>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const salesTrend = [
  { v: 30 }, { v: 42 }, { v: 38 }, { v: 55 }, { v: 48 }, { v: 66 }, { v: 60 }, { v: 78 },
];

/* ------------------------------------------------------------------ */
/*  Problem section                                                    */
/* ------------------------------------------------------------------ */
const problems = [
  { icon: Package, title: "Manual Inventory", body: "Track gold, silver, diamonds and jewellery items without spreadsheets." },
  { icon: Scale, title: "Complex Gold Calculations", body: "Handle purity, fine weight, wastage and making charges efficiently." },
  { icon: Hammer, title: "Karigar Tracking", body: "Track material issued, production and finished jewellery." },
  { icon: Building2, title: "Multiple Branches", body: "Manage inventory and sales across multiple stores." },
  { icon: Wallet, title: "Customer Outstanding", body: "Keep customer balances and payment records organized." },
  { icon: BarChart3, title: "Scattered Reports", body: "Get business insights from one centralized system." },
];

function ProblemSection() {
  return (
    <section className="section">
      <div className="container">
        <Reveal>
          <Eyebrow>The problem</Eyebrow>
          <h2 className="h2">Jewellery Business Management<br />Shouldn't Be Complicated</h2>
        </Reveal>

        <div className="grid-3">
          {problems.map((p, i) => (
            <Reveal key={p.title} delay={i * 60}>
              <div className="problem-card">
                <div className="problem-card__icon">
                  <p.icon size={20} strokeWidth={1.6} />
                </div>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="transition-line">
            <span className="rule" />
            <p>One ERP. Complete Jewellery Business Control.</p>
            <span className="rule" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Core features                                                      */
/* ------------------------------------------------------------------ */
const coreFeatures = [
  { icon: Package, title: "Jewellery Inventory Management", body: "Item-level tracking by weight, purity, design and stock location." },
  { icon: Coins, title: "Gold & Silver Rate Management", body: "Live rate updates applied automatically across billing and valuation." },
  { icon: Diamond, title: "Diamond Management", body: "Carat, cut, colour, clarity and certification tracked per stone." },
  { icon: Receipt, title: "POS & Smart Billing", body: "Fast, accurate billing with automatic making-charge calculation." },
  { icon: Users, title: "Customer CRM", body: "Purchase history, preferences and outstanding balances in one place." },
  { icon: Hammer, title: "Karigar & Job Work Management", body: "Issue material, track production and reconcile finished goods." },
  { icon: RefreshCcw, title: "Old Gold Purchase", body: "Purity testing, valuation and exchange handled in a single flow." },
  { icon: ShoppingBag, title: "Purchase & Supplier Management", body: "Purchase orders, supplier ledgers and incoming stock in sync." },
  { icon: Building2, title: "Multi-Branch Management", body: "Centralised control over inventory, sales and staff across stores." },
  { icon: FileText, title: "Accounting & GST", body: "Books, tax filing and compliance built into everyday operations." },
  { icon: BarChart3, title: "Business Reports & Analytics", body: "Real-time visibility into sales, stock, karigars and branches." },
  { icon: KeyRound, title: "Role-Based Access Control", body: "Granular permissions by role, branch and module." },
];

function CoreFeatures() {
  return (
    <section id="features" className="section section--alt">
      <div className="container">
        <Reveal>
          <Eyebrow>Core platform</Eyebrow>
          <h2 className="h2">Everything Your Jewellery<br />Business Needs</h2>
        </Reveal>

        <div className="grid-4">
          {coreFeatures.map((f, i) => (
            <Reveal key={f.title} delay={(i % 4) * 60}>
              <div className="feature-card">
                <div className="feature-card__icon">
                  <f.icon size={18} strokeWidth={1.6} />
                </div>
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Jewellery-specific panels                                          */
/* ------------------------------------------------------------------ */
function GoldPanelVisual() {
  return (
    <div className="panel-visual panel-visual--gold">
      <div className="pv-row"><span>Gross Weight</span><b>18.400 g</b></div>
      <div className="pv-row"><span>Purity (22K)</span><b>91.6%</b></div>
      <div className="pv-row"><span>Fine Weight</span><b>16.854 g</b></div>
      <div className="pv-row"><span>Wastage</span><b>6.0%</b></div>
      <div className="pv-row"><span>Making Charges</span><b>₹450 / g</b></div>
      <div className="pv-divider" />
      <div className="pv-row pv-row--total"><span>Live Rate × Fine Wt.</span><b className="text-gold">₹1,24,930</b></div>
    </div>
  );
}

function DiamondPanelVisual() {
  const rows = [
    { l: "Carat", v: "1.20 ct" },
    { l: "Cut", v: "Excellent" },
    { l: "Colour", v: "VVS · F" },
    { l: "Clarity", v: "VVS1" },
    { l: "Certification", v: "IGI" },
  ];
  return (
    <div className="panel-visual panel-visual--diamond">
      <div className="diamond-shape">
        <Diamond size={40} strokeWidth={1} color={DIAMOND} />
      </div>
      <div className="pv-rows-compact">
        {rows.map((r) => (
          <div key={r.l} className="pv-row">
            <span>{r.l}</span>
            <b>{r.v}</b>
          </div>
        ))}
      </div>
    </div>
  );
}

function KarigarPanelVisual() {
  const steps = ["Job Allocated", "Material Issued", "In Production", "Finished Goods", "Reconciled"];
  return (
    <div className="panel-visual panel-visual--flow">
      {steps.map((s, i) => (
        <React.Fragment key={s}>
          <div className={`flow-step ${i === 2 ? "flow-step--active" : ""}`}>
            <span className="flow-step__index">{String(i + 1).padStart(2, "0")}</span>
            {s}
          </div>
          {i < steps.length - 1 && <span className="flow-arrow" />}
        </React.Fragment>
      ))}
    </div>
  );
}

function OldGoldPanelVisual() {
  return (
    <div className="panel-visual panel-visual--oldgold">
      <div className="pv-row"><span>Customer</span><b>Old Gold Chain</b></div>
      <div className="pv-row"><span>Purity Tested</span><b>18K · 75.0%</b></div>
      <div className="pv-row"><span>Weight</span><b>22.10 g</b></div>
      <div className="pv-row"><span>Valuation</span><b>₹1,15,420</b></div>
      <div className="pv-divider" />
      <div className="pv-row pv-row--total"><span>Adjusted Against New Purchase</span><b className="text-gold">−₹1,15,420</b></div>
    </div>
  );
}

const jewelleryPanels = [
  { key: "gold", icon: Coins, title: "Gold Management", body: "Gross weight, net weight, purity, fine weight, making charges and wastage — calculated automatically against the live gold rate.", visual: GoldPanelVisual },
  { key: "diamond", icon: Diamond, title: "Diamond Management", body: "Track every stone by carat, cut, colour, clarity and certification, with a dedicated diamond inventory ledger.", visual: DiamondPanelVisual },
  { key: "karigar", icon: Hammer, title: "Karigar & Job Work", body: "Allocate jobs, issue material, follow production, receive finished goods and reconcile labour charges.", visual: KarigarPanelVisual },
  { key: "oldgold", icon: RefreshCcw, title: "Old Gold Management", body: "Test purity, record weight, value old gold and adjust it directly against a new purchase.", visual: OldGoldPanelVisual },
];

function JewelleryFeatures() {
  return (
    <section id="modules" className="section">
      <div className="container">
        <Reveal>
          <Eyebrow>Purpose-built</Eyebrow>
          <h2 className="h2">Built Specifically for<br />Jewellery Businesses</h2>
        </Reveal>

        <div className="panels">
          {jewelleryPanels.map((p, i) => (
            <Reveal key={p.key} delay={i * 80}>
              <div className={`panel panel--${i % 2 === 0 ? "l" : "r"}`}>
                <div className="panel__text">
                  <div className="panel__icon">
                    <p.icon size={20} strokeWidth={1.6} />
                  </div>
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                </div>
                <div className="panel__visual">
                  <p.visual />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Workflow                                                            */
/* ------------------------------------------------------------------ */
const workflowSteps = [
  { icon: ShoppingBag, label: "Purchase" },
  { icon: Package, label: "Inventory" },
  { icon: Hammer, label: "Karigar" },
  { icon: Layers, label: "Production" },
  { icon: Boxes, label: "Stock" },
  { icon: Receipt, label: "Billing" },
  { icon: Users, label: "Customer" },
  { icon: FileText, label: "Accounts" },
];

function Workflow() {
  return (
    <section id="solutions" className="section section--alt">
      <div className="container">
        <Reveal>
          <Eyebrow>End to end</Eyebrow>
          <h2 className="h2">From Purchase to Sale —<br />Everything Connected</h2>
        </Reveal>

        <Reveal delay={100}>
          <div className="workflow">
            {workflowSteps.map((s, i) => (
              <React.Fragment key={s.label}>
                <div className="workflow__step">
                  <div className="workflow__icon">
                    <s.icon size={18} strokeWidth={1.6} />
                  </div>
                  <span>{s.label}</span>
                </div>
                {i < workflowSteps.length - 1 && <span className="workflow__line" />}
              </React.Fragment>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Dashboard / Analytics preview                                      */
/* ------------------------------------------------------------------ */
const inventoryMix = [
  { name: "Gold", value: 54, color: GOLD },
  { name: "Diamond", value: 21, color: DIAMOND },
  { name: "Silver", value: 15, color: "#B9B9BE" },
  { name: "Others", value: 10, color: "#6B6660" },
];

const branchPerf = [
  { name: "Delhi", v: 82 }, { name: "Noida", v: 64 }, { name: "GZB", v: 58 },
  { name: "Jaipur", v: 71 }, { name: "Mumbai", v: 90 },
];

function DashboardPreview() {
  const stats = [
    { icon: TrendingUp, label: "Today's Revenue", value: "₹4,38,200" },
    { icon: BarChart3, label: "Monthly Sales", value: "₹1.28 Cr" },
    { icon: Coins, label: "Gold Stock", value: "38.2 kg" },
    { icon: Diamond, label: "Diamond Stock", value: "912 ct" },
    { icon: Wallet, label: "Outstanding", value: "₹9.4 L" },
    { icon: ClipboardList, label: "Orders", value: "64 Open" },
    { icon: Building2, label: "Branch Performance", value: "5 Stores" },
  ];
  return (
    <section className="section">
      <div className="container">
        <Reveal>
          <Eyebrow>Live visibility</Eyebrow>
          <h2 className="h2">Know Your Jewellery<br />Business in Real Time</h2>
        </Reveal>

        <Reveal delay={100}>
          <div className="analytics">
            <div className="analytics__stats">
              {stats.map((s) => (
                <div key={s.label} className="analytics__stat">
                  <s.icon size={16} strokeWidth={1.6} />
                  <div>
                    <span>{s.label}</span>
                    <b>{s.value}</b>
                  </div>
                </div>
              ))}
            </div>

            <div className="analytics__charts">
              <div className="chart-card">
                <h4>Sales Overview</h4>
                <ResponsiveContainer width="100%" height={160}>
                  <AreaChart data={salesTrend.concat([{ v: 70 }, { v: 82 }])}>
                    <defs>
                      <linearGradient id="salesFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={GOLD} stopOpacity={0.45} />
                        <stop offset="100%" stopColor={GOLD} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis hide dataKey="v" />
                    <YAxis hide />
                    <Tooltip contentStyle={{ background: "#141317", border: "1px solid rgba(201,162,39,0.25)", borderRadius: 8, fontSize: 12 }} />
                    <Area type="monotone" dataKey="v" stroke={GOLD} strokeWidth={2} fill="url(#salesFill)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="chart-card">
                <h4>Inventory Distribution</h4>
                <ResponsiveContainer width="100%" height={160}>
                  <PieChart>
                    <Pie data={inventoryMix} dataKey="value" innerRadius={38} outerRadius={62} paddingAngle={3}>
                      {inventoryMix.map((d) => (
                        <Cell key={d.name} fill={d.color} stroke="none" />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ background: "#141317", border: "1px solid rgba(201,162,39,0.25)", borderRadius: 8, fontSize: 12 }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="chart-legend">
                  {inventoryMix.map((d) => (
                    <span key={d.name}><i style={{ background: d.color }} />{d.name}</span>
                  ))}
                </div>
              </div>

              <div className="chart-card chart-card--wide">
                <h4>Branch Performance</h4>
                <ResponsiveContainer width="100%" height={150}>
                  <BarChart data={branchPerf}>
                    <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.06)" />
                    <XAxis dataKey="name" tick={{ fill: "#9C978C", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis hide />
                    <Tooltip contentStyle={{ background: "#141317", border: "1px solid rgba(201,162,39,0.25)", borderRadius: 8, fontSize: 12 }} />
                    <Bar dataKey="v" fill={GOLD} radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Multi-branch                                                       */
/* ------------------------------------------------------------------ */
const branches = ["Delhi", "Noida", "Ghaziabad", "Jaipur", "Mumbai"];
const branchCaps = ["Branch Inventory", "Sales", "Transfers", "Customers", "Employees", "Reports"];

function MultiBranch() {
  return (
    <section className="section section--alt">
      <div className="container">
        <Reveal>
          <Eyebrow>Multi-branch</Eyebrow>
          <h2 className="h2">One Platform.<br />Every Store.</h2>
        </Reveal>

        <Reveal delay={100}>
          <div className="branch-net">
            <div className="branch-net__hub">
              <Building2 size={22} strokeWidth={1.6} />
              <span>Head Office</span>
            </div>
            {branches.map((b, i) => (
              <div key={b} className="branch-net__node" style={{ "--i": i }}>
                <MapPin size={14} strokeWidth={1.6} />
                {b}
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={160}>
          <div className="branch-caps">
            {branchCaps.map((c) => (
              <span key={c}>{c}</span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Security                                                           */
/* ------------------------------------------------------------------ */
const securityItems = [
  { icon: KeyRound, title: "Role-Based Access Control", body: "Permissions scoped precisely to each person's responsibility." },
  { icon: Fingerprint, title: "Secure Authentication", body: "Modern authentication safeguards every login attempt." },
  { icon: Activity, title: "Activity Logs", body: "Every action recorded, searchable and time-stamped." },
  { icon: History, title: "Audit Trail", body: "Full history of changes across inventory and accounts." },
  { icon: Building2, title: "Branch-Level Permissions", body: "Control exactly what each branch and role can see." },
  { icon: DatabaseBackup, title: "Data Backup", body: "Continuous backups keep business data safe and recoverable." },
  { icon: Lock, title: "Permission Management", body: "Fine-grained control across every module and workflow." },
];

function Security() {
  return (
    <section className="section section--dark">
      <div className="hallmark-bg" aria-hidden="true" />
      <div className="container">
        <Reveal>
          <Eyebrow>Trust & security</Eyebrow>
          <h2 className="h2">Your Jewellery Business.<br />Your Data. Protected.</h2>
        </Reveal>

        <div className="grid-4">
          {securityItems.map((s, i) => (
            <Reveal key={s.title} delay={(i % 4) * 60}>
              <div className="security-card">
                <div className="security-card__icon">
                  <s.icon size={18} strokeWidth={1.6} />
                </div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Reports                                                             */
/* ------------------------------------------------------------------ */
const reports = [
  "Sales Report", "Stock Report", "Gold Report", "Diamond Report", "Purchase Report",
  "Customer Report", "Karigar Report", "Profit & Loss", "GST Report", "Branch Report",
];

function Reports() {
  return (
    <section className="section">
      <div className="container">
        <Reveal>
          <Eyebrow>Reports</Eyebrow>
          <h2 className="h2">Turn Your Data Into<br />Better Decisions</h2>
        </Reveal>

        <Reveal delay={100}>
          <div className="reports-grid">
            {reports.map((r) => (
              <div key={r} className="report-chip">
                <FileText size={15} strokeWidth={1.6} />
                {r}
                <ChevronRight size={14} className="report-chip__arrow" />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Why choose us                                                       */
/* ------------------------------------------------------------------ */
function WhyUs() {
  const traditional = ["Complicated", "Fragmented", "Manual", "Limited visibility", "Difficult reporting"];
  const modern = ["Centralised", "Real-time", "Automated", "Multi-branch", "Secure", "Scalable"];
  return (
    <section id="why-us" className="section section--alt">
      <div className="container">
        <Reveal>
          <Eyebrow>Why us</Eyebrow>
          <h2 className="h2">Designed for the Way Jewellery<br />Businesses Actually Work</h2>
        </Reveal>

        <div className="compare">
          <Reveal delay={60}>
            <div className="compare-card">
              <h3>Traditional Software</h3>
              <ul>
                {traditional.map((t) => (
                  <li key={t}><X size={14} strokeWidth={2} /> {t}</li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={140}>
            <div className="compare-card compare-card--gold">
              <h3>Svarna ERP</h3>
              <ul>
                {modern.map((t) => (
                  <li key={t}><CheckCircle2 size={14} strokeWidth={2} /> {t}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Mobile / cloud                                                      */
/* ------------------------------------------------------------------ */
function MobileCloud() {
  const devices = [
    { icon: Monitor, label: "Desktop" },
    { icon: Laptop, label: "Laptop" },
    { icon: Tablet, label: "Tablet" },
    { icon: Smartphone, label: "Mobile" },
  ];
  const points = ["Cloud Access", "Real-Time Data", "Anywhere Access", "Responsive Interface"];
  return (
    <section className="section">
      <div className="container">
        <Reveal>
          <Eyebrow>Anywhere access</Eyebrow>
          <h2 className="h2">Your Business Doesn't<br />Stop at the Store</h2>
        </Reveal>

        <Reveal delay={100}>
          <div className="devices">
            {devices.map((d, i) => (
              <div key={d.label} className={`device device--${d.label.toLowerCase()}`} style={{ "--i": i }}>
                <d.icon size={i === 0 ? 30 : i === 3 ? 18 : 24} strokeWidth={1.3} />
                <span>{d.label}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={160}>
          <div className="cloud-points">
            {points.map((p) => (
              <span key={p}><Cloud size={14} strokeWidth={1.8} /> {p}</span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  CTA                                                                 */
/* ------------------------------------------------------------------ */
function CTA() {
  return (
    <section id="demo" className="cta">
      <div className="cta__glow" aria-hidden="true" />
      <Reveal>
        <h2 className="h2">Ready to Take Your Jewellery<br />Business Digital?</h2>
        <p className="cta__sub">
          Bring inventory, billing, customers, karigars, branches and accounts
          together with one powerful jewellery ERP.
        </p>
        <div className="cta__actions">
          <a href="#demo" className="btn btn--gold">Book a Free Demo <ArrowRight size={16} /></a>
          <a href="#contact" className="btn btn--ghost">Talk to Our Team</a>
        </div>
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Footer                                                              */
/* ------------------------------------------------------------------ */
function Footer() {
  const cols = [
    { title: "Product", links: ["Features", "Modules", "Solutions", "Pricing", "Security"] },
    { title: "Business", links: ["About Us", "Contact", "Book Demo", "Partners"] },
    { title: "Resources", links: ["Documentation", "Blog", "FAQs", "Support"] },
    { title: "Legal", links: ["Privacy Policy", "Terms", "Security"] },
  ];
  return (
    <footer id="contact" className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <span className="nav__mark">
              <Gem size={18} strokeWidth={1.6} />
            </span>
            <span className="nav__brand-text">
              Svarna<span className="nav__brand-accent">ERP</span>
            </span>
            <p>Complete jewellery business management, from the karigar's bench to the balance sheet.</p>
          </div>

          {cols.map((c) => (
            <div key={c.title} className="footer__col">
              <h4>{c.title}</h4>
              {c.links.map((l) => (
                <a key={l} href="#">{l}</a>
              ))}
            </div>
          ))}
        </div>
        <div className="footer__bottom">
          <span>© 2026 Svarna ERP. All rights reserved.</span>
          <span className="footer__hallmark">
            <ShieldCheck size={14} strokeWidth={1.6} /> ISO-grade data security
          </span>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  Global styles                                                       */
/* ------------------------------------------------------------------ */
function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400&family=Manrope:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500&display=swap');

      * { box-sizing: border-box; }
      .jerp {
        --bg: #0A0A0B;
        --bg-elevated: #131217;
        --panel: #16151A;
        --gold: ${GOLD};
        --gold-light: ${GOLD_LIGHT};
        --diamond: ${DIAMOND};
        --ivory: #F3EFE6;
        --muted: #9C978C;
        --line: rgba(255,255,255,0.08);
        background: var(--bg);
        color: var(--ivory);
        font-family: 'Manrope', sans-serif;
        overflow-x: hidden;
        position: relative;
        min-height: 100vh;
      }
      .jerp .mono { font-family: 'IBM Plex Mono', monospace; }
      .jerp h1, .jerp h2, .jerp h3 { font-family: 'Fraunces', serif; font-weight: 500; letter-spacing: -0.01em; margin: 0; }
      .jerp p { color: var(--muted); line-height: 1.6; margin: 0; }
      .jerp a { text-decoration: none; color: inherit; }
      .jerp .text-gold { color: var(--gold-light); }

      .container { max-width: 1180px; margin: 0 auto; padding: 0 24px; }
      .section { position: relative; padding: 110px 0; }
      .section--alt { background: linear-gradient(180deg, transparent, rgba(255,255,255,0.015), transparent); }
      .section--dark { background: #08070A; }
      .h2 { font-size: clamp(28px, 3.6vw, 42px); line-height: 1.15; margin: 14px 0 46px; }

      .eyebrow { display: inline-flex; align-items: center; gap: 8px; font-family: 'IBM Plex Mono', monospace; font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--gold-light); }
      .eyebrow-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--gold); box-shadow: 0 0 10px var(--gold); }

      .btn { display: inline-flex; align-items: center; gap: 8px; padding: 14px 26px; border-radius: 10px; font-weight: 600; font-size: 14.5px; border: 1px solid transparent; transition: transform .25s ease, box-shadow .25s ease, background .25s ease; cursor: pointer; }
      .btn--sm { padding: 10px 18px; font-size: 13.5px; }
      .btn--gold { background: linear-gradient(135deg, var(--gold-light), var(--gold) 60%); color: #171208; box-shadow: 0 8px 24px -8px rgba(201,162,39,0.55); }
      .btn--gold:hover { transform: translateY(-2px); box-shadow: 0 12px 30px -6px rgba(201,162,39,0.7); }
      .btn--ghost { background: rgba(255,255,255,0.04); border-color: var(--line); color: var(--ivory); }
      .btn--ghost:hover { border-color: rgba(201,162,39,0.5); background: rgba(201,162,39,0.06); }

      /* Navbar */
      .nav { position: sticky; top: 0; z-index: 50; padding: 18px 0; transition: all .35s ease; border-bottom: 1px solid transparent; }
      .nav--scrolled { padding: 12px 0; background: rgba(10,10,11,0.72); backdrop-filter: blur(16px) saturate(140%); border-bottom-color: var(--line); }
      .nav__inner { max-width: 1180px; margin: 0 auto; padding: 0 24px; display: flex; align-items: center; justify-content: space-between; gap: 24px; }
      .nav__brand { display: flex; align-items: center; gap: 10px; }
      .nav__mark { width: 34px; height: 34px; border-radius: 99px; display: grid; place-items: center; background: linear-gradient(135deg, rgba(201,162,39,0.25), rgba(201,162,39,0.05)); border: 1px solid rgba(201,162,39,0.35); color: var(--gold-light); }
      .nav__brand-text { font-family: 'Fraunces', serif; font-size: 19px; letter-spacing: -0.01em; }
      .nav__brand-accent { color: var(--gold-light); }
      .nav__powered { font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: var(--muted); background: rgba(201,162,39,0.08); border: 1px solid rgba(201,162,39,0.25); padding: 3px 9px; border-radius: 999px; display: inline-flex; align-items: center; gap: 4px; margin-left: 6px; }
      .nav__powered-brand { color: var(--gold-light); font-weight: 600; }
      .nav__links { display: flex; gap: 30px; }
      .nav__link { font-size: 14px; color: var(--muted); transition: color .2s ease; }
      .nav__link:hover { color: var(--ivory); }
      .nav__actions { display: flex; align-items: center; gap: 18px; }
      .nav__login { font-size: 14px; color: var(--muted); }
      .nav__login:hover { color: var(--ivory); }
      .nav__burger { display: none; background: none; border: none; color: var(--ivory); }
      .nav__mobile { display: none; }

      @media (max-width: 900px) {
        .nav__links, .nav__actions { display: none; }
        .nav__burger { display: block; }
        .nav__mobile { display: flex; flex-direction: column; gap: 4px; padding: 16px 24px 22px; background: rgba(10,10,11,0.96); border-bottom: 1px solid var(--line); }
        .nav__mobile a { padding: 12px 0; font-size: 15px; border-bottom: 1px solid rgba(255,255,255,0.05); color: var(--ivory); }
        .nav__mobile-actions { display: flex; align-items: center; gap: 16px; margin-top: 10px; }
      }

      /* Hero */
      .hero { position: relative; padding: 90px 0 60px; overflow: hidden; }
      .hero__glow { position: absolute; top: -220px; left: 50%; transform: translateX(-50%); width: 900px; height: 500px; background: radial-gradient(ellipse at center, rgba(201,162,39,0.16), transparent 70%); pointer-events: none; }
      .hero__inner { max-width: 1180px; margin: 0 auto; padding: 0 24px; position: relative; text-align: center; }
      .hero__eyebrow { display: inline-flex; align-items: center; gap: 8px; padding: 8px 16px; border-radius: 999px; border: 1px solid rgba(201,162,39,0.3); background: rgba(201,162,39,0.06); font-size: 13px; color: var(--gold-light); margin-bottom: 26px; }
      .hero__title { font-size: clamp(38px, 6vw, 68px); line-height: 1.08; margin-bottom: 22px; text-align: center; }
      .hero__sub { max-width: 680px; margin: 0 auto 34px; font-size: 17px; text-align: center; }
      .hero__ctas { display: flex; justify-content: center; gap: 16px; margin-bottom: 32px; }
      .hero__trust { display: flex; justify-content: center; gap: 26px; flex-wrap: wrap; margin-bottom: 70px; }
      .hero__trust span { display: inline-flex; align-items: center; gap: 7px; font-size: 13px; color: var(--muted); }
      .hero__trust svg { color: var(--gold); }

      .hero__visual { position: relative; max-width: 940px; margin: 0 auto; padding-bottom: 20px; }
      .dash-mock { position: relative; text-align: left; background: linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.015)); border: 1px solid var(--line); border-radius: 20px; padding: 20px 22px 24px; backdrop-filter: blur(20px); box-shadow: 0 30px 70px -20px rgba(0,0,0,0.6); overflow: hidden; }
      .dash-mock--float { animation: floatY 6s ease-in-out infinite; }
      .dash-mock__bar { display: flex; align-items: center; gap: 12px; margin-bottom: 18px; }
      .dash-mock__dots { display: flex; gap: 5px; }
      .dash-mock__dots span { width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,0.15); }
      .dash-mock__title { font-family: 'IBM Plex Mono', monospace; font-size: 11.5px; color: var(--muted); letter-spacing: 0.04em; }
      .dash-mock__stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 16px; }
      @media (max-width: 640px) { .dash-mock__stats { grid-template-columns: repeat(2, 1fr); } }
      .dash-stat { background: rgba(255,255,255,0.03); border: 1px solid var(--line); border-radius: 12px; padding: 12px 14px; }
      .dash-stat span { display: block; font-size: 11px; color: var(--muted); margin-bottom: 6px; }
      .dash-stat b { font-family: 'IBM Plex Mono', monospace; font-size: 15px; font-weight: 500; }
      
      .dash-mock__chart-area { display: grid; grid-template-columns: 1fr 270px; gap: 18px; align-items: center; margin: 10px 0 16px; }
      @media (max-width: 820px) { .dash-mock__chart-area { grid-template-columns: 1fr; } }
      .dash-mock__chart { width: 100%; min-width: 0; }
      .hero__calc-wrap { width: 100%; z-index: 5; text-align: left; }

      .dash-mock__foot { display: flex; justify-content: space-between; padding-top: 14px; border-top: 1px solid var(--line); }
      .dash-mock__foot span { display: block; font-size: 11px; color: var(--muted); margin-bottom: 4px; }
      .dash-mock__foot b { font-family: 'IBM Plex Mono', monospace; font-size: 14px; }

      .float-card { position: absolute; display: flex; align-items: center; gap: 10px; background: rgba(19,18,23,0.92); border: 1px solid rgba(201,162,39,0.35); border-radius: 12px; padding: 9px 13px; backdrop-filter: blur(14px); box-shadow: 0 14px 30px -10px rgba(0,0,0,0.6); color: var(--gold-light); z-index: 20; }
      .float-card span { display: block; font-size: 10.5px; color: var(--muted); }
      .float-card b { font-family: 'IBM Plex Mono', monospace; font-size: 12.5px; color: var(--ivory); font-weight: 500; }
      .float-card--1 { top: -16px; left: 16px; animation: floatY 5s ease-in-out infinite; }
      .float-card--2 { top: -16px; right: 16px; animation: floatY 5.6s ease-in-out infinite 0.4s; }
      .float-card--3 { bottom: -12px; left: 24px; animation: floatY 5.2s ease-in-out infinite 0.8s; }
      @media (max-width: 640px) { .float-card { display: none; } }

      .calc { background: rgba(19,18,23,0.92); border: 1px solid rgba(201,162,39,0.28); border-radius: 16px; padding: 18px; backdrop-filter: blur(16px); box-shadow: 0 20px 50px -16px rgba(0,0,0,0.6); }
      .calc__head { display: flex; align-items: center; gap: 8px; font-size: 11px; letter-spacing: 0.05em; color: var(--gold-light); margin-bottom: 14px; font-family: 'IBM Plex Mono', monospace; }
      .calc__slider { display: block; margin-bottom: 14px; }
      .calc__slider span { display: block; font-size: 11px; color: var(--muted); margin-bottom: 6px; }
      .calc__slider input[type="range"] { width: 100%; accent-color: var(--gold); margin-bottom: 6px; }
      .calc__slider b { font-family: 'IBM Plex Mono', monospace; font-size: 13px; }
      .calc__grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 14px; }
      .calc__grid span { display: block; font-size: 10px; color: var(--muted); margin-bottom: 3px; }
      .calc__grid b { font-family: 'IBM Plex Mono', monospace; font-size: 12.5px; }
      .calc__total { display: flex; justify-content: space-between; align-items: center; padding-top: 12px; border-top: 1px solid var(--line); }
      .calc__total span { font-size: 11.5px; color: var(--muted); }
      .calc__total strong { font-family: 'IBM Plex Mono', monospace; font-size: 16px; color: var(--gold-light); }

      @keyframes floatY { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }

      /* Grids */
      .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
      .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; }
      @media (max-width: 980px) { .grid-3, .grid-4 { grid-template-columns: repeat(2, 1fr); } }
      @media (max-width: 620px) { .grid-3, .grid-4 { grid-template-columns: 1fr; } }

      .problem-card, .feature-card, .security-card { background: var(--panel); border: 1px solid var(--line); border-radius: 16px; padding: 26px 22px; transition: transform .3s ease, border-color .3s ease, box-shadow .3s ease; }
      .problem-card:hover, .feature-card:hover, .security-card:hover { transform: translateY(-4px); border-color: rgba(201,162,39,0.4); box-shadow: 0 20px 40px -20px rgba(201,162,39,0.25); }
      .problem-card__icon, .feature-card__icon, .security-card__icon { width: 42px; height: 42px; border-radius: 11px; display: grid; place-items: center; background: rgba(201,162,39,0.1); border: 1px solid rgba(201,162,39,0.25); color: var(--gold-light); margin-bottom: 16px; }
      .problem-card h3, .feature-card h3, .security-card h3 { font-size: 16.5px; margin-bottom: 8px; }
      .problem-card p, .feature-card p, .security-card p { font-size: 13.5px; }

      .transition-line { display: flex; align-items: center; gap: 20px; margin-top: 54px; }
      .transition-line .rule { flex: 1; height: 1px; background: linear-gradient(90deg, transparent, var(--line), transparent); }
      .transition-line p { font-family: 'Fraunces', serif; color: var(--gold-light); font-size: 19px; white-space: nowrap; }

      /* Panels */
      .panels { display: flex; flex-direction: column; gap: 26px; margin-top: 10px; }
      .panel { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center; background: var(--panel); border: 1px solid var(--line); border-radius: 22px; padding: 42px; }
      .panel--r { direction: rtl; }
      .panel--r .panel__text, .panel--r .panel__visual { direction: ltr; }
      .panel__icon { width: 44px; height: 44px; border-radius: 12px; display: grid; place-items: center; background: rgba(201,162,39,0.1); border: 1px solid rgba(201,162,39,0.3); color: var(--gold-light); margin-bottom: 18px; }
      .panel__text h3 { font-size: 24px; margin-bottom: 12px; }
      .panel__text p { font-size: 14.5px; max-width: 380px; }
      @media (max-width: 860px) { .panel, .panel--r { grid-template-columns: 1fr; direction: ltr; padding: 28px; } }

      .panel-visual { background: rgba(0,0,0,0.28); border: 1px solid var(--line); border-radius: 14px; padding: 20px; }
      .pv-row { display: flex; justify-content: space-between; padding: 9px 0; border-bottom: 1px dashed rgba(255,255,255,0.08); font-size: 13px; }
      .pv-row span { color: var(--muted); }
      .pv-row b { font-family: 'IBM Plex Mono', monospace; font-weight: 500; }
      .pv-divider { height: 1px; background: var(--line); margin: 6px 0; }
      .pv-row--total { border-bottom: none; padding-top: 10px; }
      .pv-row--total b { font-size: 16px; }
      .panel-visual--diamond { display: flex; gap: 20px; align-items: center; }
      .diamond-shape { width: 84px; height: 84px; border-radius: 16px; display: grid; place-items: center; background: radial-gradient(circle at 35% 30%, rgba(191,233,247,0.25), transparent 65%), rgba(191,233,247,0.05); border: 1px solid rgba(191,233,247,0.3); flex-shrink: 0; }
      .pv-rows-compact { flex: 1; }
      .pv-rows-compact .pv-row { padding: 6px 0; font-size: 12.5px; }

      .panel-visual--flow { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; }
      .flow-step { display: flex; flex-direction: column; gap: 6px; padding: 12px 14px; border-radius: 10px; background: rgba(255,255,255,0.03); border: 1px solid var(--line); font-size: 12px; color: var(--muted); min-width: 108px; }
      .flow-step__index { font-family: 'IBM Plex Mono', monospace; font-size: 10px; color: var(--gold-light); }
      .flow-step--active { border-color: rgba(201,162,39,0.5); background: rgba(201,162,39,0.08); color: var(--ivory); }
      .flow-arrow { width: 16px; height: 1px; background: rgba(255,255,255,0.2); }

      /* Workflow */
      .workflow { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0; padding: 30px; background: var(--panel); border: 1px solid var(--line); border-radius: 20px; }
      .workflow__step { display: flex; flex-direction: column; align-items: center; gap: 10px; font-size: 12px; color: var(--muted); min-width: 76px; }
      .workflow__icon { width: 46px; height: 46px; border-radius: 12px; display: grid; place-items: center; background: rgba(201,162,39,0.08); border: 1px solid rgba(201,162,39,0.28); color: var(--gold-light); }
      .workflow__line { flex: 1; min-width: 20px; height: 1px; background: linear-gradient(90deg, rgba(201,162,39,0.5), rgba(201,162,39,0.05)); position: relative; }
      .workflow__line::after { content: ''; position: absolute; top: -2px; right: 0; width: 5px; height: 5px; border-radius: 50%; background: var(--gold); box-shadow: 0 0 8px var(--gold); animation: pulseDot 2.4s ease-in-out infinite; }
      @keyframes pulseDot { 0%,100% { opacity: 0.3; } 50% { opacity: 1; } }
      @media (max-width: 860px) { .workflow { flex-direction: column; align-items: flex-start; gap: 18px; } .workflow__line { width: 1px; height: 24px; min-width: 1px; margin-left: 22px; } }

      /* Analytics */
      .analytics { display: flex; flex-direction: column; gap: 24px; background: var(--panel); border: 1px solid var(--line); border-radius: 22px; padding: 30px; }
      .analytics__stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
      @media (max-width: 860px) { .analytics__stats { grid-template-columns: repeat(2, 1fr); } }
      .analytics__stat { display: flex; align-items: flex-start; gap: 10px; padding: 14px; border-radius: 12px; background: rgba(255,255,255,0.03); border: 1px solid var(--line); color: var(--gold-light); }
      .analytics__stat span { display: block; font-size: 11px; color: var(--muted); margin-bottom: 4px; }
      .analytics__stat b { font-family: 'IBM Plex Mono', monospace; font-size: 14.5px; color: var(--ivory); font-weight: 500; }
      .analytics__charts { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
      .chart-card--wide { grid-column: 1 / -1; }
      @media (max-width: 780px) { .analytics__charts { grid-template-columns: 1fr; } }
      .chart-card { background: rgba(0,0,0,0.25); border: 1px solid var(--line); border-radius: 14px; padding: 16px; }
      .chart-card h4 { margin: 0 0 6px; font-family: 'Manrope', sans-serif; font-size: 12.5px; font-weight: 700; color: var(--muted); text-transform: uppercase; letter-spacing: 0.04em; }
      .chart-legend { display: flex; gap: 14px; flex-wrap: wrap; margin-top: 6px; }
      .chart-legend span { display: inline-flex; align-items: center; gap: 6px; font-size: 11px; color: var(--muted); }
      .chart-legend i { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }

      /* Multi-branch */
      .branch-net { position: relative; display: flex; align-items: center; justify-content: center; min-height: 240px; }
      .branch-net__hub { display: flex; flex-direction: column; align-items: center; gap: 6px; width: 96px; height: 96px; border-radius: 50%; background: radial-gradient(circle, rgba(201,162,39,0.18), rgba(201,162,39,0.02)); border: 1px solid rgba(201,162,39,0.4); color: var(--gold-light); font-size: 11px; justify-content: center; z-index: 2; }
      .branch-net__node { position: absolute; display: flex; align-items: center; gap: 6px; padding: 9px 14px; border-radius: 999px; background: var(--panel); border: 1px solid var(--line); font-size: 12.5px; color: var(--muted); animation: floatY 6s ease-in-out infinite; animation-delay: calc(var(--i) * 0.3s); }
      .branch-net__node:nth-child(2) { top: 0; left: 8%; }
      .branch-net__node:nth-child(3) { top: 6%; right: 6%; }
      .branch-net__node:nth-child(4) { bottom: 22%; left: 0%; }
      .branch-net__node:nth-child(5) { bottom: 22%; right: 2%; }
      .branch-net__node:nth-child(6) { bottom: -6%; left: 38%; }
      @media (max-width: 700px) { .branch-net { display: flex; flex-wrap: wrap; gap: 12px; min-height: auto; } .branch-net__node { position: static; animation: none; } }
      .branch-caps { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; margin-top: 40px; }
      .branch-caps span { font-size: 12.5px; padding: 9px 16px; border-radius: 999px; border: 1px solid var(--line); color: var(--muted); }

      /* Security bg */
      .section--dark { position: relative; }
      .hallmark-bg { position: absolute; inset: 0; opacity: 0.05; pointer-events: none; background-image: radial-gradient(circle at 10% 20%, var(--gold) 0, transparent 1.5%), radial-gradient(circle at 80% 10%, var(--gold) 0, transparent 1.5%), radial-gradient(circle at 40% 80%, var(--gold) 0, transparent 1.5%), radial-gradient(circle at 90% 70%, var(--gold) 0, transparent 1.5%), radial-gradient(circle at 60% 40%, var(--gold) 0, transparent 1.5%); }

      /* Reports */
      .reports-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 14px; }
      @media (max-width: 900px) { .reports-grid { grid-template-columns: repeat(3, 1fr); } }
      @media (max-width: 600px) { .reports-grid { grid-template-columns: repeat(2, 1fr); } }
      .report-chip { display: flex; align-items: center; gap: 10px; padding: 15px 16px; background: var(--panel); border: 1px solid var(--line); border-radius: 12px; font-size: 13.5px; color: var(--muted); transition: border-color .25s ease, color .25s ease; }
      .report-chip:hover { border-color: rgba(201,162,39,0.4); color: var(--ivory); }
      .report-chip svg:first-child { color: var(--gold-light); flex-shrink: 0; }
      .report-chip__arrow { margin-left: auto; opacity: 0.4; }

      /* Compare */
      .compare { display: grid; grid-template-columns: 1fr 1fr; gap: 22px; }
      @media (max-width: 700px) { .compare { grid-template-columns: 1fr; } }
      .compare-card { background: var(--panel); border: 1px solid var(--line); border-radius: 18px; padding: 30px; }
      .compare-card h3 { font-size: 18px; margin-bottom: 20px; color: var(--muted); }
      .compare-card--gold { border-color: rgba(201,162,39,0.45); background: linear-gradient(180deg, rgba(201,162,39,0.08), transparent); }
      .compare-card--gold h3 { color: var(--gold-light); }
      .compare-card ul { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 13px; }
      .compare-card li { display: flex; align-items: center; gap: 10px; font-size: 14px; color: var(--muted); }
      .compare-card--gold li { color: var(--ivory); }
      .compare-card:not(.compare-card--gold) li svg { color: #8A6060; }
      .compare-card--gold li svg { color: var(--gold); }

      /* Devices */
      .devices { display: flex; align-items: flex-end; justify-content: center; gap: 36px; padding: 50px 20px; }
      .device { display: flex; flex-direction: column; align-items: center; gap: 10px; color: var(--gold-light); animation: floatY 6s ease-in-out infinite; animation-delay: calc(var(--i) * 0.35s); }
      .device span { font-size: 12px; color: var(--muted); }
      .device--desktop { transform: scale(1.1); }
      @media (max-width: 640px) { .devices { flex-wrap: wrap; gap: 24px; } }
      .cloud-points { display: flex; justify-content: center; gap: 26px; flex-wrap: wrap; margin-top: 10px; }
      .cloud-points span { display: inline-flex; align-items: center; gap: 7px; font-size: 13px; color: var(--muted); }
      .cloud-points svg { color: var(--gold); }

      /* CTA */
      .cta { position: relative; text-align: center; padding: 120px 24px; margin: 40px 24px; border-radius: 28px; background: #08070A; border: 1px solid rgba(201,162,39,0.2); overflow: hidden; }
      .cta__glow { position: absolute; inset: 0; background: radial-gradient(ellipse at 50% 0%, rgba(201,162,39,0.22), transparent 60%); pointer-events: none; }
      .cta__sub { max-width: 520px; margin: 18px auto 34px; font-size: 15.5px; }
      .cta__actions { display: flex; justify-content: center; gap: 16px; }

      /* Footer */
      .footer { padding: 70px 0 30px; border-top: 1px solid var(--line); }
      .footer__top { display: grid; grid-template-columns: 1.6fr repeat(4, 1fr); gap: 30px; margin-bottom: 50px; }
      @media (max-width: 900px) { .footer__top { grid-template-columns: repeat(2, 1fr); } }
      @media (max-width: 560px) { .footer__top { grid-template-columns: 1fr; } }
      .footer__brand p { margin-top: 14px; font-size: 13px; max-width: 240px; }
      .footer__col h4 { font-family: 'Manrope', sans-serif; font-size: 12.5px; text-transform: uppercase; letter-spacing: 0.05em; color: var(--muted); margin-bottom: 16px; }
      .footer__col a { display: block; font-size: 13.5px; color: var(--muted); padding: 6px 0; transition: color .2s ease; }
      .footer__col a:hover { color: var(--gold-light); }
      .footer__bottom { display: flex; justify-content: space-between; align-items: center; padding-top: 24px; border-top: 1px solid var(--line); font-size: 12.5px; color: var(--muted); flex-wrap: wrap; gap: 12px; }
      .footer__hallmark { display: inline-flex; align-items: center; gap: 6px; color: var(--gold-light); }

      @media (prefers-reduced-motion: reduce) {
        .dash-mock--float, .float-card, .branch-net__node, .device, .workflow__line::after { animation: none !important; }
      }
    `}</style>
  );
}

/* ------------------------------------------------------------------ */
/*  Landing Page & Router Setup                                         */
/* ------------------------------------------------------------------ */
function LandingPage() {
  return (
    <div className="jerp">
      <GlobalStyles />
      <Navbar />
      <Hero />
      <ProblemSection />
      <CoreFeatures />
      <JewelleryFeatures />
      <Workflow />
      <DashboardPreview />
      <MultiBranch />
      <Security />
      <Reports />
      <WhyUs />
      <MobileCloud />
      <CTA />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/login"
            element={
              <ProtectedRoute requireAuth={false}>
                <LoginPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <ProtectedRoute requireAuth={false}>
                <ForgotPasswordPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute requireAuth={true}>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={
              <ProtectedRoute requireAuth={true}>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
