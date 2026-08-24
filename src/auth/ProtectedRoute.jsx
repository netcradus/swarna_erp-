import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

export function ProtectedRoute({ children, requireAuth = true }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "#0A0A0B",
        color: "#E8CD7A",
        fontFamily: "Manrope, sans-serif"
      }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
          <div style={{
            width: "32px",
            height: "32px",
            border: "2px solid rgba(201,162,39,0.2)",
            borderTopColor: "#C9A227",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite"
          }} />
          <span style={{ fontSize: "14px", color: "#8E8A98" }}>Loading Svarna ERP...</span>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!requireAuth && isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
