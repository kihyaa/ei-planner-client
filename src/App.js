import { useState, useEffect } from "react";
import axios from "axios";
import modalStore from "./stores/modalStore";
import userStore from "./stores/userStore";
import ModalContainer from "./modals/ModalContainer";
import Landing from "./main/Landing";
import Header from "./components/Header";
import egg from "./utils/egg";
import TestUserPage from "./main/TestUserPage";
import SignInModal from "./modals/SignInModal/SignInModal";
import Main from "./main/Main";
import "./App.css";

const App = () => {
  const { isAuthenticated, setUserData, clearUserData } = userStore();
  const { setModal } = modalStore();
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
        console.log(res);
        setIsLoading(false);
      } catch (error) {
        clearUserData();
        setIsLoading(false);
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
    }

    if (urlSearchParams.get("modal") === "signin") {
      setModal(<SignInModal />);
      const url = window.location.pathname;
      window.history.replaceState({}, document.title, url);
    }
    egg();
  }, [localStorage]);

  return (
    <div className="App">
      <ModalContainer />
      <Header isLoading={isLoading} />
      {isLoading ? "" : isAuthenticated ? <Main/> : <Landing />}
    </div>
  );
};

export default App;
