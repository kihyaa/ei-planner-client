import { useState, useEffect, useRef } from "react";
import axios from "axios";
import modalStore from "../../stores/modalStore";
import userStore from "../../stores/userStore";
import ModalHeader from "../components/ModalHeader";
import ModalTextInput from "../components/ModalTextInput";
import ModalWelcomeNotice from "../components/ModalWelcomeNotice";
import ModalButton from "../components/ModalButton";
import ModalSupportLink from "../components/ModalSupportLink";
import SignUpModal from "../SignUpModal/SignUpModal";
import OauthLoginButton from "../components/OauthLoginButton";
import GithubIcon from "../../assets/oauth/Github.svg";
import GoogleIcon from "../../assets/oauth/Google.svg";
import "../../styles/modals/SignInModal/SignInModal.css";

const SignInModal = () => {
  const { setModal } = modalStore();
  const { clearUserData } = userStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [err, setErr] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    if (email === "" || password === "") {
      setErr(true);
      setIsLoading(false);
      return;
    }
    try {
      const res = await axios.post(`${process.env.REACT_APP_PROXY}auth/login`, {
        email,
        password,
      });
      localStorage.setItem("token", res.data.data.token);
      window.location.reload();
    } catch (error) {
      clearUserData();
      setErr(true);
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="modal modal-responsive-height modal-signin-height">
      <ModalHeader title="사용자 로그인" />
      <div className="modal-contents">
        <ModalWelcomeNotice />
        <div className="signin-input-wrapper">
          <ModalTextInput
            placeholder="이메일"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErr(false);
            }}
            onKeyPress={handleKeyPress} // Call handleLogin on Enter key press
            focusMe
          />
          <div className="signin-input-hr" />
          <ModalTextInput
            placeholder="비밀번호"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErr(false);
            }}
            onKeyPress={handleKeyPress} // Call handleLogin on Enter key press
          />
        </div>
        <ModalButton contents="로그인" disabled={isLoading} onClick={() => handleLogin()} />
        {err && <p className="signin-warning">아이디 또는 비밀번호가 일치하지 않습니다</p>}
        <ModalSupportLink
          infoMsg="계정이 없으신가요?"
          linkMsg="가입하기"
          onClick={() => {
            setModal(<SignUpModal />);
          }}
        />
        <div className="signin-input-or-hr">
          <div />
          <p className="">또는</p>
          <div />
        </div>
        <OauthLoginButton
          logoSrc={<img src={GithubIcon} alt="닫기" />}
          contents="Sign in with Github"
          onClick={() => window.location.replace(process.env.REACT_APP_OAUTH_GITHUB)}
        />
        <OauthLoginButton
          logoSrc={<img src={GoogleIcon} alt="닫기" />}
          contents="Sign in with Google"
          onClick={() => window.location.replace(process.env.REACT_APP_OAUTH_GOOGLE)}
        />
      </div>
    </div>
  );
};

export default SignInModal;
