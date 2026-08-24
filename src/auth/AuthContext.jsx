import React, { createContext, useContext, useState, useEffect } from "react";
import { authService } from "./authService";
import { hasPermission as checkPermission } from "./rbac";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedBranch, setSelectedBranch] = useState("All Branches");

  useEffect(() => {
    const session = authService.getCurrentSession();
    if (session && session.user) {
      setUser(session.user);
    }
    setLoading(false);
  }, []);

  const login = async (identifier, password, remember) => {
    const session = await authService.login(identifier, password, remember);
    setUser(session.user);
    return session.user;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const can = (permission) => {
    if (!user) return false;
    return checkPermission(user.role, permission);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    logout,
    selectedBranch,
    setSelectedBranch,
    can,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
