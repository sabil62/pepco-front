import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getValidate, postIndex } from "../../../utils/api/api/validateAPI";
import Container from "../../../layout/container/container";
import { Button } from "../../../components/tailwind/tailwind_variable";

import SqlDisplay from "../sql_display/sqlDisplay";
import { exportToExcel } from "../../../components/functions/fileFunctions";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Validate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [projectId, setProjectId] = useState();
  const [index_df, setIndex_df] = useState();
  const [index_info, setIndex_info] = useState();
  const [error, setError] = useState();

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
      setError("Not found proper mapping ");
      console.log(error);
    }
  };

  const handleSave = async () => {
    const toastId = toast.info("Loading", {
      autoClose: 3000,
      position: "top-center",
      className: "margin-offset",
    });
    let headers = {
      project: projectId,
      index_file: index_df,
      config_file: index_info,
    };
    console.log(headers);
    try {
      let resp = await postIndex({ header: headers });
      if (resp.status === 200 || resp.status === 201) {
        console.log(resp);
        toast.update(toastId, {
          render: "Successfully Added Index",
          type: "success",
          autoClose: 2000,
          className: "rotateY animated",
        });
        console.log("SUCCESS");
      }
    } catch (error) {
      toast.update(toastId, {
        render: "Error occurred",
        type: "error",
        autoClose: 3000,
        className: "rotateY animated",
      });
    }
  };

  useEffect(() => {
    setProjectId(location?.state?.projectId);
    console.log(location.state); //{projectId: 34, title: 'New Project'}
    handleValidate(location?.state?.projectId);
  }, []);
  return (
    <>
      <ToastContainer className="margin-offset" />
      <div className="text-2xl text-center m-6 font-medium">
        {error ? `${error}` : `Validate Project -  ${location?.state?.title}`}
      </div>
      {index_df ? (
        <Container>
          <div className="flex justify-end mb-4">
            <Button blueBig onClick={handleSave}>
              Generate Index
            </Button>
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
