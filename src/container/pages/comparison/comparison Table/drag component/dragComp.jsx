import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const DragComp = ({ index, item }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: index });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-[#D5DDF8] shadow-md mt-5 px-4 py-5 h-18 rounded-[18px] border-l-[24px] border-[#B0BCE8] hover:bg-blue-100"
    >
      {item}
    </div>
    //   console.log(attributes);
  );
};

export default DragComp;

// const SortableUser = ({ user }) => {
// const {
//   attributes,
//   listeners,
//   setNodeRef,
//   transform,
//   transition,
// } = useSortable({ id: user.id });
// const style = {
//   transition,
//   transform: CSS.Transform.toString(transform),
// };

// return (
//   <div
//     ref={setNodeRef}
//     style={style}
//     {...attributes}
//     {...listeners}
//     className="user"
//   >
//     {user.name}
//   </div>
//     );
//   };
