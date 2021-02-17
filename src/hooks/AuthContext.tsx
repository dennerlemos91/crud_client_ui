import React, { createContext } from "react";

import useAuth from './useAuth';
export interface SignInCredentials {
  username: string,
  password: string
}

interface AuthContextState {
  authenticated: boolean;
  handleLogin(credentials: SignInCredentials): Promise<void>
  handleLogout(): void,
  loading: boolean,
  possuiPermissao(permissao: string): boolean
}
const AuthContext = createContext<AuthContextState>({} as AuthContextState);

const AuthProvider = ({ children }: any) => {
  const {
    authenticated, loading, handleLogin, handleLogout, possuiPermissao
  } = useAuth();

  return (
    <AuthContext.Provider value={{ loading, authenticated, handleLogin, handleLogout, possuiPermissao }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }