import React, { useState } from "react";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid
} from "recharts";

const dataSets = {
  today: [
    { time: "09:00", sales: 42000 },
    { time: "11:00", sales: 85000 },
    { time: "13:00", sales: 140000 },
    { time: "15:00", sales: 210000 },
    { time: "17:00", sales: 320000 },
    { time: "19:00", sales: 438200 },
  ],
  "7d": [
    { time: "Mon", sales: 280000 },
    { time: "Tue", sales: 340000 },
    { time: "Wed", sales: 310000 },
    { time: "Thu", sales: 420000 },
    { time: "Fri", sales: 490000 },
    { time: "Sat", sales: 680000 },
    { time: "Sun", sales: 540000 },
  ],
  "30d": [
    { time: "Week 1", sales: 2400000 },
    { time: "Week 2", sales: 3100000 },
    { time: "Week 3", sales: 2900000 },
    { time: "Week 4", sales: 4400000 },
  ],
  year: [
    { time: "Jan", sales: 8500000 },
    { time: "Feb", sales: 9200000 },
    { time: "Mar", sales: 11000000 },
    { time: "Apr", sales: 9800000 },
    { time: "May", sales: 12500000 },
    { time: "Jun", sales: 14000000 },
    { time: "Jul", sales: 13200000 },
    { time: "Aug", sales: 12800000 },
  ],
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: "#16151A",
        border: "1px solid rgba(201,162,39,0.4)",
        borderRadius: "10px",
        padding: "10px 14px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
      }}>
        <div style={{ fontSize: "11px", color: "#9C978C", marginBottom: "4px" }}>{label}</div>
        <div style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: "14px", color: "#E8CD7A", fontWeight: 600 }}>
          ₹{payload[0].value.toLocaleString("en-IN")}
        </div>
      </div>
    );
  }
  return null;
};

export default function SalesChart() {
  const [period, setPeriod] = useState("7d");

  return (
    <>
      <style>{`
        .sales-chart-card {
          background: rgba(18, 17, 23, 0.75);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          padding: 24px;
          backdrop-filter: blur(14px);
        }

        .sales-chart__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
          flex-wrap: wrap;
          gap: 12px;
        }

        .sales-chart__title h3 {
          font-family: 'Fraunces', serif;
          font-size: 20px;
          font-weight: 500;
          color: #F3EFE6;
          margin: 0;
        }

        .sales-chart__title p {
          font-size: 12.5px;
          color: #9C978C;
          margin: 2px 0 0 0;
        }

        .sales-chart__tabs {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 255, 255, 0.03);
          padding: 4px;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.06);
        }

        .sales-chart__tab {
          padding: 6px 14px;
          border-radius: 7px;
          border: none;
          background: transparent;
          color: #9C978C;
          font-family: 'Manrope', sans-serif;
          font-size: 12.5px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .sales-chart__tab:hover {
          color: #F3EFE6;
        }

        .sales-chart__tab--active {
          background: rgba(201, 162, 39, 0.18);
          color: #E8CD7A;
          border: 1px solid rgba(201, 162, 39, 0.3);
        }
      `}</style>

      <div className="sales-chart-card">
        <div className="sales-chart__header">
          <div className="sales-chart__title">
            <h3>Sales Overview</h3>
            <p>Real-time revenue performance across selected timeframe</p>
          </div>

          <div className="sales-chart__tabs">
            {[
              { id: "today", label: "Today" },
              { id: "7d", label: "7 Days" },
              { id: "30d", label: "30 Days" },
              { id: "year", label: "This Year" },
            ].map((t) => (
              <button
                key={t.id}
                className={`sales-chart__tab ${period === t.id ? "sales-chart__tab--active" : ""}`}
                onClick={() => setPeriod(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ width: "100%", height: 280 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dataSets[period]} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="salesGoldGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#C9A227" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#C9A227" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="time" stroke="#635E6B" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis
                stroke="#635E6B"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(val) =>
                  val >= 10000000 ? `${(val / 10000000).toFixed(1)}Cr` : val >= 100000 ? `${(val / 100000).toFixed(1)}L` : `${val / 1000}k`
                }
              />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="sales" stroke="#C9A227" strokeWidth={2.5} fill="url(#salesGoldGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}
