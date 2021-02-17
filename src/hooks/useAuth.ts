import { useState, useEffect } from "react";
import api from "./../services/api";
import history from "./../routes/history";
import tokenService from "../services/token.service";
import { SignInCredentials } from "./AuthContext";

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = tokenService.getToken();
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
      setAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleLogin = async ({ username, password }: SignInCredentials) => {
    const { headers } = await api.post("/login", { username, password });
    const authorization = headers["authorization"] as string;
    const token = authorization.substring(7);
    tokenService.setToken(token);
    api.defaults.headers.Authorization = `Bearer ${token}`;
    setAuthenticated(true);
    history.push("/");
  };

  const handleLogout = () => {
    setAuthenticated(false);
    tokenService.removeToken();
    api.defaults.headers.Authorization = undefined;
    history.push("/login");
  };

  return { authenticated, loading, handleLogin, handleLogout };
}
