import Droppable from './Droppable';

const Quadrant = ({qudrantId, qudrantItems}) => {

  return (
    <div className={`quadrant ${qudrantId}`}>
      <Droppable id={qudrantId} items={qudrantItems}/>
    </div>
  );
};

export default Quadrant;