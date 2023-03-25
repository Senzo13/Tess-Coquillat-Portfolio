import React, { useState, createContext } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [auth, setAuths] = useState(null);

  function setAuth(e) {
    setAuths(e);
  }

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
