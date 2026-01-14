import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function signIn(email, senha) {
    try {
      const response = await api.post("/Usuario/login", {
        email,
        senha,
      });

      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
    } catch {
      alert("Email ou senha inválidos");
    }
  }

  function signOut() {
    setUser(null);
    localStorage.removeItem("user");
  }

  useEffect(() => {
    const storagedUser = localStorage.getItem("user");

    if (storagedUser) {
      setUser(JSON.parse(storagedUser));
    }

    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
