import { createContext, useContext } from "react";
import { useAuth } from "../hooks/useAuth";

// AuthContext 생성
const AuthContext = createContext();

// AuthProvider 컴포넌트
export const AuthProvider = ({ children }) => {
  const { isAuthenticated, checkAuth } = useAuth();

  return <AuthContext.Provider value={{ isAuthenticated, checkAuth }}>{children}</AuthContext.Provider>;
};

// useAuthContext 훅
export const useAuthContext = () => useContext(AuthContext);
