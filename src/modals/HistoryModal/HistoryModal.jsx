import { useState, useEffect } from "react";
import axios from "axios";
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
      setHistoryInfo(res.data);
      console.log(res);
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
      console.log(res);
      getHistory();
    } catch (error) {
      alert("실패했습니다. 다시 시도해 주세요.");
      console.error(error.message);
    }
  };
  return (
    <div className="modal modal-responsive-height modal-history-height">
      <ModalHeader title="히스토리" />
      <div className="modal-history">
        <div className="history-title">
          총&nbsp;<span>{historyInfo?.count}</span>개의 히스토리
          <ModalButton variant="outLine-default" size="sm" contents="전체 삭제" onClick={onDeleteClick} />
        </div>
        <div className="history-wrapper">
          {historyInfo?.count !== 0 &&
            historyInfo?.task.map((data, index) => (
              <HistoryInfo
                title={data.title}
                description={data.description}
                date={data.completed_at}
                situation={data.eiType}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default HistoryModal;
