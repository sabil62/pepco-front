import React, { useState, useEffect } from "react";
import { uploadFiles } from "../../../utils/api/api/fileAPI";
import Comparison from "../comparison/comparison";

const Test = () => {
  const [formData, setFormData] = useState();

  useEffect(() => {
    console.log({
      id: 32,
      title: "Old shrink",
      file: "http://127.0.0.1:8000/media/excel/panda/old_Shrink_Mismatch_Report.xlsx",
      header: {},
      category: 4,
    });

    console.log({
      id: 32,
      title: "Old shrink",
      file: "http://127.0.0.1:8000/media/excel/panda/old_Shrink_Mismatch_Report.xlsx",
      header: {},
      category: 4,
    });
  }, []);

  const handleFileChange = async (e) => {
    let fileContent = e.target.files[0];
    console.log(fileContent);
    let title = fileContent.name;
    let forD = [
      {
        client_name: "Client second",
        client_alias: "alias",
        title,
        file: fileContent,
      },
      {
        client_name: "second",
        client_alias: "second alias",
        title: "second title",
        file: fileContent,
      },
    ];

    setFormData(forD);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      let resp = await uploadFiles({ formData: formData });
      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Comparison />
      <div className="text-5xl font-bold text-center mt-[120px]">TEST</div>
      <form encType="multipart/form-data">
        <input
          type="file"
          name="files"
          id="filing"
          onChange={(e) => handleFileChange(e)}
        />
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-orange-200 py-3 px-7 rounded-lg"
        >
          SUBMIT
        </button>
      </form>
      <form class="max-w-sm mx-auto">
        <label for="underline_select" class="sr-only">
          Underline select
        </label>
        <select
          id="small"
          class="form-select appearance-none pr-8 pl-2 bg-no-repeat block outline outline-neutral-700 w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option selected>Choose a country</option>
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="FR">France</option>
          <option value="DE">Germany</option>
        </select>
      </form>
    </>
  );
};

export default Test;

// import React, { useState, useEffect } from "react";
// import {
//   Button,
//   Grid,
// } from "../../../../components/tailwind/tailwind_variable";
// import Container from "../../../../layout/container/container";
// import { returnKeyDataFromArr } from "../../../../components/functions/functions";
// import MappingTable from "../mapping_comp/mappingTable";

// const MappingAdd = () => {
//   const [apiData, setApiData] = useState();
//   const [minimumKey, setMinimumKey] = useState([]);
//   const [maximumKey, setMaximumKey] = useState([]);

//   const tempVar = {
//     id: 5,
//     source: "test",
//     source_columns: ["firstname", "secondname", "salary"],
//     dest: "test1",
//     dest_columns: ["firstname", "lastname", "salary"],
//     primary_key: ["firstname"],
//     project: 19,
//   };

//   useEffect(() => {
//     //all inside fetchdata
//     setApiData(tempVar);
//     const arrLength = returnKeyDataFromArr({
//       firstArr: tempVar?.source_columns, //replace tempVar with apiData
//       secondArr: tempVar?.dest_columns,
//     });
//     // console.log(arrLength);
//     setMinimumKey(arrLength[1]);
//     setMaximumKey(arrLength[0]);
//   }, []);

//   useEffect(() => {
//     console.log(apiData);
//   }, [apiData]);

//   const handleDragData = (key, updatedArr) => {
//     // console.log(key);
//     setApiData((prevData) => {
//       return {
//         ...prevData,
//         [key]: updatedArr,
//       };
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // console.log("submit");
//     console.log(apiData);
//   };

//   return (
//     <Container className="bg-[#F4F5FA] min-h-screen pt-3 mt-6">
//       <form onSubmit={handleSubmit}>
//         <Grid>
//           <div className="col-span-8 text-2xl font-medium mt-7 mb-3">
//             Client Name: System 1
//           </div>
//           <div className="md:col-span-10 pt-3 lg:col-span-2 flex justify-center items-center">
//             <Button type="submit">Submit</Button>
//           </div>
//         </Grid>

//         {/* grid  */}
//         <Grid grid12>
//           <div className="col-span-1">
//             <div className="font-medium mt-6 ml-3">Join Key</div>
//             {minimumKey?.map((item, key) => (
//               <div
//                 key={item + key}
//                 className="h-16 mt-9 w-16 border-2 border-slate-200 bg-gray-50 rounded-md flex justify-center items-center hover:bg-gray-50 cursor-pointer"
//               >
//                 <input
//                   type="checkbox"
//                   name={"is_primary_key"}
//                   class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  scale-125"
//                   // onChange={(e) => handleCheckBox(e, index)}
//                 />
//               </div>
//             ))}
//           </div>
//           <div className="col-span-4">
//             <div className="text-xl font-medium mt-6 text-center">
//               {apiData?.source}
//             </div>

//             {apiData?.source_columns && (
//               <MappingTable
//                 arr={apiData.source_columns}
//                 onDragData={handleDragData}
//                 keyName="source_columns"
//               />
//             )}
//           </div>
//           <div className="col-span-4">
//             <div className="text-xl font-medium mt-6 text-center">
//               {apiData?.dest}
//             </div>
//             {apiData?.dest_columns && (
//               <MappingTable
//                 arr={apiData.dest_columns}
//                 onDragData={handleDragData}
//                 keyName="dest_columns"
//               />
//             )}
//           </div>
//           <div className="col-span-3">
//             <div className="text-lg font-medium mt-6 text-center ">
//               DataType
//             </div>
//             {maximumKey?.length > 0 &&
//               maximumKey.map((item, i) => (
//                 <div key={item + i}>
//                   <select
//                     id="datatype"
//                     className="mt-8 mb-[44px] bg-gray-50 border border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-5 py-4 outline-neutral-700"
//                     //   onChange={(e) => handleSelect(e, i)}
//                   >
//                     <option value="" disabled selected>
//                       Select an option
//                     </option>
//                     <option value="String">String</option>
//                     <option value="long">Long</option>
//                     <option value="float">Float</option>
//                   </select>
//                 </div>
//               ))}
//           </div>
//         </Grid>
//       </form>
//     </Container>
//   );
// };

// export default MappingAdd;
