import React, { useState, useEffect } from "react";
import { Button, Grid } from "../../../components/tailwind/tailwind_variable";
import Container from "../../../layout/container/container";
import { returnKeyDataFromArr } from "../../../components/functions/functions";
import ComparisonTableNew from "./comparison Table/comparison_table_new";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const Comparison = () => {
  const [apiData, setApiData] = useState();

  const tempVar = {
    id: 5,
    source: "test",
    source_columns: ["firstname", "secondname", "salary"],
    dest: "test1",
    dest_columns: ["firstname", "lastname", "salary"],
    primary_key: ["firstname"],
    project: 19,
  };

  useEffect(() => {
    //all inside fetchdata
    setApiData(tempVar);
    const arrLength = returnKeyDataFromArr({
      firstArr: tempVar?.source_columns, //replace tempVar with apiData
      secondArr: tempVar?.dest_columns,
    });
  }, []);

  useEffect(() => {
    console.log(apiData);
  }, [apiData]);

  const handleDragDND = () => {
    console.log("handle");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("submit");
    console.log(apiData);
  };

  return (
    <Container className="bg-[#F4F5FA] min-h-screen pt-3 mt-6">
      <form onSubmit={handleSubmit}>
        <div className="col-span-8 text-2xl font-medium mt-7 mb-3">
          Client Name: System 1
        </div>

        {/* grid  */}
        <Grid grid12>
          <div className="col-span-1">Join Key</div>
          <div className="col-span-4">
            {apiData?.source}

            {apiData?.source_columns && (
              <div>
                <DragDropContext onDragEnd={handleDragDND}>
                  <Droppable droppableId="Items">
                    {(provided) => (
                      <div
                        className="bg-gray-100"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        {apiData.source_columns.map((item, id) => (
                          <Draggable key={id} draggableId={id} index={id}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="bg-[#D5DDF8] shadow-md mt-5 px-4 py-5 h-18 rounded-[18px] border-l-[24px] border-[#B0BCE8] hover:bg-blue-100"
                              >
                                {item}
                              </div>
                            )}
                          </Draggable>
                        ))}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </div>
            )}
          </div>
          <div className="col-span-4">{apiData?.dest}</div>
          <div className="col-span-3">DataType</div>
        </Grid>
      </form>
    </Container>
  );
};

export default Comparison;
