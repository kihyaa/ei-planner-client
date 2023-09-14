import { useState } from "react";
import ModalTextInput from "../../components/ModalTextInput";
import "../../../styles/modals/SettingModal/components/UserInfoSetting.css";
import axios from "axios";
import ModalButton from "../../components/ModalButton";
import userStore from "../../../stores/userStore";

const UserInfoSetting = ({ nickname, email }) => {
  const { setNickname } = userStore();
  const [isUsernameEdit, setIsUsernameEdit] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [newNickname, setNewNickname] = useState(nickname);

  const putNickname = async () => {
    if (nickname === newNickname) {
      setIsUsernameEdit(false);
      return;
    }
    if (newNickname.trim() === "") {
      setErrMsg("닉네임을 입력해 주세요");
      return;
    }
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_PROXY}member/nickname?nickname=${encodeURIComponent(newNickname)}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      setNickname(res.data.data.nickname);
      setIsUsernameEdit(false);
    } catch (error) {
      if (error.response.data.message === "EXIST_USERNAME") {
        setErrMsg("중복된 닉네임입니다");
      } else {
        console.log(error);
      }
    }
  };

  return (
    <div className="user-info-setting-container">
      {isUsernameEdit ? (
        <ModalTextInput
          size="sm"
          placeholder="닉네임"
          value={newNickname}
          errMsg={errMsg}
          onChange={(e) => {
            setNewNickname(e.target.value);
            setErrMsg("");
          }}
        />
      ) : (
        <h2 className="user-info-setting-username">{nickname}</h2>
      )}
      <p className="user-info-setting-email">{email}</p>
      <div className="user-info-setting-opt">
        {isUsernameEdit ? (
          <div className="user-info-setting-save-btn">
            <ModalButton size="sm" contents="저장" onClick={putNickname} />
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
