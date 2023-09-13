import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import axios from "axios";
import modalStore from "../../stores/modalStore";
import CloseIcon from "../components/CloseIcon";
import ModalTextInput from "../components/ModalTextInput";
import ModalButton from "../components/ModalButton";
import useDidMountEffect from "../../hooks/useDidMountEffect";
import Toggle from "../components/Toggle";
import CalenderIcon from "../../assets/modals/Calender.svg";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/modals/EditModal/EditModal.css";
import { parseISO } from "date-fns";

const EditModal = ({ schedule, id }) => {
  const { removeModal } = modalStore();
  const [selected, setSelected] = useState(true);
  const [existingInfo, setExistingInfo] = useState();
  const [endDate, setEndDate] = useState();
  const [editTitle, setEditTitle] = useState();
  const [editDescription, setEditDescription] = useState();

  useEffect(() => {
    if (schedule !== "registration") {
      getSchedule();
    }
  }, []);

  useDidMountEffect(() => {}, [selected]);

  const onTitleChange = (e) => {
    setEditTitle(e.target.value);
  };

  const onDescriptionChange = (e) => {
    setEditDescription(e.target.value);
  };

  const onButtonClick = async () => {
    if (schedule !== "registration") {
      try {
        const res = await axios.put(
          `${process.env.REACT_APP_PROXY}tasks/${id} `,
          {
            title: editTitle,
            description: editDescription,
            end_at: endDate,
            is_time_include: selected,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        console.log(res);
        removeModal(<EditModal />);
      } catch (error) {
        alert("실패했습니다. 다시 시도해 주세요.");
        console.error(error.message);
      }
    } else {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_PROXY}tasks `,
          {
            title: editTitle,
            description: editDescription,
            end_at: endDate,
            is_time_include: selected,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        console.log(res);
        removeModal(<EditModal />);
      } catch (error) {
        alert("실패했습니다. 다시 시도해 주세요.");
        console.error(error.message);
      }
    }
  };

  const getSchedule = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_PROXY}tasks/${id} `, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setExistingInfo(res.data);
      console.log(res);
    } catch (error) {
      alert("실패했습니다. 다시 시도해 주세요.");
      console.error(error.message);
    }
  };

  return (
    <div className="modal modal-edit-height">
      <div className="modal-edit">
        <div className="modal-edit-title">
          <div className="edit-text">{schedule === "registration" ? "일정 등록하기" : "일정 수정하기"}</div>
          <CloseIcon />
        </div>
        <div className="edit-input-wrapper">
          <div className="edit-input-newSchedule">
            <ModalTextInput
              onChange={onTitleChange}
              placeholder={schedule === "registration" ? "새 일정" : existingInfo?.title}
            />
          </div>
          <div className="edit-input-hr" />
          <textarea
            onChange={onDescriptionChange}
            placeholder={schedule === "registration" ? "설명" : existingInfo?.description}
          />
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
              placeholderText={schedule === "registration" ? "비어 있음" : existingInfo?.end_at}
              style={{ placeholderText: { color: "red" } }}
              onChange={(date) => setEndDate(date)}
              selected={endDate}
              timeInputLabel="시간 :"
              showTimeInput={selected}
              dateFormat={selected ? "yyyy. MM. dd h:mm" : "yyyy. MM. dd"}
            />
            <div className="deadline-time">
              시간 포함
              <Toggle selected={selected} setSelected={setSelected} />
            </div>
          </div>
        </div>
        <ModalButton
          onClick={onButtonClick}
          variant="contained"
          size="lg"
          contents={schedule === "registration" ? "등록" : "수정하기"}
        />
      </div>
    </div>
  );
};

export default EditModal;
