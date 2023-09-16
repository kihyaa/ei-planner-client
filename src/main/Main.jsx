import { useState, useEffect } from "react";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates, arrayMove } from "@dnd-kit/sortable";
import { useTaskStore } from "../stores/taskStore";
import Todo from "./components/Todo";
import Matrix from "./components/Matrix";
import EiBlock from "./components/EiBlock";
import axios from 'axios';
import '../styles/main/Main.css';

const Main = () => {
  
  const { task, setTask, getTaskById } = useTaskStore();
  const [items, setItems] = useState(null);
  const [activeId, setActiveId] = useState(null);
  
  useEffect(()=>{
    getTask();
  },[]);

  useEffect(()=>{
    setItems(task);
  },[task]);

  const getTask = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_PROXY}tasks`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const updatedTask = {
        pending: [],
        important_urgent: [],
        important_not_urgent: [],
        not_important_urgent: [],
        not_important_not_urgent: [],
      };

      for (const key in updatedTask) {
        if (Object.prototype.hasOwnProperty.call(res.data, key)) {
          updatedTask[key] = res.data[key].tasks;
        }
      } 
      
      setTask(updatedTask);
    } catch (error) {
      alert("실패했습니다. 다시 시도해 주세요.");
      console.error(error.message);
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor,{
      activationConstraint:{
        distance : 2
      }
    }),
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = ({ active }) => {
    setActiveId(active.id);
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  const moveBetweenContainers = (
    items,
    activeContainer,
    activeIndex,
    overContainer,
    overIndex,
    item
  ) => {
    const tempItems = JSON.parse(JSON.stringify(items));
    const [targetItem] = tempItems[activeContainer].splice(activeIndex, 1);
    tempItems[overContainer].splice(overIndex, 0, targetItem);

    return tempItems;
  };

  const handleDragOver = ({ active, over }) => {
    const overId = over?.id;

    if (!overId) {
      return;
    }

    const activeContainer = active.data.current.sortable.containerId;
    const overContainer = over.data.current?.sortable.containerId || over.id;

    if (activeContainer !== overContainer) {
      setItems((items) => {
        const activeIndex = active.data.current.sortable.index;

        const overIndex =
          over.id in items
            ? items[overContainer].length + 1
            : over.data.current.sortable.index;

        return moveBetweenContainers(
          items,
          activeContainer,
          activeIndex,
          overContainer,
          overIndex,
          active.id
        );
      });
    }
  };

  const handleDragEnd = ({ active, over }) => {
    if (!over) {
      setActiveId(null);
      return;
    }

    if (active.id !== over.id) {
      const activeContainer = active.data.current.sortable.containerId;
      const overContainer = over.data.current?.sortable.containerId || over.id;
      const activeIndex = active.data.current.sortable.index;
      const overIndex =
        over.id in items
          ? items[overContainer].length + 1
          : over.data.current.sortable.index;

      setItems((items) => {
        let newItems;
        if (activeContainer === overContainer) {
          newItems = {
            ...items,
            [overContainer]: arrayMove(
              items[overContainer],
              activeIndex,
              overIndex
            ),
          };
        } else {
          newItems = moveBetweenContainers(
            items,
            activeContainer,
            activeIndex,
            overContainer,
            overIndex,
            active.id
          );
        }
        const extractTaskIds = extractIdsByCategory(newItems, overContainer);
        updatePosition(active.id, overContainer, extractTaskIds);
        return newItems;
      });
    }

    setActiveId(null);
  };

  const extractIdsByCategory = (taskArr, eiType) =>{
    const eiTypeData = taskArr[eiType];
    const extractIds = eiTypeData.map(items => items.id);
    return extractIds;
  }

  const updatePosition = async(taskId, eiType, tasks) =>{
    try {
      const res = await axios.put(`${process.env.REACT_APP_PROXY}tasks/${taskId}/move`, {
        ei_type : eiType,
        tasks
      },{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(res);
    } catch (error) {
      alert("위치 갱신 실패. 다시 시도해주세요");
      console.error(error.message);
    }
  };

  return (
    <div className='content-layout'>
      <div className='content-layout-container'>
        <div className="content">
          <DndContext
            sensors={sensors}
            onDragStart={handleDragStart}
            onDragCancel={handleDragCancel}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}>
            {items && 
              <>
                <Todo key="pending" id="pending" items={items} activeId={activeId} />
                <Matrix items={items} />
                <DragOverlay>
                  {activeId ? <EiBlock id={activeId} dragOverlay data={getTaskById(activeId)}/> : null}
                </DragOverlay>
              </>
            }
          </DndContext>
        </div>
      </div>
    </div>
  );
};

export default Main;