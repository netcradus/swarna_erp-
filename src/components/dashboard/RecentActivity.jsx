import React from "react";
import { Coins, FileText, UserPlus, ArrowLeftRight, Hammer } from "lucide-react";

const activities = [
  { id: 1, icon: Coins, action: "Admin updated gold rate", detail: "22K set to ₹7,412/g", user: "Rajesh Kumar", time: "10 mins ago" },
  { id: 2, icon: FileText, action: "Sales invoice INV-10482 generated", detail: "Gold Ring (8.42g) • ₹78,420", user: "Pooja Verma", time: "25 mins ago" },
  { id: 3, icon: UserPlus, action: "New customer added", detail: "Vikram Sethi (VIP Member)", user: "Suresh Gupta", time: "1 hour ago" },
  { id: 4, icon: ArrowLeftRight, action: "Stock transferred to Noida Branch", detail: "15 items • Gold & Diamond", user: "Admin User", time: "2 hours ago" },
  { id: 5, icon: Hammer, action: "Karigar job completed", detail: "Job #JOB-9421 • Fine wt 18.5g", user: "Ramesh Karigar", time: "4 hours ago" },
];

export default function RecentActivity() {
  return (
    <>
      <style>{`
        .activity-card {
          background: rgba(18, 17, 23, 0.75);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          padding: 24px;
          backdrop-filter: blur(14px);
        }

        .activity__header {
          margin-bottom: 20px;
        }

        .activity__header h3 {
          font-family: 'Fraunces', serif;
          font-size: 20px;
          font-weight: 500;
          color: #F3EFE6;
          margin: 0;
        }

        .activity__header p {
          font-size: 12.5px;
          color: #9C978C;
          margin: 2px 0 0 0;
        }

        .activity-timeline {
          display: flex;
          flex-direction: column;
          gap: 18px;
          position: relative;
        }

        .activity-timeline::before {
          content: '';
          position: absolute;
          top: 10px;
          bottom: 10px;
          left: 17px;
          width: 1px;
          background: rgba(255, 255, 255, 0.08);
        }

        .activity-item {
          display: flex;
          gap: 14px;
          position: relative;
          z-index: 1;
        }

        .activity-icon {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #16151A;
          border: 1px solid rgba(201, 162, 39, 0.3);
          color: #E8CD7A;
          display: grid;
          place-items: center;
          flex-shrink: 0;
        }

        .activity-content {
          flex: 1;
          background: rgba(10, 10, 11, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 12px;
          padding: 10px 14px;
        }

        .activity-action {
          font-size: 13.5px;
          font-weight: 600;
          color: #F3EFE6;
        }

        .activity-detail {
          font-size: 12px;
          color: #9C978C;
          margin-top: 2px;
        }

        .activity-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 11px;
          color: #635E6B;
          margin-top: 6px;
          padding-top: 6px;
          border-top: 1px dashed rgba(255, 255, 255, 0.06);
        }

        .activity-user {
          color: #E8CD7A;
        }
      `}</style>

      <div className="activity-card">
        <div className="activity__header">
          <h3>Recent Activity Log</h3>
          <p>Real-time audit trail of operational events</p>
        </div>

        <div className="activity-timeline">
          {activities.map((act) => {
            const Icon = act.icon;
            return (
              <div key={act.id} className="activity-item">
                <div className="activity-icon">
                  <Icon size={16} />
                </div>
                <div className="activity-content">
                  <div className="activity-action">{act.action}</div>
                  <div className="activity-detail">{act.detail}</div>
                  <div className="activity-meta">
                    <span className="activity-user">By {act.user}</span>
                    <span>{act.time}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
