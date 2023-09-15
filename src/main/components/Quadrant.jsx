import Droppable from './Droppable';
import '../../styles/main/components/Quadrant.css';

const Quadrant = ({qudrantId, qudrantItems}) => {

  return (
    <div className={`quadrant ${qudrantId}`}>
      <Droppable id={qudrantId} items={qudrantItems}/>
    </div>
  );
};

export default Quadrant;