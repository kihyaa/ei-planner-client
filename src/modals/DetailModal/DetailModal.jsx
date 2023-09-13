import CloseIcon from "../components/CloseIcon";
import ModalButton from "../components/ModalButton";
import CalenderIcon from "../../assets/modals/Calender.svg";
import BufferIcon from "../../assets/modals/Buffer.svg";
import "../../styles/modals/DetailModal/DetailModal.css";

const DetailModal = () => {
  const test = "important_urgent"; // 세부사항에 따라 색깔 다르게

  const handleCorrection = () => {
    // 수정 요청
  };

  const handleDelete = () => {
    // 삭제 요청
  };

  return (
    <div className="modal modal-detail-height">
      <div className="modal-detail">
        <div className="modal-detail-title">
          <div className={`detail-status ${test}`} />
          <div className="detail-text">아이플래너 프론트 개발 진행</div>
          <CloseIcon />
        </div>
        <div className="detail-information">
          <div className="detail-information-item">
            <img src={CalenderIcon} alt="닫기" />
            <div className="item-text">마감 일시</div>
            <div className="detail-deadline-date">2023년 9월 10일 오전 10시</div>
          </div>
          <div className="detail-information-item">
            <img src={BufferIcon} alt="닫기" />
            <div className="item-text">상태</div>
            <div className="detail-status-text">진행 중</div>
          </div>
        </div>
        <div className="detail-content-wrapper">
          <div className="detail-content">*후 개발 힘들다,,,,,</div>
          <div className="detail-button">
            <ModalButton variant="outLine-default" contents="수정" size="sm" onClick={handleCorrection} />
            <ModalButton variant="outLine-warning" contents="삭제" size="sm" onClick={handleDelete} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
