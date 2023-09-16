import Droppable from "./Droppable";
import "../../styles/main/components/Quadrant.css";

const Quadrant = ({ qudrantId, qudrantItems, hideInfoMsg }) => {
  const dict = {
    important_urgent: "급하고 중요한 일 ",
    important_not_urgent: "긴급하지 않지만 중요한 일",
    not_important_urgent: "긴급하지만 중요하지 않은 일",
    not_important_not_urgent: "긴급하지도 중요하지도 않은 일",
  };
  return (
    <div className={`quadrant ${qudrantId}`}>
      <Droppable id={qudrantId} items={qudrantItems} />
      <p>{dict[qudrantId]}</p>
    </div>
  );
};

export default Quadrant;
