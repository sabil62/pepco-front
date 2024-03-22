import { useLocation } from "react-router-dom";
import Modal from "../../../components/modal/modal";
import SureFunc from "../../../components/modal/sureFunc/surefunc";
import Container from "../../../layout/container/container";
import React, { useState, useEffect } from "react";
import {
  getTerminalInfo,
  runTerminalSQL,
  saveTerminalSQL,
} from "../../../utils/api/api/terminalAPI";
import SqlDisplay from "../sql_display/sqlDisplay";
import { exportToExcel } from "../../../components/functions/fileFunctions";
import { getAllMapping } from "../../../utils/api/api/mapAPI";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Terminal = () => {
  const [isModal, setIsModal] = useState(false);
  const [terminalTitle, setTerminalTitle] = useState();
  const [sqlQuery, setSqlQuery] = useState();
  const [projectId, setProjectId] = useState();
  const [sqlResult, setSqlResult] = useState();

  const location = useLocation();

  useEffect(() => {
    console.log(location.state);
    let locId = location?.state?.projectId;
    const fetchTerminalData = async ({ id }) => {
      try {
        let resp = await getTerminalInfo({ id });
        // console.log(resp);
        if (resp.status === 200 || resp.status === 201) {
          setTerminalTitle(resp.data.title);
          setSqlQuery(resp.data.sql_query);
          console.log("Success");
        }
      } catch (error) {
        throw error;
      }
    };

    if (locId) {
      setProjectId(locId);
      fetchTerminalData({ id: locId });
    }
  }, []);

  const handleModalFalse = () => {
    setIsModal(false);
  };
  const handleModalTrue = (e) => {
    e.preventDefault();
    setIsModal(true);
  };
  const handleSaveQuery = async () => {
    console.log("Fd");
    const toastId = toast.info("Loading", {
      autoClose: 3000,
      position: "top-center",
      className: "margin-offset",
    });
    try {
      let respMapping = await getAllMapping();
      let mappingId, mappingInfo;
      if (respMapping.data) {
        mappingInfo = respMapping.data.filter(
          (item) => item.project === projectId
        );
        mappingId = mappingInfo[0].id;
      }
      console.log(mappingId, mappingInfo);

      let header = {
        mapping: mappingId,
        sql_query: sqlQuery,
      };

      let respSql = await saveTerminalSQL({ id: mappingId, header: header });
      if (respSql.status === 200 || respSql.status === 201) {
        console.log(respSql);
        console.log("SUCCESS");
        toast.update(toastId, {
          render: "Successfully Updated",
          type: "success",
          autoClose: 2000,
          className: "rotateY animated",
        });
        setTimeout(() => {
          setIsModal(false);
        }, 1600);
      }
    } catch (error) {
      toast.update(toastId, {
        render: "Error occurred",
        type: "error",
        autoClose: 3000,
        className: "rotateY animated",
      });
      console.log(error);
    }
  };
  const handleSqlQuery = (e) => {
    let newSqlQuery = e.target.value;
    setSqlQuery(newSqlQuery);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let headerInfo = {
        sql_query: sqlQuery,
        project_id: projectId,
      };
      console.log(headerInfo);

      let resp = await runTerminalSQL({ header: headerInfo });
      if (resp.status === 200 || resp.status === 201) {
        console.log(resp.data);
        let resultQuery = resp.data;
        let parsedJSON = JSON.parse(resultQuery);
        setSqlResult(parsedJSON);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ToastContainer className="margin-offset" />
      {/* <div className="text-2xl mt-6 text-center">Terminal</div> */}
      <Modal
        title="Warning"
        component={
          <SureFunc handleNo={handleModalFalse} handleYes={handleSaveQuery} />
        }
        isModal={isModal}
        onModalClick={handleModalFalse}
      />
      <Container>
        <form className="mt-12 mb-6" onSubmit={handleSubmit}>
          <div className="border border-gray-200 rounded-lg">
            <div className="text-[1.32rem] px-5 py-3 bg-gray-50 border-b rounded-t-lg font-medium">
              Terminal{" "}
              <span className="text-[1.12rem]">
                {terminalTitle && (
                  <>
                    <span> - </span>
                    <span className="underline"> {terminalTitle}</span>
                  </>
                )}
              </span>
            </div>
            <div className=" border border-gray-200 rounded-lg bg-gray-50 mx-6 mt-4 mb-6">
              {/* <div  className="text-2xl px-4 py-4 border-b">
              Terminal
            </div> */}
              <div className="px-5 py-3 bg-white rounded-t-lg ">
                <textarea
                  id="query"
                  rows="5"
                  value={sqlQuery}
                  onChange={handleSqlQuery}
                  className="w-full px-0 rouned-md text-sm font-medium text-gray-900 bg-white border-0  h-[180px] focus:ring-0 outline-none"
                  placeholder="Paste Your Query..."
                  required
                />
              </div>
              <div className="flex items-center justify-end px-3 py-3 border-t ">
                <button
                  className="inline-flex items-center py-2.5 px-6 mr-3 text-[1rem] font-medium text-center text-blue-700 border border-2 border-blue-700  rounded-lg focus:ring-4 focus:ring-blue-200  hover:bg-blue-600 hover:text-white transfrom ease-out"
                  onClick={(e) => handleModalTrue(e)}
                >
                  Save Query
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center py-2.5 px-6 mr-3 text-[1rem] font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200  hover:bg-blue-800"
                >
                  Run Query
                </button>
              </div>
            </div>
          </div>
        </form>
        {/* ---------- */}
        {sqlResult && (
          <>
            <div className="flex justify-between items-center">
              <div className="text-[1.32rem] mb-3 mt-6 font-medium inline-block">
                Result:
              </div>
              <button
                className="inline-block h-12 py-2 px-6 mr-3 text-[1rem] font-medium text-center text-blue-700 border border-2 border-blue-700  rounded-lg focus:ring-4 focus:ring-blue-200  hover:bg-blue-600 hover:text-white transfrom ease-out"
                onClick={() => exportToExcel(sqlResult, terminalTitle)}
              >
                Download
              </button>
            </div>

            <SqlDisplay queryData={sqlResult} />
          </>
        )}
      </Container>
    </>
  );
};

export default Terminal;
