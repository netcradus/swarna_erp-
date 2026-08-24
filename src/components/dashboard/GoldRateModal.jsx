import React, { useState } from "react";
import { X, Coins, CheckCircle2 } from "lucide-react";

export default function GoldRateModal({ isOpen, onClose, currentRates, onUpdate }) {
  const [rate22k, setRate22k] = useState(currentRates["22K"]);
  const [rate24k, setRate24k] = useState(currentRates["24K"]);
  const [rateSilver, setRateSilver] = useState(currentRates["Silver"]);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      onUpdate({
        "22K": Number(rate22k),
        "24K": Number(rate24k),
        "Silver": Number(rateSilver),
        updatedTime: "Just now",
      });
      setSaving(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1000);
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
        maxWidth: "440px",
        background: "#16151A",
        border: "1px solid rgba(201,162,39,0.3)",
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

        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
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
            <Coins size={18} />
          </div>
          <div>
            <h3 style={{ fontFamily: "Fraunces, serif", fontSize: "20px", margin: 0 }}>Update Daily Rates</h3>
            <p style={{ fontSize: "12px", color: "#9C978C", margin: 0 }}>Set official bullion board rates</p>
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
            gap: "8px",
          }}>
            <CheckCircle2 size={36} />
            <b>Gold rates updated successfully!</b>
          </div>
        ) : (
          <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <label style={{ display: "block", fontSize: "13px", color: "#9C978C", marginBottom: "6px" }}>
                22K Gold Rate (₹ / gram)
              </label>
              <input
                type="number"
                value={rate22k}
                onChange={(e) => setRate22k(e.target.value)}
                style={{
                  width: "100%",
                  height: "44px",
                  padding: "0 14px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "10px",
                  color: "#F3EFE6",
                  fontFamily: "IBM Plex Mono, monospace",
                  fontSize: "15px",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "13px", color: "#9C978C", marginBottom: "6px" }}>
                24K Fine Gold Rate (₹ / gram)
              </label>
              <input
                type="number"
                value={rate24k}
                onChange={(e) => setRate24k(e.target.value)}
                style={{
                  width: "100%",
                  height: "44px",
                  padding: "0 14px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "10px",
                  color: "#F3EFE6",
                  fontFamily: "IBM Plex Mono, monospace",
                  fontSize: "15px",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "13px", color: "#9C978C", marginBottom: "6px" }}>
                Silver Rate (₹ / gram)
              </label>
              <input
                type="number"
                step="0.01"
                value={rateSilver}
                onChange={(e) => setRateSilver(e.target.value)}
                style={{
                  width: "100%",
                  height: "44px",
                  padding: "0 14px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "10px",
                  color: "#F3EFE6",
                  fontFamily: "IBM Plex Mono, monospace",
                  fontSize: "15px",
                }}
              />
            </div>

            <button
              type="submit"
              disabled={saving}
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
              {saving ? "Publishing Rates..." : "Publish New Rates"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
