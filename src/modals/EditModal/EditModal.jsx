import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import axios from "axios";
import moment from "moment";
import modalStore from "../../stores/modalStore";
import CloseIcon from "../components/CloseIcon";
import ModalTextInput from "../components/ModalTextInput";
import ModalButton from "../components/ModalButton";
import useDidMountEffect from "../../hooks/useDidMountEffect";
import Toggle from "../components/Toggle";
import { useItemContext } from "../../main/context/ItemContext";
import CalenderIcon from "../../assets/modals/Calender.svg";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/modals/EditModal/EditModal.css";

const EditModal = ({ schedule, id }) => {
  const { removeModal } = modalStore();
  const [selected, setSelected] = useState(false);
  const [existingInfo, setExistingInfo] = useState();
  const [endDate, setEndDate] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const { items } = useItemContext();

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
      const koreanTime = endDate === null ? existingInfo.end_at : new Date(endDate.getTime() + 9 * 60 * 60 * 1000);
      try {
        const res = await axios.put(
          `${process.env.REACT_APP_PROXY}tasks/${id} `,
          {
            title: editTitle || "제목 없음",
            description: editDescription,
            end_at: koreanTime,
            is_time_include: selected,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        const editEiType = res.data.ei_type.toLowerCase();
        const itemsOfType = items[editEiType];

        itemsOfType.forEach((item, index) => {
          if (item.id === res.data.id) {
            itemsOfType[index] = res.data;
          }
        });

        removeModal();
      } catch (error) {
        alert("실패했습니다. 다시 시도해 주세요.");
        console.error(error.message);
      }
    } else {
      const koreanTime = endDate === null ? null : new Date(endDate.getTime() + 9 * 60 * 60 * 1000);
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_PROXY}tasks `,
          {
            title: editTitle || "제목 없음",
            description: editDescription,
            end_at: koreanTime,
            is_time_include: selected,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        const addEiType = res.data.ei_type.toLowerCase();
        items[addEiType].push(res.data);

        removeModal();
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
      setEditTitle(res.data.title);
      setEditDescription(res.data.description);
      setSelected(res.data.is_time_include);
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
              focusMe="true"
              maxLength="10"
              onChange={onTitleChange}
              placeholder="제목 없음"
              value={editTitle}
            />
          </div>
          <div className="edit-input-hr" />
          <textarea
            maxLength="100"
            onChange={onDescriptionChange}
            placeholder={schedule === "registration" ? "설명" : ""}
            value={editDescription}
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
              placeholderText={
                schedule === "registration"
                  ? "비어 있음"
                  : existingInfo?.end_at
                  ? new Date(existingInfo?.end_at).getHours() === 0
                    ? `${moment(existingInfo.end_at).format("YYYY. MM. DD ")}`
                    : `${moment(existingInfo.end_at).format("YYYY. MM. DD ")}${
                        new Date(existingInfo.end_at).getHours() >= 12 ? "오후" : "오전"
                      } ${selected === true ? moment(existingInfo.end_at).format(" hh:mm") : ""}`
                  : "비어 있음"
              }
              onChange={(date) => setEndDate(date)}
              selected={endDate}
              timeInputLabel="시간 :"
              showTimeInput={selected}
              dateFormat={selected ? "yyyy. MM. dd aa h:mm" : "yyyy. MM. dd"}
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
