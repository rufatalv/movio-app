import { create } from "zustand";

type AuthState = {
  user: {};
  setUser: (user: {}) => void;
};

const useAuth = create<AuthState>((set) => ({
  user: {},
  setUser: (user: {}) => set({ user }),
}));

export default useAuth;
