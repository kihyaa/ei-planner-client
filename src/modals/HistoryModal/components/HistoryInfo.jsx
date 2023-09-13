import "../../../styles/modals/HistoryModal/components/HistoryInfo.css";

const HistoryInfo = ({ situation }) => {
  return (
    <div className="hisotry-info">
      <div className={`history-status ${situation}`} />
      <div className="history-info-wrapper">
        <div className="history-info-title">타이틀 부분</div>
        <div className="history-info-content">설명 부분</div>
        <div className="history-info-date">날짜 부분</div>
      </div>
    </div>
  );
};

export default HistoryInfo;
