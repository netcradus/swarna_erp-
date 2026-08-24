import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Gem, ArrowLeft, Mail, CheckCircle2, AlertCircle } from "lucide-react";
import { authService } from "../auth/authService";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);
      await authService.requestPasswordReset(email);
      setSuccess(true);
    } catch (err) {
      setError(err.message || "Failed to process request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-page">
      <style>{`
        .forgot-page {
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

        .forgot-page__glow {
          position: absolute;
          width: 700px;
          height: 700px;
          background: radial-gradient(circle at 50% 50%, rgba(201,162,39,0.1), transparent 70%);
          top: -200px;
          right: -200px;
          pointer-events: none;
        }

        .forgot-card {
          width: 100%;
          max-width: 480px;
          margin: 24px;
          padding: 44px 40px;
          background: rgba(18, 17, 23, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          box-shadow: 0 30px 80px -20px rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(20px);
          position: relative;
        }

        .forgot-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 28px;
        }

        .forgot-mark {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          display: grid;
          place-items: center;
          background: linear-gradient(135deg, rgba(201,162,39,0.3), rgba(201,162,39,0.05));
          border: 1px solid rgba(201,162,39,0.4);
          color: #E8CD7A;
        }

        .forgot-brand-text {
          font-family: 'Fraunces', serif;
          font-size: 20px;
          font-weight: 500;
        }

        .forgot-brand-accent {
          color: #E8CD7A;
        }

        .forgot-title {
          font-family: 'Fraunces', serif;
          font-size: 26px;
          font-weight: 500;
          margin: 0 0 8px 0;
          color: #F3EFE6;
        }

        .forgot-sub {
          font-size: 14px;
          color: #9C978C;
          line-height: 1.5;
          margin: 0 0 28px 0;
        }

        .forgot-form {
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
          padding: 0 16px 0 44px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          color: #F3EFE6;
          font-size: 14px;
          font-family: 'Manrope', sans-serif;
          outline: none;
          transition: border-color 0.25s ease;
        }

        .input-wrapper input:focus {
          border-color: rgba(201,162,39,0.6);
          box-shadow: 0 0 0 3px rgba(201,162,39,0.15);
        }

        .input-icon {
          position: absolute;
          left: 14px;
          color: #9C978C;
          pointer-events: none;
        }

        .btn-submit {
          width: 100%;
          height: 48px;
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
          gap: 8px;
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

        .alert-error {
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

        .alert-success {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 20px;
          border-radius: 14px;
          background: rgba(16, 185, 129, 0.08);
          border: 1px solid rgba(16, 185, 129, 0.25);
          color: #34d399;
          font-size: 14px;
          text-align: center;
        }

        .alert-success svg {
          margin: 0 auto;
          color: #34d399;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          margin-top: 24px;
          font-size: 14px;
          color: #9C978C;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .back-link:hover {
          color: #E8CD7A;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>

      <div className="forgot-page__glow" />

      <div className="forgot-card">
        <div className="forgot-brand">
          <span className="forgot-mark">
            <Gem size={20} strokeWidth={1.6} />
          </span>
          <span className="forgot-brand-text">
            Svarna<span className="forgot-brand-accent">ERP</span>
          </span>
        </div>

        <h1 className="forgot-title">Reset your password</h1>
        <p className="forgot-sub">
          Enter your registered email address and we'll help you recover access.
        </p>

        {success ? (
          <div className="alert-success">
            <CheckCircle2 size={36} />
            <div>
              <strong>Reset link sent!</strong>
              <p style={{ margin: "6px 0 0 0", color: "#9C978C", fontSize: "13px" }}>
                We have sent password recovery instructions to <b style={{ color: "#F3EFE6" }}>{email}</b>.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="forgot-form">
            {error && (
              <div className="alert-error">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <div className="input-wrapper">
                <Mail size={18} className="input-icon" />
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your registered email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  autoComplete="email"
                />
              </div>
            </div>

            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner" />
                  Sending link...
                </>
              ) : (
                "Send Reset Link"
              )}
            </button>
          </form>
        )}

        <Link to="/login" className="back-link">
          <ArrowLeft size={16} /> Back to Login
        </Link>
      </div>
    </div>
  );
}
