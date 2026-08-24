import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

const inventoryData = [
  { name: "Gold Jewellery", value: 54, color: "#C9A227" },
  { name: "Diamond Jewellery", value: 28, color: "#BFE9F7" },
  { name: "Silver Items", value: 12, color: "#9CA3AF" },
  { name: "Gemstones & Others", value: 6, color: "#6B7280" },
];

export default function InventoryChart() {
  return (
    <>
      <style>{`
        .inv-chart-card {
          background: rgba(18, 17, 23, 0.75);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          padding: 24px;
          backdrop-filter: blur(14px);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .inv-chart__header h3 {
          font-family: 'Fraunces', serif;
          font-size: 20px;
          font-weight: 500;
          color: #F3EFE6;
          margin: 0;
        }

        .inv-chart__header p {
          font-size: 12.5px;
          color: #9C978C;
          margin: 2px 0 0 0;
        }

        .inv-chart__legend {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
          margin-top: 14px;
        }

        .inv-legend-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12.5px;
          color: #9C978C;
        }

        .inv-legend-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .inv-legend-val {
          margin-left: auto;
          font-family: 'IBM Plex Mono', monospace;
          font-weight: 600;
          color: #F3EFE6;
        }
      `}</style>

      <div className="inv-chart-card">
        <div className="inv-chart__header">
          <h3>Inventory Distribution</h3>
          <p>Stock composition by category</p>
        </div>

        <div style={{ width: "100%", height: 190, margin: "10px 0" }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={inventoryData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
              >
                {inventoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="#100F14" strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div style={{
                        background: "#16151A",
                        border: `1px solid ${data.color}`,
                        borderRadius: "8px",
                        padding: "8px 12px",
                        fontSize: "12px",
                        color: "#F3EFE6",
                        fontFamily: "Manrope, sans-serif",
                      }}>
                        <b>{data.name}</b>: {data.value}%
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="inv-chart__legend">
          {inventoryData.map((item) => (
            <div key={item.name} className="inv-legend-item">
              <span className="inv-legend-dot" style={{ background: item.color }} />
              <span>{item.name}</span>
              <span className="inv-legend-val">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
