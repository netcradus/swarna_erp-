import React from "react";

export default function PoweredByNetcradus({ className = "", style = {} }) {
  return (
    <>
      <style>{`
        .powered-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          height: 32px;
          padding: 0 14px;
          border-radius: 999px;
          background: #141318;
          border: 1px solid rgba(201, 162, 39, 0.4);
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.4);
          font-family: 'IBM Plex Mono', monospace;
          white-space: nowrap;
          user-select: none;
          vertical-align: middle;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .powered-badge:hover {
          border-color: rgba(201, 162, 39, 0.65);
          box-shadow: 0 6px 18px rgba(201, 162, 39, 0.2);
        }

        .powered-badge__sparkle {
          color: #E8CD7A;
          font-size: 11px;
          display: inline-flex;
          align-items: center;
        }

        .powered-badge__text {
          font-size: 12px;
          font-weight: 500;
          color: #9C978C;
        }

        .powered-badge__brand {
          font-size: 12px;
          font-weight: 700;
          color: #E8CD7A;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
      `}</style>
      <span className={`powered-badge ${className}`} style={style}>
        <span className="powered-badge__sparkle">✦</span>
        <span className="powered-badge__text">Powered by</span>
        <span className="powered-badge__brand">NETCRADUS</span>
      </span>
    </>
  );
}

export { PoweredByNetcradus as PoweredByBadge };
