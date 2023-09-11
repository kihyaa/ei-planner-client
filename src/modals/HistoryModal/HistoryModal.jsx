import ModalHeader from "../components/ModalHeader";
import "../../styles/modals/HistoryModal/HistoryModal.css";

const HistoryModal = () => {
  return (
    <div className="modal modal-responsive-height modal-history-height">
      <ModalHeader title="히스토리" />
      히스토리모달입니다
    </div>
  );
};

export default HistoryModal;
