import { create } from "zustand";

export const zustandStore = create((set) => ({
  darkMode: false,

  toggleDark: () =>
    set((state) => ({
      darkMode: !state.darkMode,
    })),
}));