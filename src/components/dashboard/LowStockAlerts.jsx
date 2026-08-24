import React from "react";
import { AlertTriangle, ArrowRight } from "lucide-react";

const lowStockItems = [
  { name: "Diamond Ring (18K)", category: "Diamond", count: 2, threshold: 5 },
  { name: "Gold Chain 22K (Lightweight)", category: "Gold", count: 3, threshold: 8 },
  { name: "Silver Bracelet 925", category: "Silver", count: 4, threshold: 10 },
  { name: "Kundhan Polki Earrings", category: "Polki", count: 1, threshold: 4 },
];

export default function LowStockAlerts({ onViewInventory }) {
  return (
    <>
      <style>{`
        .low-stock-card {
          background: rgba(18, 17, 23, 0.75);
          border: 1px solid rgba(239, 68, 68, 0.25);
          border-radius: 20px;
          padding: 24px;
          backdrop-filter: blur(14px);
        }

        .low-stock__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 18px;
        }

        .low-stock__title {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .low-stock__icon {
          width: 34px;
          height: 34px;
          border-radius: 10px;
          background: rgba(239, 68, 68, 0.12);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #f87171;
          display: grid;
          place-items: center;
        }

        .low-stock__title h3 {
          font-family: 'Fraunces', serif;
          font-size: 19px;
          font-weight: 500;
          color: #F3EFE6;
          margin: 0;
        }

        .low-stock-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 20px;
        }

        .low-stock-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 14px;
          border-radius: 12px;
          background: rgba(10, 10, 11, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .low-stock-item__info h4 {
          font-size: 13.5px;
          font-weight: 600;
          color: #F3EFE6;
          margin: 0 0 2px 0;
        }

        .low-stock-item__info span {
          font-size: 11.5px;
          color: #9C978C;
        }

        .low-stock-badge {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 12px;
          font-weight: 600;
          color: #f87171;
          background: rgba(239, 68, 68, 0.12);
          border: 1px solid rgba(239, 68, 68, 0.25);
          padding: 4px 10px;
          border-radius: 8px;
        }

        .btn-view-inv {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: 11px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #E8CD7A;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-view-inv:hover {
          background: rgba(201, 162, 39, 0.12);
          border-color: rgba(201, 162, 39, 0.3);
        }
      `}</style>

      <div className="low-stock-card">
        <div className="low-stock__header">
          <div className="low-stock__title">
            <div className="low-stock__icon">
              <AlertTriangle size={18} />
            </div>
            <h3>Low Stock Alerts</h3>
          </div>
        </div>

        <div className="low-stock-list">
          {lowStockItems.map((item) => (
            <div key={item.name} className="low-stock-item">
              <div className="low-stock-item__info">
                <h4>{item.name}</h4>
                <span>Category: {item.category}</span>
              </div>
              <span className="low-stock-badge">
                {item.count} pcs remaining
              </span>
            </div>
          ))}
        </div>

        <button className="btn-view-inv" onClick={onViewInventory}>
          View Inventory <ArrowRight size={16} />
        </button>
      </div>
    </>
  );
}
