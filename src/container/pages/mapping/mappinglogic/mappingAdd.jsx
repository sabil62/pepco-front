import React, { useState, useEffect } from "react";
import {
  Button,
  Grid,
} from "../../../../components/tailwind/tailwind_variable";
// import Container from "../../../../layout/container/container";
import {
  extractFilenameFromURL,
  returnKeyDataFromArr,
} from "../../../../components/functions/functions";
import MappingTable from "../mapping_comp/mappingTable";
import { getProject } from "../../../../utils/api/api/projectAPI";
import { getFile } from "../../../../utils/api/api/fileAPI";
import { getAllClient } from "../../../../utils/api/api/clientAPI";
import { postMapping } from "../../../../utils/api/api/mapAPI";
import { useNavigate } from "react-router-dom";
import { applyMax } from "../../../../components/functions/parseFunctions";
import Container from "../../../../layout/container/container";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MappingAdd = ({
  projectId,
  handleModalFalse,
  fetchNewData,
  isModal = true,
}) => {
  const [apiData, setApiData] = useState();
  const [minimumKey, setMinimumKey] = useState([]);
  const [maximumKey, setMaximumKey] = useState([]);
  const [file1Title, setFile1Title] = useState();
  const [file2Title, setFile2Title] = useState();

  const [titleName, setTitleName] = useState();

  const [checkboxIndex, setCheckBoxIndex] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    console.log(projectId, "MapingAdd");
    if (projectId) {
      let currentProjectInfo = {};
      let fileInfoFirst = {};
      let fileInfoSecond = {};
      let submitTemplate = {};

      const fetchAllData = async () => {
        try {
          //-----1st first API of project Information (get tilte of project and mapped excel_file id)
          let resp = await getProject({ id: projectId });
          console.log(resp);
          if (resp.status === 200) {
            // console.log(resp.data);
            currentProjectInfo = resp.data;
            setTitleName(currentProjectInfo.title);
          }
          //client Info
          let respClient = await getAllClient();
          if (respClient.status === 200) {
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
          }

          let fileName_1 = extractFilenameFromURL(String(fileInfoFirst.file));
          let fileName_2 = extractFilenameFromURL(String(fileInfoSecond.file));
          console.log(fileInfoFirst, fileInfoSecond);
          setFile1Title(fileName_1.title);
          setFile2Title(fileName_2.title);

          console.log(fileName_1, fileName_2, typeof fileName_1);

          submitTemplate = {
            file1: fileName_1,
            // file1_columns: Object.keys(fileInfoFirst.header).map((c)=>c), //for keys
            file1_columns: Object.keys(fileInfoFirst.header).map(
              (c) => fileInfoFirst.header[c]
            ),
            file2: fileName_2,
            file2_columns: Object.keys(fileInfoSecond.header).map(
              (c) => fileInfoSecond.header[c]
            ),
            project: projectId,
            primary_key: [],
          };

          console.log(submitTemplate);
          setApiData(submitTemplate);

          //min and max key
          const arrLength = returnKeyDataFromArr({
            firstArr: submitTemplate?.file1_columns, //replace tempVar with apiData
            secondArr: submitTemplate?.file2_columns,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("submit");
    let submitData = { ...apiData };
    let checkArr = [...checkboxIndex];

    let source_col = [...apiData["file1_columns"]];

    let primaryCol = checkArr.map((item) => source_col[item]);

    submitData["join_on"] = primaryCol;
    submitData["file1_columns"] = applyMax(apiData.file1_columns, maximumKey);
    submitData["file2_columns"] = applyMax(apiData.file2_columns, maximumKey);

    console.log(submitData);
    //now post this
    setApiData(submitData);

    try {
      let resp = await postMapping({ header: submitData });
      if (resp.status === 200 || resp.status === 201) {
        console.log(resp);
        toast.success("Successfully added Mapping!", {
          position: "top-center",
        });
        setTimeout(() => {
          //modal off
          if (isModal === true) {
            fetchNewData();
            handleModalFalse();
          } else {
            navigate("/logic");
          }
        }, 1700);
      }
    } catch (error) {
      toast.error("Error", {
        position: "top-center",
      });
      console.log(error);
    }
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

  let innerJsx = (
    <div className=" px-8  ">
      <ToastContainer className="margin-offset" />
      <div className="text-[4px]">Mapping Add</div>
      <form onSubmit={handleSubmit}>
        <Grid>
          <div className="col-span-8 text-2xl font-medium mt-7 mb-3">
            {titleName && titleName}
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
            {isModal === true ? (
              <div className="text-[1.06rem] font-medium mt-6 text-center">
                {file1Title ? file1Title : apiData?.file1}
              </div>
            ) : (
              <div className="text-[1.14rem] font-medium mt-6 text-center">
                {file1Title ? file1Title : apiData?.file1}
              </div>
            )}

            {apiData?.file1_columns && (
              <MappingTable
                arr={apiData.file1_columns}
                onDragData={handleDragData}
                keyName="file1_columns"
              />
            )}
          </div>
          <div className="col-span-4">
            {isModal === true ? (
              <div className="text-[1.06rem] font-medium mt-6 text-center">
                {file2Title ? file2Title : apiData?.file2}
              </div>
            ) : (
              <div className="text-[1.14rem] font-medium mt-6 text-center">
                {file2Title ? file2Title : apiData?.file2}
              </div>
            )}
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
    </div>
  );

  return projectId ? (
    isModal === true ? (
      <div className="w-[1280px] overflow-y-scroll max-h-[690px]">
        {/* <Container className="bg-[#F4F5FA] min-h-screen pt-3 mt-6"> */}
        {innerJsx}
      </div>
    ) : (
      <Container className="bg-[#F4F5FA] min-h-screen pt-3 mt-6">
        {innerJsx}
      </Container>
    )
  ) : (
    <div className="text-2xl font-medium mt-16 text-center">
      Please Select Project (Home) inorder to add Mapping
    </div>
  );
};

export default MappingAdd;
