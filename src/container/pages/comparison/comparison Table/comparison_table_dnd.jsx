import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import DragComp from "./drag component/dragComp";

const ComparisonDND = ({ arrs }) => {
  return (
    <div>
      <SortableContext items={arrs} strategy={verticalListSortingStrategy}>
        {arrs?.map((item, index) => (
          <DragComp index={index} item={item} />
        ))}
      </SortableContext>
    </div>
  );
};

export default ComparisonDND;
