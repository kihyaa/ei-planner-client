import { useState, useRef, useEffect } from "react";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  pointerWithin,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates, arrayMove } from "@dnd-kit/sortable";
import { useTaskStore } from "../stores/taskStore";
import Todo from "./components/Todo";
import Matrix from "./components/Matrix";
import EiBlock from "./components/EiBlock";

import axios from "axios";
import refStore from "../stores/refStore";

import { useItemContext } from "./context/ItemContext";
import "../styles/main/Main.css";

const Main = () => {
  const { task, setTask, getTaskById } = useTaskStore();
  const { items, setItems } = useItemContext();
  const [activeId, setActiveId] = useState(null);

  const divRef = useRef(null);
  const { setRef } = refStore();
  const [blockPos, setBlockPos] = useState(null);

  useEffect(() => {
    getTask();
    setRef(divRef);
  }, []);

  useEffect(() => {
    setItems(task);
  }, [task]);

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
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 2,
      },
    }),
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragStart = ({ active }) => {
    const startContainer = active.data.current.sortable.containerId;
    setActiveId(active.id);
    setBlockPos(startContainer);
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  const moveBetweenContainers = (items, activeContainer, activeIndex, overContainer, overIndex, item) => {
    const tempItems = JSON.parse(JSON.stringify(items));

    const [targetItem] = tempItems[activeContainer].splice(activeIndex, 1);
    targetItem.ei_type = overContainer;
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

        const overIndex = over.id in items ? items[overContainer].length + 1 : over.data.current.sortable.index;

        return moveBetweenContainers(items, activeContainer, activeIndex, overContainer, overIndex, active.id);
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
      const overIndex = over.id in items ? items[overContainer].length + 1 : over.data.current.sortable.index;

      setItems((items) => {
        let newItems;
        if (activeContainer === overContainer) {
          newItems = {
            ...items,
            [overContainer]: arrayMove(items[overContainer], activeIndex, overIndex),
          };
        } else {
          newItems = moveBetweenContainers(items, activeContainer, activeIndex, overContainer, overIndex, active.id);
        }
        const extractTaskIds = extractIdsByCategory(newItems, overContainer);
        updatePosition(active.id, overContainer.toUpperCase(), extractTaskIds);
        return newItems;
      });
    } else {
      const endContainer = active.data.current.sortable.containerId;
      if (blockPos !== endContainer) {
        const newItems = active.data.current.sortable.items;
        updatePosition(active.id, endContainer.toUpperCase(), newItems);
      }
    }
    setActiveId(null);
  };

  const extractIdsByCategory = (taskArr, eiType) => {
    const eiTypeData = taskArr[eiType];
    const extractIds = eiTypeData.map((items) => items.id);
    return extractIds;
  };

  const updatePosition = async (taskId, eiType, tasks) => {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_PROXY}tasks/${taskId}/move`,
        {
          ei_type: eiType,
          tasks,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
    } catch (error) {
      alert("위치 갱신 실패. 다시 시도해주세요");
      console.error(error.message);
    }
  };

  const getEiBlockById = () =>{
    if (items) {
      for (const key in items) {
        if (Object.prototype.hasOwnProperty.call(items, key)) {
          const item = items[key].find((item) => item.id === activeId);
          if (item) {
            return item;
          }
        }
      }
    }
    return null;
  }

  return (
    <div className="content-layout" ref={divRef}>
      <div className="content-layout-container">
        <div className="content">
          <DndContext
            sensors={sensors}
            onDragStart={handleDragStart}
            onDragCancel={handleDragCancel}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
            collisionDetection={pointerWithin}
          >
            {items && (
              <>
                <Todo key="pending" id="pending" activeId={activeId} />
                <Matrix items={items} />
                <DragOverlay>
                  {activeId ? <EiBlock id={activeId} dragOverlay data={getEiBlockById()} /> : null}
                </DragOverlay>
              </>
            )}
          </DndContext>
        </div>
      </div>
    </div>
  );
};

export default Main;
