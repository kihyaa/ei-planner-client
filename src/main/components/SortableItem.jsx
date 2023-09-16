import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import EiBlock from "./EiBlock";

const SortableItem = ({ id, item }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div style={style} ref={setNodeRef} {...attributes} {...listeners}>
      <EiBlock id={id} data={item} />
    </div>
  );
};

export default SortableItem;
