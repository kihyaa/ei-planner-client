import ModalHeader from "../components/ModalHeader";
import ModalTextInput from "../components/ModalTextInput";
import ModalWelcomeNotice from "../components/ModalWelcomeNotice";
import ModalButton from "../components/ModalButton";
import ModalSupportLink from "../components/ModalSupportLink";
import "../../styles/modals/SignUpModal/SignUpModal.css";

const SignUpModal = () => {
  return (
    <div className="modal modal-responsive-height modal-signup-height">
      <ModalHeader title="사용자 회원가입" />
      <div className="modal-contents">
        <ModalWelcomeNotice />
        <div className="signup-input-wrapper">
          <ModalTextInput placeholder="이메일" />
          <div className="signup-input-hr" />
          <ModalTextInput placeholder="닉네임" />
        </div>
        <div className="signup-input-wrapper-last">
          <ModalTextInput placeholder="비밀번호" />
          <div className="signup-input-hr" />
          <ModalTextInput placeholder="비밀번호 확인" />
        </div>
        <ModalButton contents="가입하기" />
        <ModalSupportLink infoMsg="계정이 있나요?" linkMsg="로그인하기" onClick={() => {}} />
      </div>
    </div>
  );
};

export default SignUpModal;
