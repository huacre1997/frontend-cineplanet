import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token") || null);
  const navigate = useNavigate();

  // Simular validacion de token
  const validateToken = (token: string | null): boolean => {
    return token === "fake-jwt-token";
  };

  const login = (newToken: string) => {
    if (validateToken(newToken)) {
      localStorage.setItem("token", newToken);
      setToken(newToken);
      navigate("/protected");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };

  const isAuthenticated = () => {
    return validateToken(token);
  };

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "token" && !e.newValue) {
        logout();
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};