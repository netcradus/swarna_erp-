import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Gem, Eye, EyeOff, Lock, CheckCircle2, ArrowRight,
  Sparkles, Coins, Boxes, TrendingUp, AlertCircle
} from "lucide-react";
import { useAuth } from "../auth/AuthContext";
import PoweredByBadge from "../components/common/PoweredByBadge";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState("admin@svarna.com");
  const [password, setPassword] = useState("admin123");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!identifier.trim()) {
      setError("Please enter your email or username.");
      return;
    }
    if (!password.trim()) {
      setError("Please enter your password.");
      return;
    }

    try {
      setLoading(true);
      await login(identifier, password, remember);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Failed to sign in. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <style>{`
        .login-page {
          min-height: 100vh;
          width: 100%;
          background: #0A0A0B;
          color: #F3EFE6;
          font-family: 'Manrope', sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .login-page__bg-glow {
          position: absolute;
          width: 800px;
          height: 800px;
          background: radial-gradient(circle at 50% 50%, rgba(201,162,39,0.12), transparent 70%);
          top: -200px;
          left: -200px;
          pointer-events: none;
        }

        .login-page__container {
          width: 100%;
          max-width: 1200px;
          min-height: 720px;
          margin: 24px;
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          background: rgba(18, 17, 23, 0.75);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          box-shadow: 0 30px 80px -20px rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(20px);
          overflow: hidden;
        }

        /* Left Visual Panel */
        .login-left {
          background: linear-gradient(145deg, rgba(22, 21, 26, 0.95) 0%, rgba(10, 10, 11, 0.98) 100%);
          padding: 50px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border-right: 1px solid rgba(255, 255, 255, 0.06);
          position: relative;
        }

        .login-left__brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .login-left__mark {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          display: grid;
          place-items: center;
          background: linear-gradient(135deg, rgba(201,162,39,0.3), rgba(201,162,39,0.05));
          border: 1px solid rgba(201,162,39,0.4);
          color: #E8CD7A;
          box-shadow: 0 0 20px rgba(201,162,39,0.2);
        }

        .login-left__brand-text {
          font-family: 'Fraunces', serif;
          font-size: 24px;
          font-weight: 500;
          letter-spacing: -0.02em;
        }

        .login-left__brand-accent {
          color: #E8CD7A;
        }

        .login-powered {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px;
          color: #9C978C;
          background: rgba(201, 162, 39, 0.08);
          border: 1px solid rgba(201, 162, 39, 0.25);
          padding: 3.5px 10px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          margin-left: 8px;
        }

        .login-powered strong {
          color: #E8CD7A;
          font-weight: 600;
        }

        .login-left__badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          border-radius: 999px;
          background: rgba(201,162,39,0.08);
          border: 1px solid rgba(201,162,39,0.25);
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px;
          color: #E8CD7A;
          margin-top: 24px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .login-left__headline {
          margin-top: 14px;
        }

        .login-left__title {
          font-family: 'Fraunces', serif;
          font-size: 34px;
          line-height: 1.2;
          font-weight: 500;
          color: #F3EFE6;
          margin: 0 0 14px 0;
        }

        .login-left__desc {
          font-size: 15px;
          color: #9C978C;
          line-height: 1.6;
          max-width: 480px;
          margin: 0;
        }

        /* Abstract Jewellery / ERP Visual */
        .login-left__visual {
          position: relative;
          margin: 32px 0;
          padding: 24px;
          background: radial-gradient(circle at 50% 50%, rgba(201,162,39,0.06), transparent 70%), rgba(0,0,0,0.3);
          border: 1px solid rgba(201,162,39,0.2);
          border-radius: 18px;
          min-height: 220px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          justify-content: center;
        }

        .diamond-line {
          position: absolute;
          inset: 0;
          opacity: 0.15;
          pointer-events: none;
          background-image: 
            linear-gradient(45deg, #C9A227 25%, transparent 25%), 
            linear-gradient(-45deg, #C9A227 25%, transparent 25%), 
            linear-gradient(135deg, #C9A227 25%, transparent 25%), 
            linear-gradient(-135deg, #C9A227 25%, transparent 25%);
          background-size: 30px 30px;
          background-position: 0 0, 0 15px, 15px -15px, -15px 0px;
        }

        .mini-card-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          position: relative;
          z-index: 1;
        }

        .mini-card {
          background: rgba(19, 18, 23, 0.85);
          border: 1px solid rgba(201,162,39,0.25);
          border-radius: 12px;
          padding: 12px;
          backdrop-filter: blur(10px);
        }

        .mini-card__head {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          color: #9C978C;
          margin-bottom: 6px;
        }

        .mini-card__head svg {
          color: #E8CD7A;
        }

        .mini-card__value {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 14px;
          font-weight: 600;
          color: #F3EFE6;
        }

        .mini-card__sub {
          font-size: 10px;
          color: #E8CD7A;
          margin-top: 2px;
        }

        .login-left__trust {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }

        .trust-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: #9C978C;
        }

        .trust-item svg {
          color: #C9A227;
        }

        /* Right Form Panel */
        .login-right {
          padding: 50px 48px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background: rgba(12, 11, 15, 0.95);
        }

        .login-right__header h2 {
          font-family: 'Fraunces', serif;
          font-size: 30px;
          font-weight: 500;
          margin: 0 0 6px 0;
          color: #F3EFE6;
        }

        .login-right__header p {
          font-size: 14px;
          color: #9C978C;
          margin: 0;
        }

        .login-form {
          margin-top: 28px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-group label {
          font-size: 13px;
          font-weight: 600;
          color: #F3EFE6;
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-wrapper input {
          width: 100%;
          height: 48px;
          padding: 0 16px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          color: #F3EFE6;
          font-size: 14px;
          font-family: 'Manrope', sans-serif;
          outline: none;
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
        }

        .input-wrapper input:focus {
          border-color: rgba(201,162,39,0.6);
          box-shadow: 0 0 0 3px rgba(201,162,39,0.15);
          background: rgba(255, 255, 255, 0.06);
        }

        .input-wrapper input::placeholder {
          color: #635E6B;
        }

        .toggle-password {
          position: absolute;
          right: 14px;
          background: none;
          border: none;
          color: #9C978C;
          cursor: pointer;
          padding: 4px;
          display: grid;
          place-items: center;
        }

        .toggle-password:hover {
          color: #F3EFE6;
        }

        .form-options {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 13px;
        }

        .remember-me {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #9C978C;
          cursor: pointer;
          user-select: none;
        }

        .remember-me input {
          accent-color: #C9A227;
          width: 16px;
          height: 16px;
        }

        .forgot-link {
          color: #E8CD7A;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s ease;
        }

        .forgot-link:hover {
          color: #C9A227;
          text-decoration: underline;
        }

        .btn-submit {
          width: 100%;
          height: 50px;
          margin-top: 8px;
          border-radius: 12px;
          border: none;
          background: linear-gradient(135deg, #E8CD7A, #C9A227 60%);
          color: #171208;
          font-family: 'Manrope', sans-serif;
          font-size: 15px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          cursor: pointer;
          box-shadow: 0 8px 25px -6px rgba(201,162,39,0.5);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .btn-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px -4px rgba(201,162,39,0.7);
        }

        .btn-submit:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        .spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(23, 18, 8, 0.3);
          border-top-color: #171208;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        .error-message {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 14px;
          border-radius: 10px;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #f87171;
          font-size: 13px;
        }

        .security-badge {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 16px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          margin-top: 24px;
        }

        .security-badge svg {
          color: #E8CD7A;
          flex-shrink: 0;
        }

        .security-badge p {
          font-size: 11.5px;
          color: #9C978C;
          margin: 0;
          line-height: 1.4;
        }

        .security-badge strong {
          color: #F3EFE6;
          display: block;
          margin-bottom: 2px;
        }

        .account-access {
          margin-top: 24px;
          text-align: center;
          font-size: 13px;
          color: #9C978C;
        }

        .account-access span {
          color: #E8CD7A;
          font-weight: 600;
        }

        @media (max-width: 960px) {
          .login-page__container {
            grid-template-columns: 1fr;
            min-height: auto;
          }
          .login-left {
            display: none;
          }
          .login-right {
            padding: 36px 24px;
          }
        }
      `}</style>

      <div className="login-page__bg-glow" />

      <div className="login-page__container">
        {/* LEFT PANEL */}
        <div className="login-left">
          <div>
            <div className="login-left__brand">
              <span className="login-left__mark">
                <Gem size={22} strokeWidth={1.6} />
              </span>
              <span className="login-left__brand-text">
                Svarna<span className="login-left__brand-accent">ERP</span>
              </span>
              <PoweredByBadge />
            </div>

            <div className="login-left__badge">
              <Sparkles size={12} /> Complete Jewellery Management
            </div>

            <div className="login-left__headline">
              <h1 className="login-left__title">Enterprise Control for Modern Jewellers</h1>
              <p className="login-left__desc">
                Manage inventory, gold rates, diamonds, billing, customers, karigars, branches and accounts — all from one powerful platform.
              </p>
            </div>
          </div>

          <div className="login-left__visual">
            <div className="diamond-line" />
            <div className="mini-card-grid">
              <div className="mini-card">
                <div className="mini-card__head">
                  <Coins size={14} /> Live Gold Rate
                </div>
                <div className="mini-card__value">₹7,412 /g</div>
                <div className="mini-card__sub">22K Fine Gold</div>
              </div>
              <div className="mini-card">
                <div className="mini-card__head">
                  <TrendingUp size={14} /> Today's Sales
                </div>
                <div className="mini-card__value">₹4,38,200</div>
                <div className="mini-card__sub">▲ 12.4% vs yesterday</div>
              </div>
              <div className="mini-card">
                <div className="mini-card__head">
                  <Boxes size={14} /> Total Items
                </div>
                <div className="mini-card__value">12,450</div>
                <div className="mini-card__sub">Across 5 Branches</div>
              </div>
            </div>
          </div>

          <div className="login-left__trust">
            <div className="trust-item">
              <CheckCircle2 size={16} /> Secure Authentication
            </div>
            <div className="trust-item">
              <CheckCircle2 size={16} /> Role-Based Access
            </div>
            <div className="trust-item">
              <CheckCircle2 size={16} /> Multi-Branch Ready
            </div>
            <div className="trust-item">
              <CheckCircle2 size={16} /> Cloud Based Architecture
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="login-right">
          <div>
            <div className="login-right__header">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px", flexWrap: "wrap", gap: "8px" }}>
                <h2 style={{ margin: 0 }}>Welcome back</h2>
                <PoweredByBadge />
              </div>
              <p>Sign in to your Svarna ERP account</p>
            </div>

            <form onSubmit={handleSubmit} className="login-form">
              {error && (
                <div className="error-message">
                  <AlertCircle size={16} />
                  <span>{error}</span>
                </div>
              )}

              <div className="form-group">
                <label htmlFor="identifier">Email / Username</label>
                <div className="input-wrapper">
                  <input
                    id="identifier"
                    type="text"
                    placeholder="Enter your email or username"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    disabled={loading}
                    autoComplete="username"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="input-wrapper">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="form-options">
                <label className="remember-me">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    disabled={loading}
                  />
                  <span>Remember me</span>
                </label>

                <Link to="/forgot-password" className="forgot-link">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className="btn-submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner" />
                    Authenticating...
                  </>
                ) : (
                  <>
                    Sign In <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            <div className="security-badge">
              <Lock size={18} />
              <div>
                <strong>🔒 Secure ERP Authentication</strong>
                <p>Your business data is protected with enterprise-grade access controls.</p>
              </div>
            </div>
          </div>

          <div className="account-access">
            Don't have access? <span>Contact your administrator</span>
          </div>
        </div>
      </div>
    </div>
  );
}
