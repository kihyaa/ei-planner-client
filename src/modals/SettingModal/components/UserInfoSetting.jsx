import { useState } from "react";
import ModalTextInput from "../../components/ModalTextInput";
import "../../../styles/modals/SettingModal/components/UserInfoSetting.css";
import ModalButton from "../../components/ModalButton";

const UserInfoSetting = () => {
  const [isUsernameEdit, setIsUsernameEdit] = useState(false);
  return (
    <div className="user-info-setting-container">
      {isUsernameEdit ? (
        <ModalTextInput size="sm" placeholder="닉네임" />
      ) : (
        <h2 className="user-info-setting-username">Jinyeong Seol</h2>
      )}
      <p className="user-info-setting-email">wlsdud5654@gmail.com</p>
      <div className="user-info-setting-opt">
        {isUsernameEdit ? (
          <div className="user-info-setting-save-btn">
            <ModalButton size="sm" contents="저장" />
          </div>
        ) : (
          <button type="button" className="user-info-setting-edit-btn" onClick={() => setIsUsernameEdit(true)}>
            수정하기
          </button>
        )}
      </div>
    </div>
  );
};

export default UserInfoSetting;
