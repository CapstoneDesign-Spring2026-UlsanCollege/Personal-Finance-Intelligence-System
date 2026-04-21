import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { loginUser, registerUser } from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    const stored = localStorage.getItem("budgetbrain_auth");
    return stored ? JSON.parse(stored) : null;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (auth) {
      localStorage.setItem("budgetbrain_auth", JSON.stringify(auth));
    } else {
      localStorage.removeItem("budgetbrain_auth");
    }
  }, [auth]);

  async function login(values) {
    setLoading(true);
    try {
      const data = await loginUser(values);
      setAuth(data);
      return { ok: true };
    } catch (error) {
      return { ok: false, error: error.response?.data?.message || "Unable to sign in." };
    } finally {
      setLoading(false);
    }
  }

  async function signup(values) {
    setLoading(true);
    try {
      const data = await registerUser(values);
      setAuth(data);
      return { ok: true };
    } catch (error) {
      return { ok: false, error: error.response?.data?.message || "Unable to create account." };
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    setAuth(null);
  }

  const value = useMemo(() => ({
    auth,
    user: auth?.user || null,
    token: auth?.token || null,
    isAuthenticated: Boolean(auth?.token),
    loading,
    login,
    signup,
    logout
  }), [auth, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
