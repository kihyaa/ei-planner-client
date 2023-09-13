import { useEffect } from "react";
import axios from "axios";
import modalStore from "./stores/modalStore";
import userStore from "./stores/userStore";
import ModalContainer from "./modals/ModalContainer";
import SignInModal from "./modals/SignInModal/SignInModal";
import SettingModal from "./modals/SettingModal/SettingModal";
import SignUpModal from "./modals/SignUpModal/SignUpModal";
import HistoryModal from "./modals/HistoryModal/HistoryModal";
import DetailModal from "./modals/DetailModal/DetailModal";
import EditModal from "./modals/EditModal/EditModal";
import "./App.css";

const App = () => {
  const { setModal } = modalStore();
  const { isAuthenticated, profileImageUrl, nickname, email, setUserData, clearUserData } = userStore();

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
    const urlSearchParams = new URLSearchParams(window.location.search);
    const token = urlSearchParams.get("token");

    if (token) {
      localStorage.setItem("token", token);
      urlSearchParams.delete("token");
      window.location.search = urlSearchParams.toString();
    } else {
      getUserData();
    }
  }, [localStorage]);

  return (
    <div className="App">
      <ModalContainer />
      <div>
        {isAuthenticated} {profileImageUrl} {nickname} {email}
      </div>
      <button
        type="button"
        onClick={() => {
          setModal(<SignInModal />);
        }}
      >
        로그인
      </button>
      <button
        type="button"
        onClick={() => {
          setModal(<SignUpModal />);
        }}
      >
        회원가입
      </button>
      <button
        type="button"
        onClick={() => {
          setModal(<SettingModal />);
        }}
      >
        설정
      </button>
      <button
        type="button"
        onClick={() => {
          setModal(<HistoryModal />);
        }}
      >
        히스토리
      </button>
      <button
        type="button"
        onClick={() => {
          setModal(<EditModal />);
        }}
      >
        작성 폼
      </button>

      <button
        type="button"
        onClick={() => {
          setModal(<DetailModal />);
        }}
      >
        일정 상세
      </button>
      <div>sdfkasldjflksajklfdsjklfjkl</div>
    </div>
  );
};

export default App;
