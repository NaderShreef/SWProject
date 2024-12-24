"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

// Create an axios instance with base URL and default headers
const api = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

interface User {
  id: string;
  email: string;
  role: "student" | "instructor" | "admin";
  firstName: string;
  lastName: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (token: string, user: User) => void;
  logout: () => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  clearError: () => void;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: "student" | "instructor";
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Add request interceptor to include token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const clearError = () => setError(null);

  const validateToken = async (token: string) => {
    try {
      const response = await api.get("/auth/validate");
      setUser(response.data);
    } catch (error) {
      console.error("Token validation failed:", error);
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      validateToken(token);
    } else {
      setLoading(false);
    }
  }, []);

  const login = (token: string, userData: User) => {
    localStorage.setItem("token", token);
    setUser(userData);
    router.push("/dashboard");
  };

  const logout = async () => {
    try {
      clearError();
      localStorage.removeItem("token");
      setUser(null);
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
      setError("Logout failed. Please try again.");
    }
  };

  const register = async (userData: RegisterData) => {
    try {
      clearError();
      const response = await api.post("/auth/register", userData);
      const { token, user: newUser } = response.data;
      localStorage.setItem("token", token);
      setUser(newUser);
      router.push("/dashboard");
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        "Registration failed. Please try again.";
      setError(message);
      throw new Error(message);
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    register,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
