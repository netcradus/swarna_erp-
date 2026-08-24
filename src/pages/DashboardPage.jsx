import React, { useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import Header from "../components/dashboard/Header";
import StatCard from "../components/dashboard/StatCard";
import SalesChart from "../components/dashboard/SalesChart";
import InventoryChart from "../components/dashboard/InventoryChart";
import BranchPerformance from "../components/dashboard/BranchPerformance";
import GoldRateCard from "../components/dashboard/GoldRateCard";
import RecentSales from "../components/dashboard/RecentSales";
import LowStockAlerts from "../components/dashboard/LowStockAlerts";
import RecentActivity from "../components/dashboard/RecentActivity";
import QuickActions from "../components/dashboard/QuickActions";
import UserMenu from "../components/dashboard/UserMenu";
import { Wallet, ShoppingBag, Coins, Diamond, ArrowDownLeft, Clock, ArrowRight } from "lucide-react";

export default function DashboardPage() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <div className="erp-dashboard">
      <style>{`
        .erp-dashboard {
          min-height: 100vh;
          width: 100%;
          background: #0A0A0B;
          color: #F3EFE6;
          font-family: 'Manrope', sans-serif;
          display: flex;
          position: relative;
        }

        .erp-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
          overflow-x: hidden;
        }

        .erp-content {
          padding: 28px;
          display: flex;
          flex-direction: column;
          gap: 24px;
          max-width: 1600px;
          width: 100%;
          margin: 0 auto;
        }

        /* KPI Grid */
        .kpi-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 16px;
        }

        @media (max-width: 1400px) {
          .kpi-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (max-width: 768px) {
          .kpi-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 480px) {
          .kpi-grid {
            grid-template-columns: 1fr;
          }
        }

        /* Grid Layout Sections */
        .dashboard-row-2 {
          display: grid;
          grid-template-columns: 2.1fr 1fr;
          gap: 20px;
        }

        @media (max-width: 1100px) {
          .dashboard-row-2 {
            grid-template-columns: 1fr;
          }
        }

        .dashboard-row-3 {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 20px;
        }

        @media (max-width: 1200px) {
          .dashboard-row-3 {
            grid-template-columns: 1fr;
          }
        }

        .dashboard-row-sales-activity {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 20px;
        }

        @media (max-width: 1100px) {
          .dashboard-row-sales-activity {
            grid-template-columns: 1fr;
          }
        }

        /* Sub-module View Header */
        .submodule-banner {
          background: rgba(18, 17, 23, 0.75);
          border: 1px solid rgba(201, 162, 39, 0.3);
          border-radius: 20px;
          padding: 32px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
        }

        .submodule-banner h2 {
          font-family: 'Fraunces', serif;
          font-size: 26px;
          color: #F3EFE6;
          margin: 0;
          text-transform: capitalize;
        }

        .submodule-banner p {
          font-size: 14px;
          color: #9C978C;
          max-width: 500px;
          margin: 0;
        }

        .btn-back-dash {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          border-radius: 10px;
          background: rgba(201, 162, 39, 0.15);
          border: 1px solid rgba(201, 162, 39, 0.3);
          color: #E8CD7A;
          font-size: 13.5px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }

        .btn-back-dash:hover {
          background: rgba(201, 162, 39, 0.3);
        }

        @media (max-width: 768px) {
          .erp-content {
            padding: 16px;
            gap: 16px;
          }
        }
      `}</style>

      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main className="erp-main">
        <Header
          setMobileOpen={setMobileOpen}
          onOpenUserMenu={() => setUserMenuOpen(true)}
        />

        <div className="erp-content">
          {activeTab === "dashboard" ? (
            <>
              {/* Quick Actions Toolbar */}
              <QuickActions />

              {/* 6 KPI Cards Grid */}
              <div className="kpi-grid">
                <StatCard
                  title="Today's Revenue"
                  value="₹4,38,200"
                  change="12.4%"
                  isPositive={true}
                  icon={Wallet}
                  subtext="18 Invoices Billed"
                />
                <StatCard
                  title="Monthly Sales"
                  value="₹1.28 Cr"
                  change="8.6%"
                  isPositive={true}
                  icon={ShoppingBag}
                  subtext="August 2026 Turnover"
                />
                <StatCard
                  title="Gold Stock"
                  value="38.2 kg"
                  change="2.1%"
                  isPositive={true}
                  icon={Coins}
                  subtext="Fine Net Weight"
                />
                <StatCard
                  title="Diamond Stock"
                  value="912 ct"
                  change="0.5%"
                  isPositive={false}
                  icon={Diamond}
                  subtext="Certified Solitaires"
                />
                <StatCard
                  title="Customer Outstanding"
                  value="₹9.4 L"
                  change="3.2%"
                  isPositive={false}
                  icon={ArrowDownLeft}
                  subtext="Receivable Dues"
                />
                <StatCard
                  title="Open Orders"
                  value="64"
                  change="14.0%"
                  isPositive={true}
                  icon={Clock}
                  subtext="Karigar & Custom Work"
                />
              </div>

              {/* Row 2: Sales Overview Chart + Inventory Donut Chart */}
              <div className="dashboard-row-2">
                <SalesChart />
                <InventoryChart />
              </div>

              {/* Row 3: Branch Performance Bar Chart + Gold Rate Card + Low Stock Alerts */}
              <div className="dashboard-row-3">
                <BranchPerformance />
                <GoldRateCard />
                <LowStockAlerts onViewInventory={() => setActiveTab("jewellery_inv")} />
              </div>

              {/* Row 4: Recent Sales Table + Recent Activity Timeline */}
              <div className="dashboard-row-sales-activity">
                <RecentSales />
                <RecentActivity />
              </div>
            </>
          ) : (
            <div className="submodule-banner">
              <h2>{activeTab.replace(/_/g, " ")} Module</h2>
              <p>
                Integrated enterprise module active in Svarna ERP suite. Connected to role permissions and live branch data.
              </p>
              <button className="btn-back-dash" onClick={() => setActiveTab("dashboard")}>
                Return to Overview Dashboard <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      </main>

      <UserMenu isOpen={userMenuOpen} onClose={() => setUserMenuOpen(false)} />
    </div>
  );
}
