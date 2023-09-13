import { useState } from "react";
import ModalHeader from "../components/ModalHeader";
import Toggle from "../components/Toggle";
import useDidMountEffect from "../../hooks/useDidMountEffect";
import Avatar from "../../components/Avatar";
import ModalButton from "../components/ModalButton";
import UserInfoSetting from "./components/UserInfoSetting";
import GithubIcon from "../../assets/github.svg";
import "../../styles/modals/SettingModal/SettingModal.css";

const SettingModal = () => {
  // useState 기본 값으로 설정 정보를 세팅해야함(원래 사용자 설정 상 토글이 켜져 있었는지)
  const [selected, setSelected] = useState(true);

  // useEffect와 사용 방법이 같으나, 첫 렌더링 시에 실행되지 않고, 상태가 변경될 때만 실행됨
  useDidMountEffect(() => {
    // Do Something, ex) 설정 변경을 axios put
  }, [selected]);

  return (
    <div className="modal modal-responsive-height modal-setting-height">
      <ModalHeader title="설정" />
      <div className="modal-contents">
        <div className="setting-info-container">
          <div className="setting-profile-container">
            <Avatar
              username="Seol"
              dimensions="5.563rem"
              imgSrc="https://news.samsungdisplay.com/wp-content/uploads/2018/08/8.jpg"
            />
            <div className="modal-profile-btn-wrapper1">
              <ModalButton size="sm" contents="프로필 업로드" />
            </div>
            <div className="modal-profile-btn-wrapper2">
              <ModalButton size="sm" variant="outLine-default" contents="이미지 제거" />
            </div>
          </div>
          <UserInfoSetting />
        </div>
        <div className="setting-list">
          <div className="setting-list-info">
            <h3>날짜 및 시간 표시</h3>
            <p>일정 블록의 날짜 및 시간 표시 여부를 설정합니다.</p>
          </div>
          <div className="setting-list-action">
            {" "}
            <Toggle selected={selected} setSelected={setSelected} />
          </div>
        </div>
        <div className="setting-list">
          <div className="setting-list-info">
            <h3>자동으로 긴급 전환</h3>
            <p>설정 일자가 지나면 자동으로 일정 블록을 긴급으로 전환합니다.</p>
          </div>
          <div className="setting-list-action"> </div>
        </div>
        <div className="setting-list" style={{ border: "none" }}>
          <div className="setting-list-info">
            <h3>회원 탈퇴</h3>
            <p>탈퇴 시 작성하신 일정이 모두 삭제되며 복구되지 않습니다.</p>
          </div>
          <div className="setting-list-action">
            <ModalButton size="sm" variant="warning" contents="탈퇴 하기" />
          </div>
        </div>

        <div className="setting-copy-container">
          <p>Copyright © 2023 kihyaa All right reserved.</p>
          <a href="https://github.com/kihyaa/" target="_blank" rel="noopener noreferrer">
            <img src={GithubIcon} alt="깃허브" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default SettingModal;
