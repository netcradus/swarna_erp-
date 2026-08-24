import React, { useState } from "react";
import { ShoppingBag, UserPlus, Package, ShoppingCart, Scale, ArrowLeftRight } from "lucide-react";
import QuickActionModal from "./QuickActionModal";

export default function QuickActions() {
  const [activeAction, setActiveAction] = useState(null);

  const actions = [
    { id: "new_sale", label: "New Sale", icon: ShoppingBag },
    { id: "add_customer", label: "Add Customer", icon: UserPlus },
    { id: "add_jewellery", label: "Add Jewellery", icon: Package },
    { id: "purchase", label: "Purchase", icon: ShoppingCart },
    { id: "old_gold", label: "Old Gold", icon: Scale },
    { id: "stock_transfer", label: "Stock Transfer", icon: ArrowLeftRight },
  ];

  return (
    <>
      <style>{`
        .quick-actions-bar {
          background: rgba(18, 17, 23, 0.75);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          padding: 16px 20px;
          backdrop-filter: blur(14px);
          display: flex;
          align-items: center;
          gap: 12px;
          overflow-x: auto;
        }

        .quick-actions-bar::-webkit-scrollbar {
          display: none;
        }

        .quick-actions-title {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px;
          font-weight: 600;
          color: #E8CD7A;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          white-space: nowrap;
          padding-right: 8px;
          border-right: 1px solid rgba(255, 255, 255, 0.08);
        }

        .quick-action-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 9px 16px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #F3EFE6;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.2s ease;
        }

        .quick-action-btn:hover {
          background: rgba(201, 162, 39, 0.15);
          border-color: rgba(201, 162, 39, 0.4);
          color: #E8CD7A;
          transform: translateY(-1px);
        }

        .quick-action-btn svg {
          color: #E8CD7A;
        }
      `}</style>

      <div className="quick-actions-bar">
        <div className="quick-actions-title">Quick Actions</div>
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <button
              key={act.id}
              className="quick-action-btn"
              onClick={() => setActiveAction(act.label)}
            >
              <Icon size={16} />
              <span>{act.label}</span>
            </button>
          );
        })}
      </div>

      <QuickActionModal
        isOpen={!!activeAction}
        actionTitle={activeAction}
        onClose={() => setActiveAction(null)}
      />
    </>
  );
}
