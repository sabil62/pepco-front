import React, { useState, useEffect } from "react";
import { Grid } from "../../../components/tailwind/tailwind_variable";
import Container from "../../../layout/container/container";
import {
  returnKeyDataFromArr,
  returnKeyWithMaxComp,
} from "../../../components/functions/functions";
import ComparisonTableNew from "./comparison Table/comparison_table_new";

const ComparisonNew = () => {
  const [apiData, setApiData] = useState([]);
  const [minimumKey, setMinimumKey] = useState([]);
  const [maximumKey, setMaximumKey] = useState([]);

  const tempVar = [
    {
      id: 5,
      source: "test",
      source_columns: ["firstname", "secondname", "salary"],
      dest: "test1",
      dest_columns: ["firstname", "lastname", "salary"],
      primary_key: ["firstname"],
      project: 19,
    },
  ];

  useEffect(() => {
    //all inside fetchdata
    setApiData(tempVar);
    const arrLength = returnKeyDataFromArr({
      firstArr: tempVar[0]?.source_columns, //replace tempVar with apiData
      secondArr: tempVar[0]?.dest_columns,
    });
    // console.log(arrLength);
    setMinimumKey(arrLength[1]);
    setMaximumKey(arrLength[0]);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <Container className="bg-[#F4F5FA] min-h-screen pt-3">
      <form onSubmit={handleSubmit}></form>
      <div className="text-2xl font-medium mt-5 mb-3">
        Client Name: System 1
      </div>
      {/* grid  */}
      <Grid grid12>
        <div className="col-span-1">
          <div className="font-medium mt-6 ml-3">Join Key</div>
          {minimumKey?.map((item, key) => (
            <div
              key={item + key}
              className="h-20 mt-5 w-20 border-2 border-slate-200 bg-gray-50 rounded-md flex justify-center items-center hover:bg-gray-50 cursor-pointer"
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
          <div className="text-xl font-medium mt-6">{apiData[0]?.source}</div>

          {apiData[0]?.source_columns && (
            <ComparisonTableNew arr={apiData[0].source_columns} />
          )}
        </div>
        <div className="col-span-4">
          <div className="text-xl font-medium mt-6">{apiData[0]?.dest}</div>
          {apiData[0]?.dest_columns?.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </div>
        <div className="col-span-3">
          <div className="text-lg font-medium mt-6 text-center ">DataType</div>
        </div>
      </Grid>
    </Container>
  );
};

export default ComparisonNew;
