import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import Container from "../../../layout/container/container";

const Info = () => {
  const navigate = useNavigate();

  const [fileName, setFileName] = useState({});

  let tempD = [
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

  const [tempDynamicData, setTempDynamicData] = useState([]);

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

  const idToTitle = () => {
    let tempData = [...tempDynamicData];
    console.log(tempData.length);
    for (let i = 0; i < tempData.length; i++) {
      let firstID = tempData[i].excel_files[0];
      let secondID = tempData[i].excel_files[1];

      tempData[i].excel_files[0] = fileName[firstID];
      tempData[i].excel_files[1] = fileName[secondID];
    }
    console.log(tempData);
    setTempDynamicData(tempData);
  };

  useEffect(() => {
    console.log(tempDynamicData);
    if (Object.keys(fileName)?.length > 0) {
      idToTitle();
    }
  }, [fileName]);

  useEffect(() => {
    setTempDynamicData(tempD);

    const mapName = () => {
      let mappedFileNameObj = {};
      if (fakeExcelData) {
        //if resp
        fakeExcelData.forEach((item) => {
          mappedFileNameObj[item.id] = item.title;
        });
      }
      console.log(mappedFileNameObj);
      if (Object.keys(mappedFileNameObj).length > 0) {
        setFileName(mappedFileNameObj); //{0:"one one",21:"two"}
        // idToTitle();
      }
    };
    mapName();
    // idToTitle();

    // make this async func
  }, []);

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
              {tempDynamicData?.length > 0 &&
                tempDynamicData.map((c, i) => (
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
    </>
  );
};

export default Info;
