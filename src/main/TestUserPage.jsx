import { useState, useEffect, useRef } from "react";
import axios from "axios";
import EiBlock from "./components/EiBlock";
import "../styles/main/TestUserPage.css";

const TaskList = ({ tasks }) => {
  return (
    <ul>
      {tasks.map((task) => (
        <EiBlock data={task} />
      ))}
    </ul>
  );
};

const TestUserPage = () => {
  const [tasks, setTasks] = useState();

  useEffect(() => {
    getTask();
  }, []);

  const cleanTest = async () => {
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
      console.log(res);
    } catch (error) {
      alert("실패했습니다. 다시 시도해 주세요.");
      console.error(error.message);
    }
  };

  const getTask = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_PROXY}tasks `, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setTasks(res.data);
      console.log(res);
    } catch (error) {
      alert("실패했습니다. 다시 시도해 주세요.");
      console.error(error.message);
    }
  };

  return (
    tasks && (
      <div className="test-user-container">
        <h1>Task Lists</h1>
        <button type="button" onClick={() => cleanTest()}>
          체크한거 삭제
        </button>
        <div>
          <h2>Pending Tasks</h2>
          <TaskList tasks={tasks.pending.tasks} section="pending" />
        </div>
        <div>
          <h2>Important and Urgent Tasks</h2>
          <TaskList tasks={tasks.important_urgent.tasks} section="important_urgent" />
        </div>
        <div>
          <h2>Important but Not Urgent Tasks</h2>
          <TaskList tasks={tasks.important_not_urgent.tasks} section="important_not_urgent" />
        </div>
        <div>
          <h2>Not Important but Urgent Tasks</h2>
          <TaskList tasks={tasks.not_important_urgent.tasks} section="not_important_urgent" />
        </div>
        <div>
          <h2>Not Important and Not Urgent Tasks</h2>
          <TaskList tasks={tasks.not_important_not_urgent.tasks} section="not_important_not_urgent" />
        </div>
      </div>
    )
  );
};

export default TestUserPage;
