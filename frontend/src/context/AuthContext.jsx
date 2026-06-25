import { createContext, useContext, useState, useCallback } from "react";
import jwtDecode from "jwt-decode";
import * as authApi from "../api/auth";
import { TOKEN_KEY } from "../api/client";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

function readUser(token) {
  try {
    const decoded = jwtDecode(token);
    // token expired?
    if (decoded?.exp && decoded.exp * 1000 < Date.now()) return null;
    return decoded?.userDetails ?? null;
  } catch {
    return null;
  }
}

function initialToken() {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token && readUser(token)) return token;
  localStorage.removeItem(TOKEN_KEY);
  return null;
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(initialToken);
  const [user, setUser] = useState(() => (token ? readUser(token) : null));

  const setSession = useCallback((newToken) => {
    if (newToken) {
      localStorage.setItem(TOKEN_KEY, newToken);
      setToken(newToken);
      setUser(readUser(newToken));
    } else {
      localStorage.removeItem(TOKEN_KEY);
      setToken(null);
      setUser(null);
    }
  }, []);

  const login = useCallback(
    async (email, password) => {
      const data = await authApi.login(email, password);
      if (!data?.Access_Token) throw new Error("Login failed. Please try again.");
      setSession(data.Access_Token);
      return data;
    },
    [setSession]
  );

  const register = useCallback(
    async (email, password) => {
      await authApi.register(email, password);
      // The backend doesn't return a token on register, so log in to obtain one.
      return login(email, password);
    },
    [login]
  );

  const logout = useCallback(() => setSession(null), [setSession]);

  return (
    <AuthContext.Provider
      value={{ token, user, isAuthenticated: !!token, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
