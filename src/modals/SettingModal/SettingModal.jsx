import { useEffect, useState } from "react";
import axios from "axios";
import userStore from "../../stores/userStore";
import ModalHeader from "../components/ModalHeader";
import Toggle from "../components/Toggle";
import useDidMountEffect from "../../hooks/useDidMountEffect";
import Avatar from "../../components/Avatar";
import ModalButton from "../components/ModalButton";
import UserInfoSetting from "./components/UserInfoSetting";
import GithubIcon from "../../assets/github.svg";
import DropDown from "./components/DropDown";
import "../../styles/modals/SettingModal/SettingModal.css";

const SettingModal = () => {
  const { isAuthenticated, profileImageUrl, nickname, email, setProfileImageUrl, setIsViewDateTime } = userStore();

  // useState 기본 값으로 설정 정보를 세팅해야함(원래 사용자 설정 상 토글이 켜져 있었는지)
  const [toggleSelected, setToggleSelected] = useState(false);
  const [urgentDate, setUrgentDate] = useState(0);

  useEffect(() => {
    const getSettingInfo = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_PROXY}settings`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setToggleSelected(res.data.datetime_display);
        setUrgentDate(res.data.auto_urgent);
      } catch (error) {
        window.location.reload();
      }
    };
    getSettingInfo();
  }, []);

  // useEffect와 사용 방법이 같으나, 첫 렌더링 시에 실행되지 않고, 상태가 변경될 때만 실행됨
  useDidMountEffect(() => {
    const fetchToggle = async () => {
      try {
        await axios.put(
          `${process.env.REACT_APP_PROXY}settings/datetime-display`,
          {
            is_display_date_time: toggleSelected,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        setIsViewDateTime(toggleSelected);
      } catch (error) {
        console.log(error);
      }
    };

    fetchToggle();
  }, [toggleSelected]);

  useDidMountEffect(() => {
    const fetchDropdown = async () => {
      try {
        await axios.put(
          `${process.env.REACT_APP_PROXY}settings/auto-urgent`,
          {
            auto_urgent_day: urgentDate,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
      } catch (error) {
        console.log(error);
      }
    };

    fetchDropdown();
  }, [urgentDate]);

  const deleteUser = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_PROXY}auth/delete`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const removeProfileImg = async () => {
    try {
      const res = await axios.delete(`${process.env.REACT_APP_PROXY}member/profile-image`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setProfileImageUrl(res.data.data.profile_image_url);
    } catch (error) {
      console.log(error);
    }
  };

  const submitProfileImg = async (e) => {
    if (
      e.target.files[0].type !== "image/png" &&
      e.target.files[0].type !== "image/jpeg" &&
      e.target.files[0].type !== "image/jpg"
    ) {
      alert(`해당 파일은 이미지 파일이 아닙니다.\n이미지(JPG,JPEG,PNG)를 업로드 해주세요.`);
      return;
    }
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_PROXY}member/profile-image`,
        {
          file_name: "img",
          file_type: e.target.files[0].type,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      await axios.put(res.data.presiged_url, e.target.files[0], {
        headers: {
          "Content-Type": e.target.files[0].type, // 파일의 MIME 타입 설정
        },
      });
      setProfileImageUrl(res.data.changed_url);
    } catch (e) {
      alert(e);
    }
  };

  return (
    <div className="modal modal-responsive-height modal-setting-height">
      <ModalHeader title="설정" />
      {isAuthenticated && (
        <div className="modal-contents">
          <div className="setting-info-container">
            <div className="setting-profile-container">
              <Avatar username={nickname} dimensions="5.563rem" imgSrc={profileImageUrl} />
              <div className="modal-profile-btn-wrapper1">
                <ModalButton size="sm" contents="프로필 업로드" useInput onChange={submitProfileImg} />
              </div>
              <div className="modal-profile-btn-wrapper2">
                <ModalButton size="sm" variant="outLine-default" contents="이미지 제거" onClick={removeProfileImg} />
              </div>
            </div>
            <UserInfoSetting nickname={nickname} email={email} />
          </div>
          <div className="setting-list">
            <div className="setting-list-info">
              <h3>날짜 및 시간 표시</h3>
              <p>일정 블록의 날짜 및 시간 표시 여부를 설정합니다.</p>
            </div>
            <div className="setting-list-action">
              {" "}
              <Toggle selected={toggleSelected} setSelected={setToggleSelected} />
            </div>
          </div>
          <div className="setting-list">
            <div className="setting-list-info">
              <h3>자동으로 긴급 전환</h3>
              <p>설정 일자가 지나면 자동으로 일정 블록을 긴급으로 전환합니다.</p>
            </div>
            <div className="setting-list-action">
              <DropDown value={urgentDate} setValue={setUrgentDate} />
            </div>
          </div>
          <div className="setting-list" style={{ border: "none" }}>
            <div className="setting-list-info">
              <h3>회원 탈퇴</h3>
              <p>탈퇴 시 작성하신 일정이 모두 삭제되며 복구되지 않습니다.</p>
            </div>
            <div className="setting-list-action">
              <ModalButton size="sm" variant="warning" contents="탈퇴 하기" onClick={deleteUser} />
            </div>
          </div>

          <div className="setting-copy-container">
            <p>Copyright © 2023 kihyaa All right reserved.</p>
            <a href="https://github.com/kihyaa/" target="_blank" rel="noopener noreferrer">
              <img src={GithubIcon} alt="깃허브" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingModal;
