const KEY = "token";
const tokenService = {
  hasToken(): boolean {
    return this.getToken() !== null;
  },

  setToken(token: string): void {
    window.localStorage.setItem(KEY, token);
  },

  getToken(): string | null {
    return window.localStorage.getItem(KEY);
  },

  removeToken(): void {
    window.localStorage.removeItem(KEY);
  },
};

export default tokenService;
