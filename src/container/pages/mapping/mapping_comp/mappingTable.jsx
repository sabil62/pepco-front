import React, { useRef } from "react";

import DragAndDrop from "../../../../assets/icons/dragAndDrop";

const MappingTable = ({ arr, onDragData, keyName }) => {
  //   console.log(keyName);
  const currentlyDraggedComponent = useRef(0);
  const toBeReplacedComponent = useRef(0);

  const handleSort = () => {
    let updatetFullList = [...arr];

    let tmp = updatetFullList[currentlyDraggedComponent.current];
    updatetFullList[currentlyDraggedComponent.current] =
      updatetFullList[toBeReplacedComponent.current];
    updatetFullList[toBeReplacedComponent.current] = tmp;

    console.log(updatetFullList);

    //from previous
    // console.log(keyName);
    onDragData(keyName, updatetFullList);
  };

  return (
    <div className="container">
      {/* use the loop here  */}
      {arr?.map((item, index) => (
        <div
          className="grid grid-cols-12 gap-2 drag-box bg-[#D5DDF8] shadow-md cursor-move mt-5 mx-2 px-6 py-5 h-20 rounded-[18px] border-l-[24px] border-[#B0BCE8] hover:bg-blue-100 hover:border-blue-300"
          key={item + index}
          draggable
          onDragStart={() => (currentlyDraggedComponent.current = index)}
          onDragEnter={() => (toBeReplacedComponent.current = index)}
          onDragEnd={handleSort}
          onDragOver={(e) => e.preventDefault()}
        >
          <div className="drag-icon">
            <DragAndDrop />
          </div>

          <div className="col-span-5 flex items-center font-medium text-lg">
            {item}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MappingTable;
