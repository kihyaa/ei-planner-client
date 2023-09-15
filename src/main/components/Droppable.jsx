import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, rectSortingStrategy } from "@dnd-kit/sortable";
import '../../styles/main/components/Droppable.css';

/**
 * Droppable 컴포넌트 - Drop 기능이 동작하는 영역입니다.
 *
 * @param {Object} props - 컴포넌트의 속성
 * @param {string} props.id - 해당 id로 droppableId 설정
 * @param {Array} props.items - droppable 영역에 렌더링될 요소들의 배열
 * @param {string} props.layout - 레이아웃 유형 (vertical 또는 grid)
 * @returns {JSX.Element} - Droppable 컴포넌트 JSX 요소
 */
const Droppable = ({ id, items, layout }) => {

  const { setNodeRef } = useDroppable({ id });

  return (
    <SortableContext id={id} items={items} strategy={layout === 'vertical' ? verticalListSortingStrategy : rectSortingStrategy}>
      <div className={layout === 'vertical' ? 'vertical_drop' : 'grid_drop'} ref={setNodeRef}>
        {items.map((item, idx) => (
          'sortableItem'
        ))}
      </div>
    </SortableContext>
  );
};

export default Droppable;