import React from "react";
import { useAuth } from "../../auth/AuthContext";
import PoweredByBadge from "../common/PoweredByBadge";
import {
  Gem, LayoutDashboard, Receipt, ShoppingBag, RotateCcw, Users,
  Package, Coins, Diamond, ArrowLeftRight, SlidersHorizontal,
  ShoppingCart, Truck, Scale, Hammer, Briefcase, Factory, Sparkles,
  Wallet, CreditCard, ArrowDownLeft, ArrowUpRight, FileCheck,
  BarChart3, PieChart, TrendingUp, Building2,
  UserCheck, Shield, Settings, HelpCircle, LogOut, ChevronLeft, ChevronRight
} from "lucide-react";

export default function Sidebar({ collapsed, setCollapsed, mobileOpen, setMobileOpen, activeTab, setActiveTab }) {
  const { user, logout } = useAuth();

  const menuGroups = [
    {
      title: "MAIN",
      items: [
        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
      ],
    },
    {
      title: "SALES",
      items: [
        { id: "pos", label: "POS / Billing", icon: Receipt },
        { id: "sales", label: "Sales", icon: ShoppingBag },
        { id: "sales_returns", label: "Sales Returns", icon: RotateCcw },
        { id: "customers", label: "Customers", icon: Users },
      ],
    },
    {
      title: "INVENTORY",
      items: [
        { id: "jewellery_inv", label: "Jewellery Inventory", icon: Package },
        { id: "gold_silver", label: "Gold & Silver", icon: Coins },
        { id: "diamond_inv", label: "Diamond Inventory", icon: Diamond },
        { id: "stock_transfer", label: "Stock Transfer", icon: ArrowLeftRight },
        { id: "stock_adj", label: "Stock Adjustment", icon: SlidersHorizontal },
      ],
    },
    {
      title: "PURCHASE",
      items: [
        { id: "purchase", label: "Purchase", icon: ShoppingCart },
        { id: "suppliers", label: "Suppliers", icon: Truck },
        { id: "old_gold", label: "Old Gold Purchase", icon: Scale },
      ],
    },
    {
      title: "PRODUCTION",
      items: [
        { id: "karigar", label: "Karigar", icon: Hammer },
        { id: "job_work", label: "Job Work", icon: Briefcase },
        { id: "production", label: "Production", icon: Factory },
        { id: "finished_goods", label: "Finished Goods", icon: Sparkles },
      ],
    },
    {
      title: "FINANCE",
      items: [
        { id: "accounts", label: "Accounts", icon: Wallet },
        { id: "payments", label: "Payments", icon: CreditCard },
        { id: "receivables", label: "Receivables", icon: ArrowDownLeft },
        { id: "payables", label: "Payables", icon: ArrowUpRight },
        { id: "gst", label: "GST Reports", icon: FileCheck },
      ],
    },
    {
      title: "REPORTS",
      items: [
        { id: "sales_reports", label: "Sales Reports", icon: BarChart3 },
        { id: "stock_reports", label: "Stock Reports", icon: PieChart },
        { id: "gold_reports", label: "Gold Reports", icon: Coins },
        { id: "diamond_reports", label: "Diamond Reports", icon: Diamond },
        { id: "pnl", label: "Profit & Loss", icon: TrendingUp },
        { id: "branch_reports", label: "Branch Reports", icon: Building2 },
      ],
    },
    {
      title: "ADMINISTRATION",
      items: [
        { id: "users", label: "Users", icon: UserCheck },
        { id: "roles", label: "Roles & Permissions", icon: Shield },
        { id: "branches", label: "Branches", icon: Building2 },
        { id: "settings", label: "Settings", icon: Settings },
      ],
    },
  ];

  const handleSelect = (id) => {
    setActiveTab(id);
    if (mobileOpen) setMobileOpen(false);
  };

  return (
    <>
      <style>{`
        .sidebar {
          width: ${collapsed ? "80px" : "260px"};
          height: 100vh;
          background: #100F14;
          border-right: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          flex-direction: column;
          position: sticky;
          top: 0;
          z-index: 40;
          transition: width 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
          overflow: hidden;
          user-select: none;
        }

        .sidebar__header {
          height: 70px;
          padding: 0 ${collapsed ? "16px" : "20px"};
          display: flex;
          align-items: center;
          justify-content: ${collapsed ? "center" : "space-between"};
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .sidebar__brand {
          display: flex;
          align-items: center;
          gap: 12px;
          color: #F3EFE6;
          text-decoration: none;
        }

        .sidebar__logo-mark {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          display: grid;
          place-items: center;
          background: linear-gradient(135deg, rgba(201,162,39,0.3), rgba(201,162,39,0.05));
          border: 1px solid rgba(201,162,39,0.4);
          color: #E8CD7A;
          flex-shrink: 0;
        }

        .sidebar__brand-text {
          font-family: 'Fraunces', serif;
          font-size: 19px;
          font-weight: 500;
          white-space: nowrap;
        }

        .sidebar__brand-accent {
          color: #E8CD7A;
        }

        .sidebar__toggle-btn {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #9C978C;
          display: grid;
          place-items: center;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }

        .sidebar__toggle-btn:hover {
          background: rgba(201, 162, 39, 0.15);
          color: #E8CD7A;
        }

        .sidebar__nav {
          flex: 1;
          overflow-y: auto;
          padding: 16px 12px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .sidebar__nav::-webkit-scrollbar {
          width: 4px;
        }
        .sidebar__nav::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.1);
          border-radius: 4px;
        }

        .sidebar__group-title {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 10.5px;
          font-weight: 600;
          color: #635E6B;
          letter-spacing: 0.08em;
          padding: 0 10px 6px;
          display: ${collapsed ? "none" : "block"};
        }

        .sidebar__items {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .sidebar__item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 12px;
          border-radius: 10px;
          color: #9C978C;
          font-size: 13.5px;
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
          text-decoration: none;
        }

        .sidebar__item:hover {
          background: rgba(255, 255, 255, 0.04);
          color: #F3EFE6;
        }

        .sidebar__item--active {
          background: linear-gradient(90deg, rgba(201,162,39,0.18), rgba(201,162,39,0.04));
          color: #E8CD7A;
          font-weight: 600;
          border-left: 3px solid #C9A227;
        }

        .sidebar__item-icon {
          flex-shrink: 0;
          display: grid;
          place-items: center;
        }

        .sidebar__item-label {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          display: ${collapsed ? "none" : "block"};
        }

        .sidebar__footer {
          padding: 14px 12px;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          display: flex;
          flex-direction: column;
          gap: 8px;
          background: #0D0C10;
        }

        .sidebar__user {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .sidebar__user-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          object-fit: cover;
          border: 1px solid rgba(201, 162, 39, 0.4);
        }

        .sidebar__user-info {
          display: ${collapsed ? "none" : "block"};
          overflow: hidden;
        }

        .sidebar__user-name {
          font-size: 13px;
          font-weight: 600;
          color: #F3EFE6;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .sidebar__user-role {
          font-size: 11px;
          color: #E8CD7A;
          white-space: nowrap;
        }

        .sidebar__logout-btn {
          display: flex;
          align-items: center;
          justify-content: ${collapsed ? "center" : "flex-start"};
          gap: 10px;
          padding: 9px 12px;
          border-radius: 8px;
          background: transparent;
          border: none;
          color: #f87171;
          font-size: 13px;
          cursor: pointer;
          transition: background 0.2s;
          width: 100%;
        }

        .sidebar__logout-btn:hover {
          background: rgba(239, 68, 68, 0.1);
        }

        /* Mobile Drawer Overlay */
        .mobile-overlay {
          display: none;
        }

        @media (max-width: 900px) {
          .sidebar {
            position: fixed;
            top: 0;
            left: 0;
            z-index: 100;
            transform: translateX(${mobileOpen ? "0" : "-100%"});
            width: 260px !important;
          }

          .mobile-overlay {
            display: ${mobileOpen ? "block" : "none"};
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(4px);
            z-index: 99;
          }
        }
      `}</style>

      <div className="mobile-overlay" onClick={() => setMobileOpen(false)} />

      <aside className="sidebar">
        <div className="sidebar__header">
          <div className="sidebar__brand">
            <span className="sidebar__logo-mark">
              <Gem size={20} strokeWidth={1.6} />
            </span>
            {!collapsed && (
              <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                <span className="sidebar__brand-text">
                  Svarna<span className="sidebar__brand-accent">ERP</span>
                </span>
                <PoweredByBadge style={{ fontSize: "10px", padding: "2px 7px" }} />
              </div>
            )}
          </div>

          <button
            className="sidebar__toggle-btn"
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        <nav className="sidebar__nav">
          {menuGroups.map((group) => (
            <div key={group.title}>
              <div className="sidebar__group-title">{group.title}</div>
              <div className="sidebar__items">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <div
                      key={item.id}
                      className={`sidebar__item ${isActive ? "sidebar__item--active" : ""}`}
                      onClick={() => handleSelect(item.id)}
                      title={collapsed ? item.label : undefined}
                    >
                      <span className="sidebar__item-icon">
                        <Icon size={18} strokeWidth={isActive ? 2 : 1.6} />
                      </span>
                      <span className="sidebar__item-label">{item.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="sidebar__footer">
          <div
            className="sidebar__item"
            onClick={() => handleSelect("support")}
            title={collapsed ? "Help & Support" : undefined}
          >
            <span className="sidebar__item-icon">
              <HelpCircle size={18} />
            </span>
            <span className="sidebar__item-label">Help & Support</span>
          </div>

          <div className="sidebar__user">
            <img
              src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"}
              alt="User Avatar"
              className="sidebar__user-avatar"
            />
            <div className="sidebar__user-info">
              <div className="sidebar__user-name">{user?.name || "Admin User"}</div>
              <div className="sidebar__user-role">{user?.roleLabel || "Super Administrator"}</div>
            </div>
          </div>

          <button className="sidebar__logout-btn" onClick={logout}>
            <LogOut size={16} />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
