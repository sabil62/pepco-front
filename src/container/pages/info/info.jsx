import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import Container from "../../../layout/container/container";

const Info = () => {
  const navigate = useNavigate();

  const [fileName, setFileName] = useState({});

  const fakeExcelData = [
    {
      id: 21,
      title: "twenty",
    },
    {
      id: 22,
      title: "two two",
    },
    {
      id: 24,
      title: "four",
    },
    {
      id: 25,
      title: "five two",
    },
  ];

  const tempDynamicData = [
    {
      id: 16,
      title: "Account Data Analysis",
      excel_files: [21, 22],
    },
    {
      id: 18,
      title: "test",
      excel_files: [21, 22],
    },
    {
      id: 19,
      title: "Logic Info pepco vs poundland",
      excel_files: [21, 22],
    },
    {
      id: 20,
      title: "binay testing(poundland vs pepco)",
      excel_files: [24, 25],
    },
  ];

  useEffect(() => {
    // make this async func
    const mapName = () => {
      let mappedFileNameObj = {};
      if (fakeExcelData) {
        //if resp
        fakeExcelData.forEach((item) => {
          mappedFileNameObj[item.id] = item.title;
        });
      }
      if (mappedFileNameObj.length > 0) {
        setFileName(mappedFileNameObj);
      }
    };
    mapName();
  });

  const action = (index) => (
    <div>
      <div
        className="font-medium text-blue-600  hover:underline"
        onClick={() => handleEdit(index)}
      >
        Edit
      </div>
    </div>
  );

  const handleEdit = (index) => {
    // navigate("/logic/compform", { state: { edit: true } });
    console.log(index);
  };

  // const handleAdd = () => {
  //   navigate("/logic/compform");
  // };
  return (
    <>
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
                {/* <th scope="col" className="px-12 py-3">
                  Client Alias
                </th> */}
                <th scope="col" className="px-12 py-3 w-[220px] text-left">
                  From_Map
                </th>
                <th scope="col" className="px-12 py-3 w-[220px] text-left">
                  To_Map
                </th>
                <th scope="col" className="px-12 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {tempDynamicData.map((c, i) => (
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
                  {/* <td className="px-12 py-4 w-[300px] text-center">
                    {c.client_alias}
                  </td> */}
                  <td className="px-12 py-4 w-[220px]">
                    {JSON.stringify(fileName) +
                      "[ " +
                      (c.excel_files.length > 0 ? c.excel_files[0] : "") +
                      " ]"}
                  </td>
                  <td className="px-12 py-4 w-[220px]">{c.excel_files[1]}</td>
                  <td className="px-12 py-4">{action(i)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </>
  );
};

export default Info;
