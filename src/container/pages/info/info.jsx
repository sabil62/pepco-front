import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import Container from "../../../layout/container/container";
import { getAllProject } from "../../../utils/api/api/projectAPI";
import { getAllFile } from "../../../utils/api/api/fileAPI";
import Modal from "../../../components/modal/modal";
import Project from "../project/project";

const Info = () => {
  const navigate = useNavigate();

  const [apiData, setApiData] = useState([]);
  const [isModal, setIsModal] = useState(false);

  const mapName = async () => {
    try {
      // Fetch all projects
      let resp = await getAllProject();
      if (resp?.status === 200) {
        let projectData = resp.data;

        // Fetch all file IDs with their corresponding names
        let resp2 = await getAllFile();
        let mappedFileNameObj = {};
        if (resp2?.status === 200) {
          let fileData = resp2.data;
          fileData.forEach((item) => {
            mappedFileNameObj[item.id] = item.title;
          });
        }

        let tempData = [...projectData];
        for (let i = 0; i < tempData.length; i++) {
          let firstID = tempData[i].excel_files[0];
          let secondID = tempData[i].excel_files[1];

          tempData[i].excel_files[0] = mappedFileNameObj[firstID];
          tempData[i].excel_files[1] = mappedFileNameObj[secondID];
        }

        setApiData(tempData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    mapName();
  }, []);

  const action = (index) => (
    <div>
      <div
        className="font-medium text-blue-600  hover:underline cursor-pointer"
        onClick={() => handleEdit(index)}
      >
        Run
      </div>
    </div>
  );

  const handleEdit = (index) => {
    console.log(apiData[index]);
    // apiData[index]
    navigate("/logic/compform", {
      state: { projectId: apiData[index].id, title: apiData[index].title },
    });
  };

  const handleAdd = () => {
    setIsModal(true);
    // navigate("/logic/compform");
  };

  const handleModalFalse = () => {
    setIsModal(false);
  };

  return (
    <Container classInfo="bg-[#FFFEF9] min-h-[700px]">
      <Modal
        title="Add Project"
        component={
          <Project handleModalFalse={handleModalFalse} fetchNewData={mapName} />
        }
        isModal={isModal}
        onModalClick={handleModalFalse}
      />
      <div className="text-[1.24rem] mt-4 mb-6 font-medium">
        Client Observability Information
      </div>
      <div className="flex">
        <div
          onClick={handleAdd}
          className="ml-auto cursor-pointer mb-3 rounded-lg py-2 text-indigo-500 w-[100px] text-center font-medium text-xl transition ease-out hover:bg-indigo-500 hover:text-white border border-2 border-indigo-500 "
        >
          + Add
        </div>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-auto w-[940px] ">
        <table classNameName="text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-lg text-gray-700 uppercase bg-gray-50  ">
            <tr>
              <th scope="col" className="px-12 py-3 text-left">
                Project Name
              </th>
              <th scope="col" className="px-12 py-3 w-[220px] text-left">
                File 1
              </th>
              <th scope="col" className="px-12 py-3 w-[220px] text-left">
                File 2
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

                  <td className="px-12 py-4 w-[240px]">{c.excel_files[0]}</td>
                  <td className="px-12 py-4 w-[240px]">{c.excel_files[1]}</td>
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
