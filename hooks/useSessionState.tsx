import { create } from "zustand";

type SessionState = {
  currentUser: {};
  setUser: (currentUser: {}) => void;
};

const useSessionState = create<SessionState>((set) => ({
  currentUser: {},
  setUser: (currentUser: {}) => set({ currentUser }),
}));

export default useSessionState;
