import React, { createContext, useCallback } from "react";

import api from '../services/api';
import tokenService from '../services/token.service';
interface SignInCredentials {
  username: string,
  password: string
}

interface AuthContextState {
  isAuthenticated: boolean;
  signIn(credentials: SignInCredentials): Promise<void>
}
export const AuthContext = createContext<AuthContextState>({} as AuthContextState);

export const AuthProvider: React.FC = ({ children }) => {
  const signIn = useCallback(async ({ username, password }) => {
    const { headers } = await api.post('/login', { username, password })
    const authorization = headers['authorization'] as string;
    const token = authorization.substring(7)
    tokenService.setToken(token)
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthenticated: false, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}

