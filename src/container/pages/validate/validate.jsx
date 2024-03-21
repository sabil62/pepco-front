import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getValidate } from "../../../utils/api/api/validateAPI";
import Container from "../../../layout/container/container";
import { Button } from "../../../components/tailwind/tailwind_variable";

import SqlDisplay from "../sql_display/sqlDisplay";
import { exportToExcel } from "../../../components/functions/fileFunctions";

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
          <SqlDisplay queryData={index_df} />
        </Container>
      ) : (
        ""
      )}
    </>
  );
};

export default Validate;
