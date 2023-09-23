import axios from "axios";
import Droppable from "./Droppable";
import modalStore from "../../stores/modalStore";
import EditModal from "../../modals/EditModal/EditModal";
import AddButton from "./AddButton";
import plusIcon from "../../assets/main/plus.svg";
import trashIcon from "../../assets/main/trash.svg";
import { useItemContext } from "../context/ItemContext";
import "../../styles/main/components/Todo.css";

const Todo = ({ id }) => {
  const { items, setItems } = useItemContext();
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

      const updatedItems = {};
      for (const key in items) {
        if (Object.prototype.hasOwnProperty.call(items, key)) {
          updatedItems[key] = items[key].filter((item) => !item.is_completed);
        }
      }

      setItems(updatedItems);
    } catch (error) {
      alert("실패했습니다. 다시 시도해 주세요.");
      console.error(error.message);
    }
  };

  return (
    <div className="todo">
      <h3>일정 블록</h3>
      <Droppable id={droppalbeId} items={todoItems} layout="vertical" />
      <div className="todo-button">
        <AddButton variant="outLine-default" onClick={() => setModal(<EditModal schedule="registration" />)}>
          <p>일정 추가하기</p>
          <img src={plusIcon} alt="추가" />
        </AddButton>
        <AddButton variant="contained" onClick={() => cleanTask()}>
          <img src={trashIcon} alt="제거" />
        </AddButton>
      </div>
    </div>
  );
};

export default Todo;
