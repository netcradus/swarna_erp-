import React from "react";

const salesData = [
  { invoice: "INV-10482", customer: "Rahul Jewellers", items: "Gold Ring (22K)", weight: "8.42 g", amount: "₹78,420", status: "Paid" },
  { invoice: "INV-10481", customer: "Priya Sharma", items: "Diamond Necklace", weight: "12.10 g", amount: "₹1,84,600", status: "Paid" },
  { invoice: "INV-10480", customer: "Amit Verma", items: "Gold Chain", weight: "21.40 g", amount: "₹1,92,300", status: "Pending" },
  { invoice: "INV-10479", customer: "Kavita Singhania", items: "Solitaire Ring", weight: "4.80 g", amount: "₹1,25,000", status: "Paid" },
  { invoice: "INV-10478", customer: "Rajesh Malhotra", items: "Bangles Set (4pcs)", weight: "44.50 g", amount: "₹3,45,000", status: "Partial" },
];

export default function RecentSales() {
  return (
    <>
      <style>{`
        .recent-sales-card {
          background: rgba(18, 17, 23, 0.75);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          padding: 24px;
          backdrop-filter: blur(14px);
        }

        .recent-sales__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 18px;
        }

        .recent-sales__header h3 {
          font-family: 'Fraunces', serif;
          font-size: 20px;
          font-weight: 500;
          color: #F3EFE6;
          margin: 0;
        }

        .recent-sales__header p {
          font-size: 12.5px;
          color: #9C978C;
          margin: 2px 0 0 0;
        }

        .table-responsive {
          width: 100%;
          overflow-x: auto;
        }

        .sales-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 13px;
        }

        .sales-table th {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #635E6B;
          padding: 12px 14px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          font-weight: 600;
        }

        .sales-table td {
          padding: 14px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
          color: #F3EFE6;
        }

        .sales-table tr:hover td {
          background: rgba(255, 255, 255, 0.02);
        }

        .invoice-id {
          font-family: 'IBM Plex Mono', monospace;
          color: #E8CD7A;
          font-weight: 600;
        }

        .badge-status {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 999px;
          font-size: 11.5px;
          font-weight: 600;
        }

        .badge-status--paid {
          background: rgba(52, 211, 153, 0.12);
          color: #34d399;
          border: 1px solid rgba(52, 211, 153, 0.25);
        }

        .badge-status--pending {
          background: rgba(251, 191, 36, 0.12);
          color: #fbbf24;
          border: 1px solid rgba(251, 191, 36, 0.25);
        }

        .badge-status--partial {
          background: rgba(96, 165, 250, 0.12);
          color: #60a5fa;
          border: 1px solid rgba(96, 165, 250, 0.25);
        }
      `}</style>

      <div className="recent-sales-card">
        <div className="recent-sales__header">
          <div>
            <h3>Recent Sales & Invoices</h3>
            <p>Latest transaction stream across retail counters</p>
          </div>
        </div>

        <div className="table-responsive">
          <table className="sales-table">
            <thead>
              <tr>
                <th>Invoice</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Weight</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {salesData.map((row) => (
                <tr key={row.invoice}>
                  <td className="invoice-id">{row.invoice}</td>
                  <td style={{ fontWeight: 500 }}>{row.customer}</td>
                  <td style={{ color: "#9C978C" }}>{row.items}</td>
                  <td style={{ fontFamily: "IBM Plex Mono, monospace" }}>{row.weight}</td>
                  <td style={{ fontFamily: "IBM Plex Mono, monospace", fontWeight: 600, color: "#E8CD7A" }}>
                    {row.amount}
                  </td>
                  <td>
                    <span className={`badge-status badge-status--${row.status.toLowerCase()}`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
