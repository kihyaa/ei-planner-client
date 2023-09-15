import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import ModalHeader from "../components/ModalHeader";
import ModalButton from "../components/ModalButton";
import HistoryInfo from "./components/HistoryInfo";
import "../../styles/modals/HistoryModal/HistoryModal.css";

const HistoryModal = () => {
  const [historyInfo, setHistoryInfo] = useState();

  useEffect(() => {
    getHistory();
  }, []);

  const getHistory = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_PROXY}history`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setHistoryInfo(res.data.tasks);
    } catch (error) {
      alert("실패했습니다. 다시 시도해 주세요.");
      console.error(error.message);
    }
  };

  const onDeleteClick = async () => {
    try {
      const res = await axios.delete(`${process.env.REACT_APP_PROXY}history/clean `, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      getHistory();
    } catch (error) {
      alert("실패했습니다. 다시 시도해 주세요.");
      console.error(error.message);
    }
  };
  return (
    <div className="modal modal-responsive-height modal-history-height">
      <ModalHeader title="히스토리" />
      {historyInfo && (
        <div className="modal-history">
          <div className="history-title">
            총&nbsp;<span>{historyInfo.length}</span>개의 히스토리
            <ModalButton variant="outLine-default" size="sm" contents="전체 삭제" onClick={onDeleteClick} />
          </div>
          <div className="history-wrapper">
            {historyInfo.map((data, index) => (
              <HistoryInfo
                title={data.title}
                description={data.description}
                date={
                  data.completed_at == null
                    ? "없음"
                    : !data.is_time_include
                    ? `${moment(data.completed_at).format("YYYY. MM. DD ")}`
                    : `${moment(data.completed_at).format("YYYY. MM. DD ")}${
                        new Date(data.completed_at).getHours() >= 12 ? "오후" : "오전"
                      }${moment(data.completed_at).format(" hh:mm")}`
                }
                situation={data.eiType}
                key={data.id}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryModal;
