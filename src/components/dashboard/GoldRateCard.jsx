import React, { useState } from "react";
import { Coins, Clock } from "lucide-react";
import GoldRateModal from "./GoldRateModal";

export default function GoldRateCard() {
  const [rates, setRates] = useState({
    "22K": 7412,
    "24K": 8085,
    "Silver": 96.50,
    updatedTime: "10 minutes ago",
  });

  const [modalOpen, setModalOpen] = useState(false);

  const handleUpdate = (newRates) => {
    setRates(newRates);
  };

  return (
    <>
      <style>{`
        .gold-rate-card {
          background: linear-gradient(145deg, rgba(201, 162, 39, 0.12) 0%, rgba(18, 17, 23, 0.85) 100%);
          border: 1px solid rgba(201, 162, 39, 0.35);
          border-radius: 20px;
          padding: 24px;
          backdrop-filter: blur(14px);
          position: relative;
          overflow: hidden;
          box-shadow: 0 15px 35px -10px rgba(201, 162, 39, 0.15);
        }

        .gold-rate__header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .gold-rate__title {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .gold-rate__icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: rgba(201, 162, 39, 0.2);
          border: 1px solid rgba(201, 162, 39, 0.4);
          color: #E8CD7A;
          display: grid;
          place-items: center;
        }

        .gold-rate__title h3 {
          font-family: 'Fraunces', serif;
          font-size: 19px;
          font-weight: 500;
          color: #F3EFE6;
          margin: 0;
        }

        .gold-rate__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 20px;
        }

        .gold-rate-item {
          background: rgba(10, 10, 11, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 12px 14px;
        }

        .gold-rate-item__label {
          font-size: 11.5px;
          color: #9C978C;
          margin-bottom: 4px;
          font-weight: 600;
        }

        .gold-rate-item__val {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 16px;
          font-weight: 600;
          color: #E8CD7A;
        }

        .gold-rate__footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 14px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .gold-rate__time {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: #9C978C;
        }

        .btn-update-rate {
          padding: 8px 14px;
          border-radius: 8px;
          background: rgba(201, 162, 39, 0.15);
          border: 1px solid rgba(201, 162, 39, 0.35);
          color: #E8CD7A;
          font-size: 12.5px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-update-rate:hover {
          background: rgba(201, 162, 39, 0.3);
          color: #F3EFE6;
        }
      `}</style>

      <div className="gold-rate-card">
        <div className="gold-rate__header">
          <div className="gold-rate__title">
            <div className="gold-rate__icon">
              <Coins size={18} />
            </div>
            <div>
              <h3>Today's Gold Rate</h3>
            </div>
          </div>
        </div>

        <div className="gold-rate__grid">
          <div className="gold-rate-item">
            <div className="gold-rate-item__label">22K Gold</div>
            <div className="gold-rate-item__val">₹{rates["22K"].toLocaleString("en-IN")} / g</div>
          </div>

          <div className="gold-rate-item">
            <div className="gold-rate-item__label">24K Gold</div>
            <div className="gold-rate-item__val">₹{rates["24K"].toLocaleString("en-IN")} / g</div>
          </div>

          <div className="gold-rate-item">
            <div className="gold-rate-item__label">Silver Rate</div>
            <div className="gold-rate-item__val">₹{rates["Silver"].toFixed(2)} / g</div>
          </div>
        </div>

        <div className="gold-rate__footer">
          <div className="gold-rate__time">
            <Clock size={14} />
            <span>Updated {rates.updatedTime}</span>
          </div>

          <button className="btn-update-rate" onClick={() => setModalOpen(true)}>
            Update Rate
          </button>
        </div>
      </div>

      <GoldRateModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        currentRates={rates}
        onUpdate={handleUpdate}
      />
    </>
  );
}
