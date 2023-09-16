import axios from 'axios';
import Droppable from './Droppable';
import modalStore from '../../stores/modalStore';
import EditModal from '../../modals/EditModal/EditModal';
import '../../styles/main/components/Todo.css';

const Todo = ({id, items}) => {

  const droppalbeId = id;
  const todoItems = items[droppalbeId];
  const { setModal } = modalStore();

  const cleanTask = async () => {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_PROXY}tasks/tasks/clean`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
    } catch (error) {
      alert("실패했습니다. 다시 시도해 주세요.");
      console.error(error.message);
    }
  };

  return (
    <div className='todo'>
      <h3>일정 블록</h3>
        <Droppable id={droppalbeId} items={todoItems} layout='vertical'/>
      <div className='todo-button'>
        <button type="button" onClick={() => setModal(<EditModal schedule="registration" />)}>+</button>
        <button type="button" onClick={() => cleanTask()}>🗑️</button>
      </div>
    </div>
  );
};

export default Todo;