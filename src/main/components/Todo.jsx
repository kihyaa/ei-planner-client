import Droppable from './Droppable';
import '../../styles/main/components/Todo.css';

const Todo = ({id, items}) => {

  const droppalbeId = id;
  const todoItems = items[droppalbeId];
  
  return (
    <div className='todo'>
      <h3>일정 블록</h3>
        <Droppable id={droppalbeId} items={todoItems} layout='vertical'/>
      <div className='todo-button'>
        <button type="button">+</button>
        <button type="button">🗑️</button>
      </div>
    </div>
  );
};

export default Todo;