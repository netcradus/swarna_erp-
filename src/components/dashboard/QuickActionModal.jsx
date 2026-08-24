import React, { useState } from "react";
import { X, CheckCircle2, Sparkles } from "lucide-react";

export default function QuickActionModal({ isOpen, actionTitle, onClose }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1200);
    }, 600);
  };

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
        maxWidth: "480px",
        background: "#16151A",
        border: "1px solid rgba(201,162,39,0.35)",
        borderRadius: "20px",
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

        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
          <div style={{
            width: "36px",
            height: "36px",
            borderRadius: "10px",
            background: "rgba(201,162,39,0.15)",
            border: "1px solid rgba(201,162,39,0.3)",
            display: "grid",
            placeItems: "center",
            color: "#E8CD7A",
          }}>
            <Sparkles size={18} />
          </div>
          <div>
            <h3 style={{ fontFamily: "Fraunces, serif", fontSize: "20px", margin: 0 }}>{actionTitle}</h3>
            <p style={{ fontSize: "12px", color: "#9C978C", margin: 0 }}>Quick Entry Portal</p>
          </div>
        </div>

        {success ? (
          <div style={{
            padding: "24px",
            textAlign: "center",
            color: "#34d399",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
          }}>
            <CheckCircle2 size={40} />
            <b>{actionTitle} recorded successfully!</b>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12.5px", color: "#9C978C", marginBottom: "6px" }}>
                Primary Reference / Tag No.
              </label>
              <input
                type="text"
                required
                placeholder="e.g. TAG-884102 or REF-9912"
                style={{
                  width: "100%",
                  height: "44px",
                  padding: "0 14px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "10px",
                  color: "#F3EFE6",
                  fontFamily: "Manrope, sans-serif",
                  fontSize: "14px",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12.5px", color: "#9C978C", marginBottom: "6px" }}>
                Notes / Remarks
              </label>
              <textarea
                rows={3}
                placeholder="Enter transaction specifics or notes..."
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "10px",
                  color: "#F3EFE6",
                  fontFamily: "Manrope, sans-serif",
                  fontSize: "14px",
                  resize: "none",
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                height: "46px",
                borderRadius: "10px",
                border: "none",
                background: "linear-gradient(135deg, #E8CD7A, #C9A227 60%)",
                color: "#171208",
                fontWeight: 700,
                fontSize: "14px",
                cursor: "pointer",
                marginTop: "8px",
              }}
            >
              {loading ? "Processing..." : "Submit Action"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
