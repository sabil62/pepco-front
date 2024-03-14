import React, { useState, useEffect } from "react";
import {
  Button,
  Grid,
} from "../../../../components/tailwind/tailwind_variable";
import Container from "../../../../layout/container/container";
import { returnKeyDataFromArr } from "../../../../components/functions/functions";
import MappingTable from "../mapping_comp/mappingTable";
import { getProject } from "../../../../utils/api/api/projectAPI";
import { getFile } from "../../../../utils/api/api/fileAPI";

const MappingAdd = ({ projectId }) => {
  const [apiData, setApiData] = useState();
  const [minimumKey, setMinimumKey] = useState([]);
  const [maximumKey, setMaximumKey] = useState([]);

  const [projectData, setProjectData] = useState();
  const [excelFirst, setExcelFirst] = useState();
  const [excelSecond, setExcelSecond] = useState();

  const [checkboxIndex, setCheckBoxIndex] = useState([]);

  useEffect(() => {
    console.log(projectId);
    if (projectId) {
      let currentProjectInfo = {};
      let fileInfoFirst = {};
      let fileInfoSecond = {};
      let submitTemplate = {};

      const fetchAllData = async () => {
        try {
          //-----1st first API of project Information (get tilte of project and mapped excel_file id)
          let resp = await getProject({ id: projectId });
          if (resp.status === 200) {
            // console.log(resp.data);
            currentProjectInfo = resp.data;
            setProjectData(currentProjectInfo);
          }
          //   console.log(currentProjectInfo);
          //-------2nd excel file information (including title and all headrs with category)
          let respFile1 = await getFile({
            id: currentProjectInfo.excel_files[0],
          });
          let respFile2 = await getFile({
            id: currentProjectInfo?.excel_files[1],
          });

          if ((respFile1.status === 200) & (respFile2.status === 200)) {
            fileInfoFirst = respFile1.data;
            fileInfoSecond = respFile2.data;
            setExcelFirst(respFile1.data);
            setExcelSecond(respFile2.data);
          }

          submitTemplate = {
            source: fileInfoFirst.title,
            // source_columns: Object.keys(fileInfoFirst.header).map((c)=>c), //for keys
            source_columns: Object.keys(fileInfoFirst.header).map(
              (c) => fileInfoFirst.header[c]
            ),
            dest: fileInfoSecond.title,
            dest_columns: Object.keys(fileInfoSecond.header).map(
              (c) => fileInfoSecond.header[c]
            ),
            project: projectId,
            primary_key: [],
          };

          console.log(submitTemplate);
          setApiData(submitTemplate);

          //min and max key
          const arrLength = returnKeyDataFromArr({
            firstArr: submitTemplate?.source_columns, //replace tempVar with apiData
            secondArr: submitTemplate?.dest_columns,
          });
          // console.log(arrLength);
          setMinimumKey(arrLength[1]);
          setMaximumKey(arrLength[0]);
        } catch (error) {
          console.log(error);
        }
      };
      fetchAllData();
    }
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
    let submitData = { ...apiData };
    let checkArr = [...checkboxIndex];

    let source_col = [...apiData["source_columns"]];

    let primaryCol = checkArr.map((item) => source_col[item]);

    submitData["primary_key"] = primaryCol;

    console.log(submitData);
    setApiData(submitData);
  };

  const handleCheckBox = (e, index) => {
    let checkIndexArr = [...checkboxIndex];
    if (e.target.checked === true) {
      checkIndexArr.push(index);
    } else {
      checkIndexArr = checkIndexArr.filter((item) => item != index);
    }
    console.log(checkIndexArr);
    setCheckBoxIndex(checkIndexArr);
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
            {minimumKey?.map((item, index) => (
              <div
                key={item + index}
                className="h-16 mt-9 w-16 border-2 border-slate-200 bg-gray-50 rounded-md flex justify-center items-center hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  name={"is_primary_key"}
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  scale-125"
                  onChange={(e) => handleCheckBox(e, index)}
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
  );
};

export default MappingAdd;
