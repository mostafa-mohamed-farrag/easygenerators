import { create } from "zustand";
import { persist } from "zustand/middleware";

export type AuthState = {
  accessToken: string | null;

  setToken: (token: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,

      setToken: (token: string) => set({ accessToken: token }),
      logout: () => set({ accessToken: null }),
    }),
    {
      name: "auth",
      partialize: (state) => ({ accessToken: state.accessToken }),
    },
  ),
);

export const selectAccessToken = (s: AuthState) => s.accessToken;
export const selectSignedIn = (s: AuthState) => Boolean(s.accessToken);
export const selectSetToken = (s: AuthState) => s.setToken;
export const selectLogout = (s: AuthState) => s.logout;
