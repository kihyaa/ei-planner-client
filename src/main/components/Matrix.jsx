import Quadrant from './Quadrant';
import '../../styles/main/components/Matrix.css';

const Matrix = ({items}) => {

  const qudrantIds = ['important_not_urgent', 'important_urgent', 'not_important_not_urgent', 'not_important_urgent'];

  return (
    <div className='matrix'>
      {qudrantIds.map((qudrantId,idx)=>
        <Quadrant key={idx} qudrantId = {qudrantId} qudrantItems={items[qudrantId]}/>
      )}
    </div>
  );
};

export default Matrix;