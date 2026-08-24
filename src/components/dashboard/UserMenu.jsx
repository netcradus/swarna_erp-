import React from "react";
import { X, User, Shield, Settings, LogOut, Building2 } from "lucide-react";
import { useAuth } from "../../auth/AuthContext";

export default function UserMenu({ isOpen, onClose }) {
  const { user, logout } = useAuth();

  if (!isOpen) return null;

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      zIndex: 100,
      background: "rgba(0,0,0,0.75)",
      backdropFilter: "blur(6px)",
      display: "grid",
      placeItems: "center",
      padding: "20px",
    }}>
      <div style={{
        width: "100%",
        maxWidth: "420px",
        background: "#16151A",
        border: "1px solid rgba(201,162,39,0.35)",
        borderRadius: "24px",
        padding: "28px",
        boxShadow: "0 25px 60px rgba(0,0,0,0.8)",
        color: "#F3EFE6",
        fontFamily: "Manrope, sans-serif",
        position: "relative",
      }}>
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            background: "none",
            border: "none",
            color: "#9C978C",
            cursor: "pointer",
          }}
        >
          <X size={20} />
        </button>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textCenter: "center", marginBottom: "24px" }}>
          <img
            src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"}
            alt="User Avatar"
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid #C9A227",
              marginBottom: "12px",
            }}
          />
          <h3 style={{ fontFamily: "Fraunces, serif", fontSize: "22px", margin: 0 }}>{user?.name || "Admin User"}</h3>
          <span style={{
            display: "inline-block",
            fontSize: "12px",
            color: "#E8CD7A",
            background: "rgba(201,162,39,0.15)",
            border: "1px solid rgba(201,162,39,0.3)",
            padding: "3px 10px",
            borderRadius: "999px",
            margin: "6px 0 4px",
            fontWeight: 600,
          }}>
            {user?.roleLabel || "Super Administrator"}
          </span>
          <span style={{ fontSize: "12px", color: "#9C978C", display: "flex", alignItems: "center", gap: "4px" }}>
            <Building2 size={13} /> {user?.branch || "Head Office"}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "8px", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "16px" }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "12px",
            borderRadius: "10px",
            background: "rgba(255,255,255,0.03)",
            fontSize: "14px",
            color: "#F3EFE6",
            cursor: "pointer",
          }}>
            <User size={18} style={{ color: "#E8CD7A" }} />
            <span>My Profile</span>
          </div>

          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "12px",
            borderRadius: "10px",
            background: "rgba(255,255,255,0.03)",
            fontSize: "14px",
            color: "#F3EFE6",
            cursor: "pointer",
          }}>
            <Shield size={18} style={{ color: "#E8CD7A" }} />
            <span>Security & API Keys</span>
          </div>

          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "12px",
            borderRadius: "10px",
            background: "rgba(255,255,255,0.03)",
            fontSize: "14px",
            color: "#F3EFE6",
            cursor: "pointer",
          }}>
            <Settings size={18} style={{ color: "#E8CD7A" }} />
            <span>ERP Preferences</span>
          </div>

          <button
            onClick={() => {
              onClose();
              logout();
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px",
              borderRadius: "10px",
              background: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.2)",
              fontSize: "14px",
              color: "#f87171",
              fontWeight: 600,
              cursor: "pointer",
              marginTop: "8px",
              width: "100%",
            }}
          >
            <LogOut size={18} />
            <span>Logout from Svarna ERP</span>
          </button>
        </div>
      </div>
    </div>
  );
}
