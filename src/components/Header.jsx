import { useState } from "react";
import headerLogoIcon from "../assets/header/headerLogo.svg";
import HeaderButton from "./HeaderButton";
import userStore from "../stores/userStore";
import modalStore from "../stores/modalStore";
import refStore from "../stores/refStore";
import SignInModal from "../modals/SignInModal/SignInModal";
import EditModal from "../modals/EditModal/EditModal";
import Avatar from "./Avatar";
import html2canvas from "html2canvas";
import saveAs from "file-saver";
import DropdownBtn from "../assets/DropdownBtn.svg";
import SettingModal from "../modals/SettingModal/SettingModal";
import HistoryModal from "../modals/HistoryModal/HistoryModal";
import "../styles/components/Header.css";

const Header = ({ isLoading }) => {
  const { isAuthenticated, profileImageUrl, nickname, email } = userStore();
  const { setModal } = modalStore();
  const { ref } = refStore();

  const [dropOn, setDropOn] = useState(false);

  const capture = async () => {
    if (!ref.current) return;

    try {
      const div = ref.current;
      const canvas = await html2canvas(div, { scale: 2 });
      canvas.toBlob((blob) => {
        if (blob !== null) {
          saveAs(blob, `${nickname}.png`);
        }
      });
    } catch (error) {
      console.error("Error converting div to image:", error);
    }
  };

  return (
    <div className="header-wrapper">
      {!isLoading && (
        <div className="header-container">
          <a href="/">
            <img src={headerLogoIcon} alt="로고" />
            <p>Ei Planner</p>
          </a>
          {isAuthenticated ? (
            <div className="header-auth-container">
              <HeaderButton contents="일정 등록" onClick={() => setModal(<EditModal schedule="registration" />)} />
              <button type="button" className="header-dropdown-btn" onClick={() => setDropOn(!dropOn)}>
                <Avatar username={nickname} dimensions="2rem" imgSrc={profileImageUrl} />
                <img src={DropdownBtn} alt="선택" className={`${dropOn ? "header-drop-down-on" : ""}`} />
              </button>
              {dropOn && (
                <div className="header-dropdown-menu">
                  <div className="header-user-info-container">
                    <Avatar username={nickname} dimensions="2.8rem" imgSrc={profileImageUrl} />
                    <div className="header-user-info-container-wrapper">
                      <p className="header-user-info-container-nickname">{nickname}</p>
                      <p className="header-user-info-container-email">{email}</p>
                    </div>
                  </div>
                  <div className="header-dropdown-list-contianer">
                    <button
                      type="button"
                      onClick={() => {
                        setModal(<SettingModal />);
                        setDropOn(false);
                      }}
                    >
                      설정
                    </button>
                    <button type="button" onClick={() => capture()}>
                      스냅샷 저장
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setModal(<HistoryModal />);
                        setDropOn(false);
                      }}
                    >
                      히스토리 보기
                    </button>
                    <button
                      type="button"
                      style={{ color: "#e74c3c" }}
                      onClick={() => {
                        localStorage.removeItem("token");
                        window.location.reload();
                      }}
                    >
                      로그아웃
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <HeaderButton contents="로그인" onClick={() => setModal(<SignInModal />)} />
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
