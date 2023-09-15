import '../../styles/main/components/Matrix.css';

const Matrix = ({items}) => {

  const qudrantIds = ['important_not_urgent', 'important_urgent', 'not_important_not_urgent', 'not_important_urgent'];

  return (
    <div className='matrix'>
      {qudrantIds.map((qudrantId,idx)=>
        'Quadarnt'
      )}
    </div>
  );
};

export default Matrix;