import { Login } from "@/api/http";
import { AuthContext } from "@/hooks/useAuth";
import type { LoginCredentials } from "@/lib/type";
import {useState } from "react";


export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => sessionStorage.getItem("access_token"));
  const [username , setUsername] = useState("")
  // const isAuthenticated = !!token;

  const login = async (credentials: LoginCredentials) => {
    const response = await Login(credentials);
    
    setUser(response);
    setToken(response.details.access_token);
    setUsername(response.details.username)
    sessionStorage.setItem("access_token", response.details.access_token);
  };


  const logout = () => {
    console.log("User Logout Sucessfully")
    setUser(null);
    setToken(null);
    sessionStorage.removeItem("access_token");
  };

  return (
    <AuthContext.Provider value={{ user, username, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


