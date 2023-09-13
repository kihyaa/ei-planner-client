import ModalHeader from "../components/ModalHeader";
import ModalButton from "../components/ModalButton";
import HistoryInfo from "./components/HistoryInfo";
import "../../styles/modals/HistoryModal/HistoryModal.css";

const HistoryModal = () => {
  return (
    <div className="modal modal-responsive-height modal-history-height">
      <ModalHeader title="히스토리" />
      <div className="modal-history">
        <div className="history-title">
          총&nbsp;<span>32</span>개의 히스토리
          <ModalButton variant="outLine-default" size="sm" contents="전체 삭제" />
        </div>
        <div className="history-wrapper">
          <HistoryInfo />
          <HistoryInfo />
          <HistoryInfo />
          <HistoryInfo />
        </div>
      </div>
    </div>
  );
};

export default HistoryModal;
