import React, { useState, useEffect } from "react";
import Container from "../../../../layout/container/container";
import {
  Button,
  Grid,
} from "../../../../components/tailwind/tailwind_variable";
import MappingTable from "../mapping_comp/mappingTable";
import { returnKeyDataFromArr } from "../../../../components/functions/functions";
import { updateMapping } from "../../../../utils/api/api/mapAPI";
import { useNavigate } from "react-router-dom";
import { applyMax } from "../../../../components/functions/parseFunctions";

const MappingEdit = ({ apiEditInfo, title }) => {
  const [apiData, setApiData] = useState();
  const [minimumKey, setMinimumKey] = useState([]);
  const [maximumKey, setMaximumKey] = useState([]);
  const [checkbox, setCheckBox] = useState([]);
  const [checkboxIndex, setCheckBoxIndex] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    console.log(apiEditInfo);
    setApiData(apiEditInfo);
    const arrLength = returnKeyDataFromArr({
      firstArr: apiEditInfo?.file1_columns, //replace tempVar with apiData
      secondArr: apiEditInfo?.file2_columns,
    });
    console.log(arrLength);
    setMinimumKey(arrLength[1]);
    setMaximumKey(arrLength[0]);
    //checkbox
    setCheckBox([...apiEditInfo?.join_on]);

    let checkedArr = [];
    apiEditInfo?.file1_columns.forEach((item, index) => {
      if (apiEditInfo?.join_on.includes(item)) {
        checkedArr.push(index);
      }
    });
    setCheckBoxIndex(checkedArr);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("submit");
    console.log(apiData);
    let submitData = { ...apiData };
    let soruceKey = [...apiData.file1_columns];
    let checkArr = [...checkboxIndex];
    let primaryKeyArr = [];
    checkArr.forEach((ind) => {
      primaryKeyArr.push(soruceKey[ind]);
    });
    submitData["file1_columns"] = applyMax(apiData.file1_columns, maximumKey);
    submitData["file2_columns"] = applyMax(apiData.file2_columns, maximumKey);

    submitData["join_on"] = primaryKeyArr;
    //send this to update API

    let id = submitData.id;
    delete submitData.id;
    console.log(submitData, id);

    try {
      let resp = await updateMapping({ id, header: submitData });
      if (resp.status === 200) {
        console.log("SUCCESS");
        setTimeout(() => {
          navigate("/logic");
        }, 1000);
      }
    } catch (error) {}
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
    let firstColKeys = [...apiData.file1_columns];
    let checkboxArray = [...checkbox];
    let checkIndex = [...checkboxIndex];

    if (e.target.checked === true) {
      //add
      checkboxArray.push(firstColKeys[index]);
      checkIndex.push(index);
    } else {
      //minus array
      checkboxArray = checkboxArray.filter(
        (item) => item != firstColKeys[index]
      );
      checkIndex = checkIndex.filter((ind) => ind != index);
    }
    setApiData((prevData) => {
      return { ...prevData, join_on: checkboxArray };
    });
    setCheckBox(checkboxArray);
    console.log(checkIndex);
    setCheckBoxIndex(checkIndex);

    // console.log(checkboxArray);
  };

  return (
    <>
      <div className="text-[10px]">Mapping Edit</div>

      <Container className="bg-[#F4F5FA] min-h-screen pt-3 mt-6">
        <form onSubmit={handleSubmit}>
          <Grid>
            <div className="col-span-8 text-2xl font-medium mt-7 mb-3">
              {title && title}
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
              {apiData?.file1_columns?.map((item, ind) => (
                <div
                  key={item + ind}
                  className="h-16 mt-9 w-16 border-2 border-slate-200 bg-gray-50 rounded-md flex justify-center items-center hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    name={"is_join_on"}
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  scale-125"
                    checked={apiData?.join_on?.includes(item) ? true : false}
                    onChange={(e) => handleCheckBox(e, ind)}
                    disabled={ind >= minimumKey.length ? true : false}
                  />
                </div>
              ))}
            </div>
            <div className="col-span-4">
              <div className="text-[1.14rem] font-medium mt-6 text-center">
                {apiData?.file1}
              </div>

              {apiData?.file1_columns && (
                <MappingTable
                  arr={apiData.file1_columns}
                  onDragData={handleDragData}
                  keyName="file1_columns"
                />
              )}
            </div>
            <div className="col-span-4">
              <div className="text-[1.14rem] font-medium mt-6 text-center">
                {apiData?.file2}
              </div>
              {apiData?.file2_columns && (
                <MappingTable
                  arr={apiData.file2_columns}
                  onDragData={handleDragData}
                  keyName="file2_columns"
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
