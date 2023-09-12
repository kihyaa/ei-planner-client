import { useState } from "react";
import CloseIcon from "../components/CloseIcon";
import ModalTextInput from "../components/ModalTextInput";
import ModalButton from "../components/ModalButton";
import useDidMountEffect from "../../hooks/useDidMountEffect";
import Toggle from "../components/Toggle";
import CalenderIcon from "../../assets/modals/Calender.svg";
import "../../styles/modals/EditModal/EditModal.css";

const EditModal = () => {
  const [selected, setSelected] = useState(true);
  const [deadline, setDeadLine] = useState("비어 있음");

  useDidMountEffect(() => {}, [selected]);

  const openCalender = () => {
    // 달력 출력, setDeadLine, selected 전달
  };

  return (
    <div className="modal modal-edit-height">
      <div className="modal-edit">
        <div className="modal-edit-title">
          <div className="edit-text">일정 등록하기</div>
          <CloseIcon />
        </div>
        <div className="edit-input-wrapper">
          <div className="edit-input-newSchedule">
            <ModalTextInput placeholder="새 일정" />
          </div>
          <div className="edit-input-hr" />
          <textarea placeholder="설명" />
        </div>
        <div className="edit-deadline">
          <div className="edit-deadline-calender">
            <img src={CalenderIcon} alt="닫기" />
            마감 일시
          </div>
          <div className="edit-deadline-date">
            <div className="deadline-date">{deadline}</div>
            <div className="deadline-time">
              시간 포함
              <Toggle selected={selected} setSelected={setSelected} />
            </div>
          </div>
        </div>
        <ModalButton variant="contained" size="lg" contents="등록" />
      </div>
    </div>
  );
};

export default EditModal;
