import Quadrant from "./Quadrant";
import "../../styles/main/components/Matrix.css";
import { useState } from "react";

const Matrix = ({ items }) => {
  const [hideInfoMsg, setHideInfoMsg] = useState(true);

  const qudrantIds = ["important_not_urgent", "important_urgent", "not_important_not_urgent", "not_important_urgent"];

  return (
    <div
      className="matrix"
      onMouseEnter={() => {
        setHideInfoMsg(false);
      }}
      onMouseLeave={() => {
        setHideInfoMsg(true);
      }}
    >
      {qudrantIds.map((qudrantId, idx) => (
        <Quadrant key={idx} qudrantId={qudrantId} qudrantItems={items[qudrantId]} hideInfoMsg={hideInfoMsg} />
      ))}
    </div>
  );
};

export default Matrix;
