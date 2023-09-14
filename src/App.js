import { useState, useEffect } from "react";
import axios from "axios";
import modalStore from "./stores/modalStore";
import userStore from "./stores/userStore";
import ModalContainer from "./modals/ModalContainer";
import Landing from "./main/Landing";
import Header from "./components/Header";
import "./App.css";

const App = () => {
  const { setModal } = modalStore();
  const { isAuthenticated, profileImageUrl, nickname, email, setUserData, clearUserData } = userStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_PROXY}member`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUserData(res);
      } catch (error) {
        clearUserData();
      }
    };
    // 쿼리스트링의 토큰 존재 여부 검사
    setIsLoading(true);
    const urlSearchParams = new URLSearchParams(window.location.search);
    const token = urlSearchParams.get("token");

    if (token) {
      localStorage.setItem("token", token);
      urlSearchParams.delete("token");
      window.location.search = urlSearchParams.toString();
    } else {
      getUserData();
      setIsLoading(false);
    }
  }, [localStorage]);

  return (
    <div className="App">
      <ModalContainer />
      <Header />
      {isLoading ? "" : isAuthenticated ? "계획창" : <Landing />}
    </div>
  );
};

export default App;
