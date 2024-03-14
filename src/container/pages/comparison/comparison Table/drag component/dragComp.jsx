import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const DragComp = ({ index, item }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: index });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  //   console.log(attributes);

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      //   className="grid grid-cols-12 gap-2 drag-box bg-[#D5DDF8] shadow-md cursor-move mt-5 px-4 py-5 h-18 rounded-[18px] border-l-[24px] border-[#B0BCE8] hover:bg-blue-100 hover:border-blue-300"
      className="bg-[#D5DDF8] shadow-md mt-5 px-4 py-5 h-18 rounded-[18px] border-l-[24px] border-[#B0BCE8] hover:bg-blue-100"
    >
      {item}
    </div>
  );
};

export default DragComp;
