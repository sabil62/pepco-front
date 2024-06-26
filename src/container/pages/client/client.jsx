import { useNavigate } from "react-router-dom";
import {
  Grid,
  GridOffset,
} from "../../../components/tailwind/tailwind_variable";
import { postClient } from "../../../utils/api/api/clientAPI";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Client = () => {
  const [clientName, setClientName] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setClientName(e.target.value);
  };

  const handlSubmit = (e) => {
    e.preventDefault();
    const toastId = toast.info("Loading", {
      autoClose: 3000,
      position: "top-center",
      className: "margin-offset",
    });

    const clientAPI = async () => {
      try {
        let header = {
          name: clientName,
        };
        if (clientName) {
          let resp = await postClient({ header });
          if (resp.status === 200 || resp.status === 201) {
            toast.update(toastId, {
              render: "Successfully Added Client",
              type: "success",
              autoClose: 2000,
              className: "rotateY animated",
            });
          }
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
    clientAPI();
  };

  return (
    <>
      <ToastContainer className="margin-offset" />
      <Grid grid12>
        <GridOffset one />
        <div className="col-span-10 flex justify-center item-center mt-14">
          <div className="p-6 w-[600px] bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-50 ">
            <div className="text-[1.3rem] font-medium mb-4">
              Add Client Name
            </div>
            <form>
              <div className="grid grid-cols-12 gap-4">
                {" "}
                <div className="col-span-8">
                  {" "}
                  <div className="relative mb-6">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="36"
                        height="36"
                        fill="none"
                        viewBox="0 0 40 40"
                      >
                        <path
                          fill="#888"
                          d="M20 6.667A6.667 6.667 0 1120 20a6.667 6.667 0 010-13.334zm0 16.666c7.366 0 13.333 2.984 13.333 6.667v3.333H6.667V30c0-3.683 5.966-6.667 13.333-6.667z"
                        ></path>
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="input-group-1"
                      value={clientName}
                      onChange={(e) => handleChange(e)}
                      className="w-full bg-gray-50 border border-2 py-4 font-medium text-[1.12rem] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:outline-none focus:border-blue-500 block  ps-14 p-2.5 "
                      placeholder="New Client Name"
                      required
                    />
                  </div>
                </div>
                <div className="col-span-4">
                  <button
                    type="submit"
                    onClick={(e) => handlSubmit(e)}
                    className="w-full px-5 py-3 cursor-pointer text-white text-center font-medium text-[1.16rem] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg  "
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <GridOffset one />
      </Grid>
    </>
  );
};

export default Client;
