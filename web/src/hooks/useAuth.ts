
import type { LoginCredentials } from "@/lib/type";
import { createContext, useContext } from "react";

interface AuthContextType {
  user: any;
  // isAuthenticated: boolean;
  username:string;
  login: (data: LoginCredentials) => Promise<void>;
  logout: () => void;
  token: string | null;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be inside AuthProvider");
  return context;
};
