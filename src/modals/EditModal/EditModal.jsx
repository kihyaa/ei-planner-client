import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import CloseIcon from "../components/CloseIcon";
import ModalTextInput from "../components/ModalTextInput";
import ModalButton from "../components/ModalButton";
import useDidMountEffect from "../../hooks/useDidMountEffect";
import Toggle from "../components/Toggle";
import CalenderIcon from "../../assets/modals/Calender.svg";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/modals/EditModal/EditModal.css";

const EditModal = ({ schedule }) => {
  const [selected, setSelected] = useState(true);
  const [deadline, setDeadLine] = useState("비어 있음");
  // 수정일시 받아올 정보 저장
  const [editStatus, setEditStatus] = useState();

  const editForm = schedule || "registration";

  const [startDate, setStartDate] = useState();

  useEffect(() => {
    if (schedule === "registration") {
      // 등록 폼
    } else {
      // 수정 폼 getSchedule() 실행
    }
  });

  useDidMountEffect(() => {}, [selected]);

  const getSchedule = () => {
    // axios 사용해서 일정 정보 받아오기
    // setEditStatus로 정보 저장
  };

  const openCalender = () => {
    // 달력 출력, setDeadLine, selected 전달
  };

  return (
    <div className="modal modal-edit-height">
      <div className="modal-edit">
        <div className="modal-edit-title">
          <div className="edit-text">{editForm === "registration" ? "일정 등록하기" : "일정 수정하기"}</div>
          <CloseIcon />
        </div>
        <div className="edit-input-wrapper">
          <div className="edit-input-newSchedule">
            <ModalTextInput placeholder={editForm === "registration" ? "새 일정" : "받아온 정보"} />
          </div>
          <div className="edit-input-hr" />
          <textarea placeholder={editForm === "registration" ? "설명" : "받아온 정보"} />
        </div>
        <div className="edit-deadline">
          <div className="edit-deadline-calender">
            <img src={CalenderIcon} alt="닫기" />
            마감 일시
          </div>
          <div className="edit-deadline-date">
            <DatePicker
              className="deadline-date"
              locale={ko}
              placeholderText={editForm === "registration" ? "비어 있음" : "받아온 정보"}
              style={{ placeholderText: { color: "red" } }}
              onChange={(date) => setStartDate(date)}
              selected={startDate}
              timeInputLabel="시간 :"
              showTimeInput={selected}
              dateFormat={selected ? "yyyy. MM. dd h:mm" : "yyyy. MM. dd"}
            />

            {/* <div className="deadline-date">{editForm === "registration" ? "비어 있음" : "받아온 정보"}</div> */}
            <div className="deadline-time">
              시간 포함
              <Toggle selected={selected} setSelected={setSelected} />
            </div>
          </div>
        </div>
        <ModalButton variant="contained" size="lg" contents={editForm === "registration" ? "등록" : "수정하기"} />
      </div>
    </div>
  );
};

export default EditModal;
