import { create } from "zustand";

export const useTaskStore = create((set, get) => ({
  task: null,
  setTask: (newTask) => {
    set({ task: newTask });
  },
}));
