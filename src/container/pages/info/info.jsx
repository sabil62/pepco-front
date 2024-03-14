import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import Container from "../../../layout/container/container";
import { getAllFile, getAllProject } from "../../../utils/api/api/projectAPI";

const Info = () => {
  const navigate = useNavigate();

  const [fileName, setFileName] = useState({});
  const [apiData, setApiData] = useState([]);

  const idToTitle = () => {
    let tempData = [...apiData];
    for (let i = 0; i < tempData.length; i++) {
      let firstID = tempData[i].excel_files[0];
      let secondID = tempData[i].excel_files[1];

      tempData[i].excel_files[0] = fileName[firstID];
      tempData[i].excel_files[1] = fileName[secondID];
    }
    // this needed to uncommented what logic?
    // setApiData(tempData);
  };

  useEffect(() => {
    if (Object.keys(fileName)?.length > 0) {
      idToTitle();
    }
  }, [fileName]);

  useEffect(() => {
    // setApiData(tempD);

    const mapName = async () => {
      // get all project
      let resp = await getAllProject();
      if (resp?.status === 200) {
        setApiData(resp.data);
      }

      //get all file id with name
      let resp2 = await getAllFile();
      let mappedFileNameObj = {};
      if (resp2?.status === 200) {
        let fileData = resp2.data;
        fileData.forEach((item) => {
          mappedFileNameObj[item.id] = item.title;
        });
      }

      if (Object.keys(mappedFileNameObj).length > 0) {
        setFileName(mappedFileNameObj); //{0:"one one",21:"two"}
      }
    };
    mapName();

    // make this async func
  }, []);

  const action = (index) => (
    <div>
      <div
        className="font-medium text-blue-600  hover:underline cursor-pointer"
        onClick={() => handleEdit(index)}
      >
        Edit
      </div>
    </div>
  );

  const handleEdit = (index) => {
    console.log(apiData[index]);
    // apiData[index]
    navigate("/logic/compform", { state: { projectId: apiData[index].id } });
  };

  // const handleAdd = () => {
  //   navigate("/logic/compform");
  // };
  return (
    <Container classInfo="bg-[#FFFEF9] min-h-[700px]">
      <div className="text-[1.24rem] mt-4 mb-6 font-medium">
        Client Observability Information
      </div>
      {/* <div className="flex">
          <div
            onClick={handleAdd}
            className="ml-auto cursor-pointer mb-3 rounded-lg py-2 text-indigo-500 w-[100px] text-center font-medium text-xl transition ease-out hover:bg-indigo-500 hover:text-white border border-2 border-indigo-500 "
          >
            + Add
          </div>
        </div> */}

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-auto w-[940px] ">
        <table classNameName="text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-lg text-gray-700 uppercase bg-gray-50  ">
            <tr>
              <th scope="col" className="px-12 py-3 text-left">
                Project Name
              </th>
              <th scope="col" className="px-12 py-3 w-[220px] text-left">
                From Map
              </th>
              <th scope="col" className="px-12 py-3 w-[220px] text-left">
                To Map
              </th>
              <th scope="col" className="px-12 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {apiData?.length > 0 &&
              apiData.map((c, i) => (
                <tr
                  className="odd:bg-white even:bg-gray-50 border-b text-md text-left"
                  key={i}
                >
                  <td
                    scope="row"
                    className="px-12 py-4 whitespace-nowrap w-[300px]"
                  >
                    {c.title}
                  </td>

                  <td className="px-12 py-4 w-[220px]">{c.excel_files[0]}</td>
                  <td className="px-12 py-4 w-[220px]">{c.excel_files[1]}</td>
                  <td className="px-12 py-4">{action(i)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
};

export default Info;
