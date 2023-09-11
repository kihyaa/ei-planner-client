import { create } from "zustand";

const modalStore = create((set) => ({
  modal: "",

  setModal: (modal) => {
    set((_) => ({ modal }));
  },

  removeModal: () => {
    set((_) => ({ modal: "" }));
  },
}));

export default modalStore;
