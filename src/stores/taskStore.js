import { create } from 'zustand';
import axios from 'axios';

export const useTaskStore = create((set, get) => ({
  task: null,
  setTask: (newTask) => {
    set({ task: newTask });
  },
  getTask: async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_PROXY}tasks`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const updatedTask = {
        pending: [],
        important_urgent: [],
        important_not_urgent: [],
        not_important_urgent: [],
        not_important_not_urgent: [],
      };

      for (const key in updatedTask) {
        if (Object.prototype.hasOwnProperty.call(res.data, key)) {
          updatedTask[key] = res.data[key].tasks;
        }
      }
      
      set({ task: updatedTask });

    } catch (error) {
      alert("실패했습니다. 다시 시도해 주세요.");
      console.error(error.message);
    }
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
