import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

export default function StatCard({ title, value, change, isPositive, icon: Icon, subtext }) {
  return (
    <>
      <style>{`
        .stat-card {
          background: rgba(18, 17, 23, 0.75);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 18px;
          padding: 20px 22px;
          backdrop-filter: blur(14px);
          transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          overflow: hidden;
        }

        .stat-card:hover {
          transform: translateY(-3px);
          border-color: rgba(201, 162, 39, 0.4);
          box-shadow: 0 16px 36px -16px rgba(201, 162, 39, 0.25);
        }

        .stat-card__glow {
          position: absolute;
          top: 0;
          right: 0;
          width: 80px;
          height: 80px;
          background: radial-gradient(circle at 100% 0%, rgba(201,162,39,0.12), transparent 70%);
          pointer-events: none;
        }

        .stat-card__top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .stat-card__title {
          font-size: 13px;
          color: #9C978C;
          font-weight: 500;
        }

        .stat-card__icon-wrap {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          display: grid;
          place-items: center;
          background: rgba(201, 162, 39, 0.08);
          border: 1px solid rgba(201, 162, 39, 0.25);
          color: #E8CD7A;
        }

        .stat-card__bottom {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
        }

        .stat-card__value {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 24px;
          font-weight: 600;
          color: #F3EFE6;
          line-height: 1.1;
        }

        .stat-card__badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          font-weight: 600;
          padding: 3px 8px;
          border-radius: 999px;
        }

        .stat-card__badge--pos {
          background: rgba(52, 211, 153, 0.12);
          color: #34d399;
          border: 1px solid rgba(52, 211, 153, 0.25);
        }

        .stat-card__badge--neg {
          background: rgba(239, 68, 68, 0.12);
          color: #f87171;
          border: 1px solid rgba(239, 68, 68, 0.25);
        }

        .stat-card__subtext {
          font-size: 11.5px;
          color: #635E6B;
          margin-top: 4px;
        }
      `}</style>

      <div className="stat-card">
        <div className="stat-card__glow" />

        <div className="stat-card__top">
          <span className="stat-card__title">{title}</span>
          {Icon && (
            <div className="stat-card__icon-wrap">
              <Icon size={18} strokeWidth={1.6} />
            </div>
          )}
        </div>

        <div>
          <div className="stat-card__bottom">
            <span className="stat-card__value">{value}</span>
            {change && (
              <span className={`stat-card__badge ${isPositive ? "stat-card__badge--pos" : "stat-card__badge--neg"}`}>
                {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {change}
              </span>
            )}
          </div>
          {subtext && <div className="stat-card__subtext">{subtext}</div>}
        </div>
      </div>
    </>
  );
}
