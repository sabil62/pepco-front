import React, { useState, useEffect } from "react";
import Container from "../../../../layout/container/container";
import {
  Button,
  Grid,
} from "../../../../components/tailwind/tailwind_variable";
import MappingTable from "../mapping_comp/mappingTable";
import { returnKeyDataFromArr } from "../../../../components/functions/functions";

const MappingEdit = ({ apiEditInfo }) => {
  const [apiData, setApiData] = useState();
  const [minimumKey, setMinimumKey] = useState([]);
  const [maximumKey, setMaximumKey] = useState([]);
  const [checkbox, setCheckBox] = useState([]);

  useEffect(() => {
    // console.log(apiEditInfo);
    setApiData(apiEditInfo);
    const arrLength = returnKeyDataFromArr({
      firstArr: apiEditInfo?.source_columns, //replace tempVar with apiData
      secondArr: apiEditInfo?.dest_columns,
    });
    // console.log(arrLength);
    setMinimumKey(arrLength[1]);
    setMaximumKey(arrLength[0]);
    //checkbox
    setCheckBox([...apiEditInfo.primary_key]);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("submit");
    console.log(apiData);
  };

  const handleDragData = (key, updatedArr) => {
    // console.log(key);
    setApiData((prevData) => {
      return {
        ...prevData,
        [key]: updatedArr,
      };
    });
  };

  const handleCheckBox = (e, index) => {
    console.log(index, e.target.checked);
    let firstColKeys = [...apiData.source_columns];
    let checkboxArray = [...checkbox];
    if (e.target.checked === true) {
      //add
      checkboxArray.push(firstColKeys[index]);
    } else {
      //minus array
      checkboxArray = checkboxArray.filter(
        (item) => item != firstColKeys[index]
      );
    }
    setApiData((prevData) => {
      return { ...prevData, primary_key: checkboxArray };
    });
    setCheckBox(checkboxArray);

    console.log(checkboxArray);
  };

  return (
    <>
      Mapping Edit
      <Container className="bg-[#F4F5FA] min-h-screen pt-3 mt-6">
        <form onSubmit={handleSubmit}>
          <Grid>
            <div className="col-span-8 text-2xl font-medium mt-7 mb-3">
              Client Name:
              {/* Not given Client Name in API */}
            </div>
            <div className="md:col-span-10 pt-3 lg:col-span-2 flex justify-center items-center">
              <Button type="submit">Submit</Button>
            </div>
          </Grid>

          {/* grid  */}
          <Grid grid12>
            <div className="col-span-1">
              <div className="font-medium mt-6 ml-3">Join Key</div>
              {minimumKey?.map((item, ind) => (
                <div
                  key={item + ind}
                  className="h-16 mt-9 w-16 border-2 border-slate-200 bg-gray-50 rounded-md flex justify-center items-center hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    name={"is_primary_key"}
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  scale-125"
                    checked={
                      apiData?.primary_key?.includes(item) ? true : false
                    }
                    onChange={(e) => handleCheckBox(e, ind)}
                  />
                </div>
              ))}
            </div>
            <div className="col-span-4">
              <div className="text-xl font-medium mt-6 text-center">
                {apiData?.source}
              </div>

              {apiData?.source_columns && (
                <MappingTable
                  arr={apiData.source_columns}
                  onDragData={handleDragData}
                  keyName="source_columns"
                />
              )}
            </div>
            <div className="col-span-4">
              <div className="text-xl font-medium mt-6 text-center">
                {apiData?.dest}
              </div>
              {apiData?.dest_columns && (
                <MappingTable
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
                      className="mt-8 mb-[44px] bg-gray-50 border border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-5 py-4 outline-neutral-700"
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
    </>
  );
};

export default MappingEdit;
