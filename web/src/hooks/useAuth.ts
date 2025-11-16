
import type { LoginCredentials } from "@/lib/type";
import { createContext, useContext } from "react";

interface AuthContextType {
  user: any;
  isAuthenticated: boolean;
  login: (data: LoginCredentials) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be inside AuthProvider");
  return context;
};
