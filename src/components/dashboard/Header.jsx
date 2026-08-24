import React, { useState } from "react";
import { useAuth } from "../../auth/AuthContext";
import PoweredByBadge from "../common/PoweredByBadge";
import { Bell, Building2, Calendar, Menu, ChevronDown, Check } from "lucide-react";

export default function Header({ setMobileOpen, onOpenUserMenu }) {
  const { user, selectedBranch, setSelectedBranch } = useAuth();
  const [branchOpen, setBranchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const branches = [
    "All Branches",
    "Delhi Main Showroom",
    "Noida Sector 18",
    "Gurugram Cyber Hub",
    "Jaipur Johri Bazaar",
    "Mumbai Zaveri Bazaar",
  ];

  const notifications = [
    { id: 1, title: "Gold Rate Updated", desc: "22K gold rate set to ₹7,412/g", time: "10m ago", unread: true },
    { id: 2, title: "Low Stock Alert", desc: "Diamond Ring stock below 3 pcs", time: "1h ago", unread: true },
    { id: 3, title: "Invoice Generated", desc: "INV-10482 created for ₹78,420", time: "2h ago", unread: false },
  ];

  return (
    <>
      <style>{`
        .header {
          height: 70px;
          padding: 0 28px;
          background: rgba(16, 15, 20, 0.8);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0;
          z-index: 30;
        }

        .header__left {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .header__mobile-toggle {
          display: none;
          background: none;
          border: none;
          color: #F3EFE6;
          cursor: pointer;
          padding: 4px;
        }

        .header__greeting h2 {
          font-family: 'Fraunces', serif;
          font-size: 20px;
          font-weight: 500;
          color: #F3EFE6;
          margin: 0;
          line-height: 1.2;
        }

        .header__greeting p {
          font-size: 12.5px;
          color: #9C978C;
          margin: 2px 0 0 0;
        }

        .header__right {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        /* Branch Selector */
        .branch-dropdown {
          position: relative;
        }

        .branch-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 14px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(201, 162, 39, 0.25);
          color: #E8CD7A;
          font-size: 13px;
          font-family: 'Manrope', sans-serif;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }

        .branch-btn:hover {
          background: rgba(201, 162, 39, 0.1);
        }

        .branch-menu {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          width: 220px;
          background: #16151A;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
          padding: 6px;
          z-index: 50;
        }

        .branch-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 9px 12px;
          border-radius: 8px;
          font-size: 13px;
          color: #9C978C;
          cursor: pointer;
          transition: all 0.2s;
        }

        .branch-item:hover {
          background: rgba(255, 255, 255, 0.04);
          color: #F3EFE6;
        }

        .branch-item--active {
          color: #E8CD7A;
          font-weight: 600;
          background: rgba(201, 162, 39, 0.08);
        }

        /* Date Badge */
        .date-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 12px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          color: #9C978C;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 12px;
        }

        /* Notifications */
        .notif-wrapper {
          position: relative;
        }

        .notif-btn {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #F3EFE6;
          display: grid;
          place-items: center;
          cursor: pointer;
          position: relative;
          transition: background 0.2s;
        }

        .notif-btn:hover {
          background: rgba(255, 255, 255, 0.08);
        }

        .notif-badge {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #C9A227;
          box-shadow: 0 0 8px #C9A227;
        }

        .notif-menu {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          width: 320px;
          background: #16151A;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 14px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
          padding: 12px;
          z-index: 50;
        }

        .notif-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 8px;
          margin-bottom: 8px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          font-size: 13px;
          font-weight: 600;
          color: #F3EFE6;
        }

        .notif-item {
          padding: 10px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.02);
          margin-bottom: 6px;
          cursor: pointer;
        }

        .notif-item:hover {
          background: rgba(255, 255, 255, 0.05);
        }

        .notif-item__title {
          font-size: 13px;
          font-weight: 600;
          color: #E8CD7A;
          display: flex;
          justify-content: space-between;
        }

        .notif-item__time {
          font-size: 11px;
          color: #635E6B;
        }

        .notif-item__desc {
          font-size: 12px;
          color: #9C978C;
          margin-top: 4px;
        }

        /* User Profile Pill */
        .user-pill {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 4px 12px 4px 4px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(201, 162, 39, 0.3);
          cursor: pointer;
          transition: background 0.2s;
        }

        .user-pill:hover {
          background: rgba(201, 162, 39, 0.1);
        }

        .user-pill__avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          object-fit: cover;
        }

        .user-pill__name {
          font-size: 13px;
          font-weight: 600;
          color: #F3EFE6;
        }

        .user-pill__role {
          font-size: 11px;
          color: #E8CD7A;
        }

        @media (max-width: 900px) {
          .header {
            padding: 0 16px;
          }
          .header__mobile-toggle {
            display: block;
          }
          .header__greeting p,
          .date-badge {
            display: none;
          }
          .user-pill__info {
            display: none;
          }
        }
      `}</style>

      <header className="header">
        <div className="header__left">
          <button
            className="header__mobile-toggle"
            onClick={() => setMobileOpen(true)}
            aria-label="Open mobile menu"
          >
            <Menu size={22} />
          </button>

          <div className="header__greeting">
            <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
              <h2>Good morning, {user?.name ? user.name.split(" ")[0] : "Admin"}</h2>
              <PoweredByBadge />
            </div>
            <p>Here's what's happening with your jewellery business today.</p>
          </div>
        </div>

        <div className="header__right">
          {/* Branch Selector Dropdown */}
          <div className="branch-dropdown">
            <button
              className="branch-btn"
              onClick={() => setBranchOpen(!branchOpen)}
            >
              <Building2 size={15} />
              <span>{selectedBranch}</span>
              <ChevronDown size={14} />
            </button>

            {branchOpen && (
              <div className="branch-menu">
                {branches.map((b) => (
                  <div
                    key={b}
                    className={`branch-item ${selectedBranch === b ? "branch-item--active" : ""}`}
                    onClick={() => {
                      setSelectedBranch(b);
                      setBranchOpen(false);
                    }}
                  >
                    <span>{b}</span>
                    {selectedBranch === b && <Check size={14} />}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Date Badge */}
          <div className="date-badge">
            <Calendar size={14} />
            <span>24 August 2026</span>
          </div>

          {/* Notifications Center */}
          <div className="notif-wrapper">
            <button
              className="notif-btn"
              onClick={() => setNotifOpen(!notifOpen)}
              aria-label="Notifications"
            >
              <Bell size={18} />
              <span className="notif-badge" />
            </button>

            {notifOpen && (
              <div className="notif-menu">
                <div className="notif-header">
                  <span>Notifications</span>
                  <span style={{ fontSize: "11px", color: "#E8CD7A" }}>3 New</span>
                </div>
                {notifications.map((n) => (
                  <div key={n.id} className="notif-item">
                    <div className="notif-item__title">
                      <span>{n.title}</span>
                      <span className="notif-item__time">{n.time}</span>
                    </div>
                    <div className="notif-item__desc">{n.desc}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* User Profile Menu Pill */}
          <div className="user-pill" onClick={onOpenUserMenu}>
            <img
              src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"}
              alt="User Avatar"
              className="user-pill__avatar"
            />
            <div className="user-pill__info">
              <div className="user-pill__name">{user?.name || "Admin"}</div>
              <div className="user-pill__role">{user?.roleLabel || "Super Admin"}</div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
