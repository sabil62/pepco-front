import React, { useState, useEffect } from "react";
import { Button, Grid } from "../../../components/tailwind/tailwind_variable";
import Container from "../../../layout/container/container";
import { returnKeyDataFromArr } from "../../../components/functions/functions";
import ComparisonTableNew from "./comparison Table/comparison_table_new";

import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
  sortableKeyboardCoordinates,
} from "@dnd-kit/core";
import ComparisonDND from "./comparison Table/comparison_table_dnd";

const ComparisonNew = () => {
  const [apiData, setApiData] = useState();
  const [minimumKey, setMinimumKey] = useState([]);
  const [maximumKey, setMaximumKey] = useState([]);

  const tempVar = {
    id: 5,
    source: "test",
    source_columns: ["firstname", "secondname", "salary"],
    dest: "test1",
    dest_columns: ["firstname", "lastname", "salary"],
    primary_key: ["firstname"],
    project: 19,
  };

  const sensors = useSensors(
    useSensor(PointerSensor)
    // useSensor(KeyboardSensor, {
    //   coordinateGetter: sortableKeyboardCoordinates,
    // })
  );

  useEffect(() => {
    //all inside fetchdata
    setApiData(tempVar);
    const arrLength = returnKeyDataFromArr({
      firstArr: tempVar?.source_columns, //replace tempVar with apiData
      secondArr: tempVar?.dest_columns,
    });
    // console.log(arrLength);
    setMinimumKey(arrLength[1]);
    setMaximumKey(arrLength[0]);
  }, []);

  useEffect(() => {
    console.log(apiData);
  }, [apiData]);

  const handleDragData = (key, updatedArr) => {
    // console.log(key);
    setApiData((prevData) => {
      return {
        ...prevData,
        [key]: updatedArr,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("submit");
    console.log(apiData);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    console.log(event);

    if (active.id === over.id) return;

    // setTasks((tasks) => {
    //   const originalPos = getTaskPos(active.id);
    //   const newPos = getTaskPos(over.id);

    //   return arrayMove(tasks, originalPos, newPos);
    // });

    // setApiData((prevState)=>{

    // })
  };

  return (
    <Container className="bg-[#F4F5FA] min-h-screen pt-3 mt-6">
      <form onSubmit={handleSubmit}>
        <Grid>
          <div className="col-span-8 text-2xl font-medium mt-7 mb-3">
            Client Name: System 1
          </div>
          <div className="md:col-span-10 pt-3 lg:col-span-2 flex justify-center items-center">
            <Button type="submit">Submit</Button>
          </div>
        </Grid>

        {/* grid  */}
        <Grid grid12>
          <div className="col-span-1">
            <div className="font-medium mt-6 ml-3">Join Key</div>
            {minimumKey?.map((item, key) => (
              <div
                key={item + key}
                className="h-16 mt-7 w-16 border-2 border-slate-200 bg-gray-50 rounded-md flex justify-center items-center hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  name={"is_primary_key"}
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  scale-125"
                  // onChange={(e) => handleCheckBox(e, index)}
                />
              </div>
            ))}
          </div>
          <div className="col-span-4">
            <div className="text-xl font-medium mt-6 text-center">
              {apiData?.source}
            </div>

            {apiData?.source_columns && (
              <ComparisonTableNew
                arr={apiData.source_columns}
                onDragData={handleDragData}
                keyName="source_columns"
              />
            )}
            {apiData?.source_columns && (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragEnd={handleDragEnd}
              >
                <ComparisonDND id="toDo" arrs={apiData.source_columns} />
              </DndContext>
            )}
          </div>
          <div className="col-span-4">
            <div className="text-xl font-medium mt-6 text-center">
              {apiData?.dest}
            </div>
            {apiData?.dest_columns && (
              <ComparisonTableNew
                arr={apiData.dest_columns}
                onDragData={handleDragData}
                keyName="dest_columns"
              />
            )}
          </div>
          <div className="col-span-3">
            <div className="text-lg font-medium mt-6 text-center ">
              DataType
            </div>
            {maximumKey?.length > 0 &&
              maximumKey.map((item, i) => (
                <div key={item + i}>
                  <select
                    id="datatype"
                    className="bg-gray-50 border border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-5 py-4 mt-6 mb-[32px] outline-neutral-700"
                    //   onChange={(e) => handleSelect(e, i)}
                  >
                    <option value="" disabled selected>
                      Select an option
                    </option>
                    <option value="String">String</option>
                    <option value="long">Long</option>
                    <option value="float">Float</option>
                  </select>
                </div>
              ))}
          </div>
        </Grid>
      </form>
    </Container>
  );
};

export default ComparisonNew;
