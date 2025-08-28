import { useAuth } from "./AuthContext";

function Dashboard() {
  const { user, token, logout } = useAuth();

  return (
    <div>
      <h1>Welcome {user?.name}</h1>
      <button onClick={logout}>Log Out</button>
    </div>
  );
}

import { AuthProvider } from "./AuthContext";

function App() {
  return (
    <AuthProvider>
      <MyRoutes />
    </AuthProvider>
  );
}

import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const login = (userData, jwt) => {
    setUser(userData);
    setToken(jwt);
    localStorage.setItem("token", jwt);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
      }
