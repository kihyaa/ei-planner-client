import ModalHeader from "../components/ModalHeader";
import "../../styles/modals/SignUpModal/SignUpModal.css";

const SignUpModal = () => {
  return (
    <div className="modal modal-responsive-height modal-signup-height">
      <ModalHeader title="사용자 회원가입" />
      회원가입 모달입니다.
    </div>
  );
};

export default SignUpModal;
