import Modal from "../../../components/modal/modal";
import SureFunc from "../../../components/modal/sureFunc/surefunc";
import Container from "../../../layout/container/container";
import React, { useState, useEffect } from "react";

const Terminal = () => {
  const [isModal, setIsModal] = useState(false);

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
        <form className="mt-12">
          <div className="border border-gray-200 rounded-lg">
            <div className="text-[1.32rem] px-5 py-3 bg-gray-50 border-b rounded-t-lg font-medium">
              Terminal
            </div>
            <div className=" border border-gray-200 rounded-lg bg-gray-50 mx-6 mt-4 mb-6">
              {/* <div  className="text-2xl px-4 py-4 border-b">
              Terminal
            </div> */}
              <div className="px-5 py-3 bg-white rounded-t-lg ">
                <textarea
                  id="query"
                  rows="4"
                  className="w-full px-0 rouned-md text-sm font-medium text-gray-900 bg-white border-0  h-[160px] focus:ring-0 outline-none"
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
