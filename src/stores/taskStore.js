import { create } from 'zustand';

export const useTaskStore = create((set, get) => ({
  task: null,
  setTask: (newTask) => {
    set({ task: newTask });
  },
  getTaskById: (id) => {
    const { task } = get();
    if (task) {
      for (const key in task) {
        if (Object.prototype.hasOwnProperty.call(task, key)) {
          const item = task[key].find((item) => item.id === id);
          if (item) {
            return item;
          }
        }
      }
    }
    return null;
  },
}));
