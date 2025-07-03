// src/auth/AuthContext.tsx
import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

interface AuthContextType {
  tokens: TokenPair | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  user: any;
}

interface TokenPair {
  access: string;
  refresh: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [tokens, setTokens] = useState<TokenPair | null>(() => {
    const stored = localStorage.getItem("tokens");
    return stored ? JSON.parse(stored) : null;
  });

  const login = async (email: string, password: string) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      setTokens(data);
      localStorage.setItem("tokens", JSON.stringify(data));
    } else {
      throw new Error("Login failed");
    }
  };

  const logout = () => {
    setTokens(null);
    localStorage.removeItem("tokens");
  };

  const user = tokens
    ? JSON.parse(atob(tokens.access.split(".")[1]))
    : null;

  const contextData: AuthContextType = {
    tokens,
    login,
    logout,
    user,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
