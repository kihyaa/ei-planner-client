import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import EditModal from "../EditModal/EditModal";
import modalStore from "../../stores/modalStore";
import CloseIcon from "../components/CloseIcon";
import ModalButton from "../components/ModalButton";
import { useItemContext } from "../../main/context/ItemContext";
import CalenderIcon from "../../assets/modals/Calender.svg";
import BufferIcon from "../../assets/modals/Buffer.svg";
import "../../styles/modals/DetailModal/DetailModal.css";

const DetailModal = ({ id }) => {
  const { removeModal, setModal } = modalStore();
  const [detailInfo, setDetailInfo] = useState();
  const { items, setItems } = useItemContext();

  useEffect(() => {
    getDetail();
  }, []);

  const getDetail = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_PROXY}tasks/${id} `, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setDetailInfo(res.data);
    } catch (error) {
      alert("실패했습니다. 다시 시도해 주세요.");
      console.error(error.message);
    }
  };

  const handleCorrection = () => {
    removeModal();
    setModal(<EditModal schedule="edit" id={detailInfo.id} />);
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`${process.env.REACT_APP_PROXY}tasks/${id} `, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const deleteEiType = detailInfo.ei_type.toLowerCase();
      const updatedItems = {
        ...items,
        [deleteEiType]: items[deleteEiType].filter(item => item.id !== id),
      };
      setItems(updatedItems);

      removeModal();
    } catch (error) {
      alert("실패했습니다. 다시 시도해 주세요.");
      console.error(error.message);
    }
  };

  return (
    <div className="modal modal-detail-height">
      <div className="modal-detail">
        <div className="modal-detail-title">
          <div className={`detail-status ${detailInfo?.ei_type}`} />
          <div className="detail-text">{detailInfo?.title}</div>
          <CloseIcon />
        </div>
        <div className="detail-information">
          <div className="detail-information-item">
            <img src={CalenderIcon} alt="닫기" />
            <div className="item-text">마감 일시</div>
            <div className="detail-deadline-date">
              {detailInfo?.end_at == null
                ? "없음"
                : !detailInfo.is_time_include
                ? `${moment(detailInfo.end_at).format("YYYY. MM. DD ")}`
                : `${moment(detailInfo.end_at).format("YYYY. MM. DD ")}${
                    new Date(detailInfo.end_at).getHours() >= 12 ? "오후" : "오전"
                  }${moment(detailInfo.end_at).format(" hh:mm")}`}
            </div>
          </div>
          <div className="detail-information-item">
            <img src={BufferIcon} alt="닫기" />
            <div className="item-text">상태</div>
            <div className="detail-status-text">{detailInfo?.is_completed ? "진행 완료" : "진행 중"}</div>
          </div>
        </div>
        <div className="detail-content-wrapper">
          <div className="detail-content">{detailInfo?.description}</div>
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
