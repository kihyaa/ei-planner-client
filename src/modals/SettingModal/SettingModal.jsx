import ModalHeader from "../components/ModalHeader";
import "../../styles/modals/SettingModal/SettingModal.css";

const SettingModal = () => {
  return (
    <div className="modal modal-responsive-height modal-setting-height">
      <ModalHeader title="설정" />
      설정모달입니다
    </div>
  );
};

export default SettingModal;
