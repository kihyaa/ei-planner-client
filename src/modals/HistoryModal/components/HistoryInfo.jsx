import "../../../styles/modals/HistoryModal/components/HistoryInfo.css";

const HistoryInfo = ({ situation, title, description, date }) => {
  return (
    <div className="hisotry-info">
      <div className={`history-status ${situation}`} />
      <div className="history-info-wrapper">
        <div className="history-info-title">{title}</div>
        <div className="history-info-content">{description}</div>
        <div className="history-info-date">{date}</div>
      </div>
    </div>
  );
};

export default HistoryInfo;
