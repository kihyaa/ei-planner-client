import { useEffect, useState } from "react";
import moment from "moment";
import { format, isYesterday, isTomorrow, isToday, subDays, addDays } from "date-fns";
import { ko } from "date-fns/locale";
import axios from "axios";
import modalStore from "../../stores/modalStore";
import userStore from "../../stores/userStore";
import DetailModal from "../../modals/DetailModal/DetailModal";
import { useItemContext } from "../context/ItemContext";
import "../../styles/main/components/EiBlock.css";
import CheckOff from "../../assets/main/CheckOff.svg";
import CheckOn from "../../assets/main/CheckOn.svg";
import EiX from "../../assets/main/EiX.svg";

const EiBlock = ({ data }) => {
  const { setModal } = modalStore();
  const [hide, setHide] = useState(true);
  const { isViewDateTime } = userStore();
  const { items, setItems } = useItemContext();

  const putChk = async () => {
    try {
      await axios.put(
        `${process.env.REACT_APP_PROXY}tasks/${data.id}/checked`,
        { is_checked: !data.is_completed },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
    } catch (error) {
      alert("실패했습니다. 다시 시도해 주세요.");
      console.error(error.message);
    }
  };

  const deleteEiBlock = async (e, id) => {
    e.stopPropagation();
    try {
      await axios.delete(`${process.env.REACT_APP_PROXY}tasks/${id} `, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const deleteEiType = data.ei_type.toLowerCase();
      const updatedItems = {
        ...items,
        [deleteEiType]: items[deleteEiType].filter((item) => item.id !== id),
      };
      setItems(updatedItems);
    } catch (error) {
      alert("실패했습니다. 다시 시도해 주세요.");
      console.error(error.message);
    }
  };

  const detailEiBlock = (e, id) => {
    e.stopPropagation();
    console.log("test");
    setModal(<DetailModal id={id} />);
  };

  const formatDate = (date) => {
    const endDate = new Date(date);
    const relativeDate = isYesterday(endDate)
      ? "어제"
      : isTomorrow(endDate)
      ? "내일"
      : isToday(endDate)
      ? "오늘"
      : isToday(subDays(endDate, 2))
      ? "모레"
      : isToday(addDays(endDate, 2))
      ? "그저께"
      : format(endDate, "yyyy. MM. dd", { locale: ko });

    return relativeDate;
  };

  const formatTime = (time) => {
    const currentTime = new Date().getHours();
    const endHour = new Date(time).getHours();
    const currentDay = new Date().getDate();
    const endDay = new Date(time).getDate();

    const relativeHour =
      endDay === currentDay
        ? endHour === currentTime + 1
          ? "1시간 전"
          : endHour === currentTime + 2
          ? "2시간 전"
          : endHour === currentTime + 3
          ? "3시간 전"
          : `${new Date(time).getHours() >= 12 ? "오후" : "오전"}  ${moment(time).format(" hh:mm")}`
        : `${new Date(time).getHours() >= 12 ? "오후" : "오전"}  ${moment(time).format(" hh:mm")}`;

    return relativeHour;
  };

  const formatEndAt = (data) => {
    const dataTime = data.is_time_include && formatTime(data.end_at);
    const dataDate = data.end_at === null ? "" : formatDate(data.end_at);

    if (dataDate === "오늘" && (dataTime === "1시간 전" || dataTime === "2시간 전" || dataTime === "3시간 전")) {
      return <p className="ei-block-end_at">{data.is_time_include && formatTime(data.end_at)}</p>;
    }

    if (
      dataDate === "어제" ||
      dataDate === "오늘" ||
      dataDate === "모레" ||
      dataDate === "그저께" ||
      dataDate === "내일"
    ) {
      return (
        <>
          <p className="ei-block-end_at">{data.end_at === null ? "" : formatDate(data.end_at)}</p>
          {dataDate === "오늘" ? (
            <p className="ei-block-end_at">{data.is_time_include && formatTime(data.end_at)}</p>
          ) : (
            ""
          )}
        </>
      );
    }

    return (
      <>
        <p className="ei-block-end_at">{data.end_at === null ? "" : formatDate(data.end_at)}</p>
        <p className="ei-block-end_at">{data.is_time_include && formatTime(data.end_at)}</p>
      </>
    );
  };

  return (
    data && (
      <div
        role="button"
        tabIndex={0}
        className="ei-block-container"
        onClick={(e) => detailEiBlock(e, data.id)}
        onMouseEnter={() => {
          setHide(false);
        }}
        onMouseLeave={() => {
          setHide(true);
        }}
      >
        <div className="ei-block-info">
          <h2 className="ei-block-title">{data.title}</h2>
          <p className="ei-block-description">{data.description}</p>
          {isViewDateTime && <>{formatEndAt(data)}</>}
        </div>
        <div className="ei-block-Icon">
          {hide ? (
            <div> </div>
          ) : (
            <button type="button" onClick={(e) => deleteEiBlock(e, data.id)}>
              <img src={EiX} alt="삭제" />
            </button>
          )}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              putChk();
              const checkEiType = data.ei_type.toLowerCase();
              const updatedItems = {
                ...items,
                [checkEiType]: items[checkEiType].map((item) => {
                  if (item.id === data.id) {
                    return {
                      ...item,
                      is_completed: !item.is_completed,
                    };
                  }
                  return item;
                }),
              };
              setItems(updatedItems);
            }}
          >
            <img src={data.is_completed ? CheckOn : CheckOff} alt="check" />
          </button>
        </div>
      </div>
    )
  );
};

export default EiBlock;
