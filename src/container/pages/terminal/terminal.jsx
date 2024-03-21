import { useLocation } from "react-router-dom";
import Modal from "../../../components/modal/modal";
import SureFunc from "../../../components/modal/sureFunc/surefunc";
import Container from "../../../layout/container/container";
import React, { useState, useEffect } from "react";
import {
  getTerminalInfo,
  runTerminalSQL,
} from "../../../utils/api/api/terminalAPI";

const Terminal = () => {
  const [isModal, setIsModal] = useState(false);
  const [terminalTitle, setTerminalTitle] = useState();
  const [sqlQuery, setSqlQuery] = useState();
  const [projectId, setProjectId] = useState();

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
  const handleSaveQuery = () => {
    console.log("Fd");
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
      console.log(resp);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* <div className="text-2xl mt-6 text-center">Terminal</div> */}
      <Modal
        title="Are you Sure?"
        component={
          <SureFunc handleNo={handleModalFalse} handleYes={handleSaveQuery} />
        }
        isModal={isModal}
        onModalClick={handleModalFalse}
      />
      <Container>
        <form className="mt-12" onSubmit={handleSubmit}>
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
      </Container>
    </>
  );
};

export default Terminal;
