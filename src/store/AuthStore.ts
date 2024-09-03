import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface AuthState {
  status: string;
  username: string;
  password: string;
  email: string;
  setEmail: (email: string) => void;
  setStatus: (status: string) => void;
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
  reset: () => void;
}

const AuthStore = create<AuthState>()(
  immer((set) => ({
    status: "",
    username: "",
    password: "",
    email: "",
    setEmail: (email) =>
      set((state) => {
        state.email = email;
      }),
    setStatus: (status) =>
      set((state) => {
        state.status = status;
      }),
    setUsername: (username) =>
      set((state) => {
        state.username = username;
      }),
    setPassword: (password) =>
      set((state) => {
        state.password = password;
      }),
    reset: () => set({ status: "", username: "", password: "" }),
  }))
);

export default AuthStore;
