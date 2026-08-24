import { ROLES } from "./rbac";

const MOCK_USER = {
  id: "usr_001",
  name: "Admin User",
  username: "admin",
  email: "admin@svarna.com",
  role: ROLES.SUPER_ADMIN,
  roleLabel: "Super Administrator",
  branch: "Head Office",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
};

const STORAGE_KEY = "svarna_erp_session";

export const authService = {
  async login(identifier, password, remember = false) {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (!identifier || !identifier.trim()) {
      throw new Error("Please enter your email or username.");
    }
    if (!password || !password.trim()) {
      throw new Error("Please enter your password.");
    }

    if (password.length < 4) {
      throw new Error("Password must be at least 4 characters.");
    }

    // Prepare session data
    const session = {
      token: "mock_jwt_token_" + Date.now(),
      user: {
        ...MOCK_USER,
        email: identifier.includes("@") ? identifier : `${identifier}@svarna.com`,
        username: identifier.split("@")[0],
      },
      expiresAt: Date.now() + (remember ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000),
    };

    if (remember) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    } else {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    }

    return session;
  },

  getCurrentSession() {
    try {
      const local = localStorage.getItem(STORAGE_KEY);
      const session = local ? JSON.parse(local) : JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "null");
      if (!session) return null;
      if (session.expiresAt && Date.now() > session.expiresAt) {
        this.logout();
        return null;
      }
      return session;
    } catch {
      return null;
    }
  },

  logout() {
    localStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(STORAGE_KEY);
  },

  async requestPasswordReset(email) {
    await new Promise((resolve) => setTimeout(resolve, 800));
    if (!email || !email.includes("@")) {
      throw new Error("Please enter a valid email address.");
    }
    return { success: true, message: `Password reset instructions sent to ${email}` };
  },
};
