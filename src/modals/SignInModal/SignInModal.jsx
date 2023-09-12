import modalStore from "../../stores/modalStore";
import ModalHeader from "../components/ModalHeader";
import ModalTextInput from "../components/ModalTextInput";
import ModalWelcomeNotice from "../components/ModalWelcomeNotice";
import ModalButton from "../components/ModalButton";
import ModalSupportLink from "../components/ModalSupportLink";
import SignUpModal from "../SignUpModal/SignUpModal";
import OauthLoginButton from "./components/OauthLoginButton";
import GithubIcon from "../../assets/oauth/Github.svg";
import GoogleIcon from "../../assets/oauth/Google.svg";
import "../../styles/modals/SignInModal/SignInModal.css";

const SignInModal = () => {
  const { setModal } = modalStore();
  return (
    <div className="modal modal-responsive-height modal-signin-height">
      <ModalHeader title="사용자 로그인" />
      <div className="modal-contents">
        <ModalWelcomeNotice />
        <div className="signin-input-wrapper">
          <ModalTextInput placeholder="이메일" />
          <div className="signin-input-hr" />
          <ModalTextInput placeholder="닉네임" />
        </div>
        <ModalButton contents="로그인" />
        {true && <p className="signin-warning">아이디 또는 비밀번호가 일치하지 않습니다</p>}
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
        <OauthLoginButton logoSrc={<img src={GithubIcon} alt="닫기" />} contents="Sign in with Github" />
        <OauthLoginButton logoSrc={<img src={GoogleIcon} alt="닫기" />} contents="Sign in with Google" />
      </div>
    </div>
  );
};

export default SignInModal;
