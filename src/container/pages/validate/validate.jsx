import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getValidate } from "../../../utils/api/api/validateAPI";
import Container from "../../../layout/container/container";
import { Button } from "../../../components/tailwind/tailwind_variable";
import * as XLSX from "xlsx";

const Validate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [index_df, setIndex_df] = useState();
  const [index_info, setIndex_info] = useState();

  const handleValidate = async (id) => {
    try {
      let resp = await getValidate(id);
      console.log(resp);
      if (resp.status === 200 || resp.status === 201) {
        let crudeDjangoObj = resp.data;
        let parsedJSONindex_df = JSON.parse(crudeDjangoObj.index_df);
        let parsedJSONindex_info = JSON.parse(crudeDjangoObj.index_info);
        console.log(parsedJSONindex_df, parsedJSONindex_info);
        // setValidateApiData(parsedJSON);
        setIndex_df(parsedJSONindex_df);
        setIndex_info(parsedJSONindex_info);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const exportToExcel = (data, filename) => {
    if (data) {
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

      XLSX.writeFile(workbook, `${filename}.xlsx`, {
        bookType: "xlsx",
        type: "binary",
      });
    }
  };

  useEffect(() => {
    console.log(location.state); //{projectId: 34, title: 'New Project'}
    handleValidate(location?.state?.projectId);
  }, []);
  return (
    <>
      <div className="text-2xl text-center m-6 font-medium">
        Validate Project {location?.state?.projectId}
      </div>
      {index_df ? (
        <Container>
          <div className="flex justify-end mb-4">
            <Button blueBig>Save</Button>
            <Button
              blueBig
              onClick={() => exportToExcel(index_df, location?.state?.title)}
            >
              Download
            </Button>
          </div>
          <div class="overflow-x-auto">
            <table className=" table-auto  min-w-full text-sm text-left shadow-sm border border-2">
              <thead className="bg-gray-50 text-gray-600 font-medium border-b ">
                <tr className="divide-x odd:bg-gray-50 even:bg-white">
                  {index_df?.length > 0 &&
                    Object.keys(index_df[0])?.map((item, key) => (
                      <th key={key} className="py-4 px-6">
                        {item}
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody className="text-gray-600 divide-y">
                {index_df &&
                  index_df.map((item, idx) => (
                    <tr
                      key={idx}
                      className="divide-x odd:bg-gray-50 even:bg-white"
                    >
                      {Object.keys(index_df[idx])?.map((key, ind) => (
                        <td
                          key={ind}
                          className="px-6 font-medium pt-6 pb-4 whitespace-nowrap "
                        >
                          {item[key]}
                        </td>
                      ))}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </Container>
      ) : (
        ""
      )}
    </>
  );
};

export default Validate;
