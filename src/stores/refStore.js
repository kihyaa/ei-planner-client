import { create } from "zustand";

const refStore = create((set) => ({
  ref: null,

  setRef: (ref) => {
    set((_) => ({ ref }));
  }

}));

export default refStore;
