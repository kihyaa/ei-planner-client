import { useState } from "react";
import axios from "axios";
import ModalHeader from "../components/ModalHeader";
import ModalTextInput from "../components/ModalTextInput";
import ModalWelcomeNotice from "../components/ModalWelcomeNotice";
import ModalButton from "../components/ModalButton";
import ModalSupportLink from "../components/ModalSupportLink";
import modalStore from "../../stores/modalStore";
import userStore from "../../stores/userStore";
import "../../styles/modals/SignUpModal/SignUpModal.css";

const SignUpModal = () => {
  const { clearUserData } = userStore();
  const { setModal } = modalStore();

  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [emailErr, setEmailErr] = useState("");
  const [nicknameErr, setNicknameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [confirmPasswordErr, setConfirmPasswordErr] = useState("");

  const removeErr = () => {
    setEmailErr("");
    setNicknameErr("");
    setPasswordErr("");
    setConfirmPasswordErr("");
  };

  const validateEmail = (email) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^.{8,16}$/;
    return passwordRegex.test(password);
  };

  const handleRegistration = async () => {
    setIsLoading(true);
    if (!validateEmail(email)) {
      setEmailErr("이메일 형식이 아닙니다");
      setIsLoading(false);
      return;
    }

    if (!validatePassword(password)) {
      setPasswordErr("비밀번호는 8~16자리 사이로 입력해 주세요");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordErr("입력한 비밀번호가 서로 일치하지 않습니다");
      setIsLoading(false);
      return;
    }

    try {
      const res = await axios.post(`${process.env.REACT_APP_PROXY}auth/register`, {
        email,
        nickname,
        password,
      });

      localStorage.setItem("token", res.data.token);
      window.location.reload();
    } catch (error) {
      clearUserData();
      const msg = error.response.data.message;
      if (msg === "EXIST_EMAIL") {
        setEmailErr("중복된 이메일입니다");
      } else if (msg === "EXIST_USERNAME") {
        setNicknameErr("중복된 닉네임입니다");
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="modal modal-responsive-height modal-signup-height">
      <ModalHeader title="사용자 회원가입" />
      <div className="modal-contents">
        <ModalWelcomeNotice />
        <div className="signup-input-wrapper">
          <ModalTextInput
            placeholder="이메일"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              removeErr();
            }}
            errMsg={emailErr}
          />
          <div className="signup-input-hr" />
          <ModalTextInput
            placeholder="닉네임"
            value={nickname}
            onChange={(e) => {
              setNickname(e.target.value);
              removeErr();
            }}
            errMsg={nicknameErr}
          />
        </div>
        <div className="signup-input-wrapper-last">
          <ModalTextInput
            placeholder="비밀번호"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              removeErr();
            }}
            errMsg={passwordErr}
          />
          <div className="signup-input-hr" />
          <ModalTextInput
            placeholder="비밀번호 확인"
            type="password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              removeErr();
            }}
            errMsg={confirmPasswordErr}
          />
        </div>
        <ModalButton contents="가입하기" disabled={isLoading} onClick={() => handleRegistration()} />
        <ModalSupportLink infoMsg="계정이 있나요?" linkMsg="로그인하기" onClick={() => setModal()} />
      </div>
    </div>
  );
};

export default SignUpModal;
