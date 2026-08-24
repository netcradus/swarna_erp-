import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from "recharts";

const branchData = [
  { branch: "Delhi", sales: 48.5, target: 50 },
  { branch: "Noida", sales: 32.4, target: 30 },
  { branch: "Ghaziabad", sales: 18.2, target: 20 },
  { branch: "Jaipur", sales: 29.8, target: 25 },
  { branch: "Mumbai", sales: 42.1, target: 40 },
];

export default function BranchPerformance() {
  return (
    <>
      <style>{`
        .branch-chart-card {
          background: rgba(18, 17, 23, 0.75);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          padding: 24px;
          backdrop-filter: blur(14px);
        }

        .branch-chart__header {
          margin-bottom: 20px;
        }

        .branch-chart__header h3 {
          font-family: 'Fraunces', serif;
          font-size: 20px;
          font-weight: 500;
          color: #F3EFE6;
          margin: 0;
        }

        .branch-chart__header p {
          font-size: 12.5px;
          color: #9C978C;
          margin: 2px 0 0 0;
        }
      `}</style>

      <div className="branch-chart-card">
        <div className="branch-chart__header">
          <h3>Branch Performance</h3>
          <p>Monthly sales turnover by store location (₹ in Lakhs)</p>
        </div>

        <div style={{ width: "100%", height: 260 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={branchData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="branch" stroke="#635E6B" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#635E6B" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v}L`} />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div style={{
                        background: "#16151A",
                        border: "1px solid rgba(201,162,39,0.4)",
                        borderRadius: "10px",
                        padding: "10px 14px",
                      }}>
                        <div style={{ fontSize: "12px", color: "#F3EFE6", fontWeight: 600 }}>{data.branch} Branch</div>
                        <div style={{ fontFamily: "IBM Plex Mono, monospace", fontSize: "14px", color: "#E8CD7A", marginTop: "4px" }}>
                          Sales: ₹{data.sales} Lakhs
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="sales" radius={[6, 6, 0, 0]}>
                {branchData.map((entry, index) => (
                  <Cell key={`bar-${index}`} fill={index === 0 ? "#E8CD7A" : "#C9A227"} opacity={0.85 + index * 0.03} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}
