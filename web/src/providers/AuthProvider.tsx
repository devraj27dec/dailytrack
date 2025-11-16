/* eslint-disable @typescript-eslint/no-explicit-any */
import { Login } from "@/api/http";
import { AuthContext } from "@/hooks/useAuth";
import type { LoginCredentials } from "@/lib/type";
import {useEffect, useState } from "react";


export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (userData: LoginCredentials) => {
    const response = await Login(userData);
    console.log("response" , response)

    if (response) {
      // const loggedUser = response.data; 
      // console.log("Logged in user:", loggedUser); 
      
      setUser(response);
      setIsAuthenticated(true);

      localStorage.setItem("access_token", response.access_token);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("access_token");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

