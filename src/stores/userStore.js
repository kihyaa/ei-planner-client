import { create } from "zustand";

const userStore = create((set) => ({
  isAuthenticated: false,
  profileImageUrl: "",
  nickname: "",
  email: "",

  setUserData: (res) => {
    set((_) => ({
      isAuthenticated: true,
      profileImageUrl: res.data.profile_image_url,
      nickname: res.data.nickname,
      email: res.data.email,
    }));
  },
  clearUserData: () => {
    set((_) => ({
      isAuthenticated: false,
      profileImageUrl: "",
      nickname: "",
      email: "",
    }));
  },
}));

export default userStore;
