import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Button,
  Grid,
} from "../../../../components/tailwind/tailwind_variable";
import { getAllFile } from "../../../../utils/api/api/fileAPI";
import { postProject } from "../../../../utils/api/api/projectAPI";

const AddProject = ({ handleNext, addProjectId }) => {
  const [fileInfo, setFileInfo] = useState();
  const [projectInfo, setProjectInfo] = useState({
    projectName: "",
    file1: "",
    file2: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(projectInfo);
    //--------------
    if (
      projectInfo?.projectName !== "" &&
      projectInfo?.file1 !== "" &&
      projectInfo?.file2 !== ""
    ) {
      if (projectInfo?.file1 !== projectInfo?.file2) {
        let headerInfo = {
          title: projectInfo?.projectName,
          excel_files: [
            parseInt(projectInfo?.file1),
            parseInt(projectInfo?.file2),
          ],
        };
        console.log(headerInfo);
        let resp = await postProject({ headers: headerInfo });
        console.log(resp);
        if (resp.status === 200 || resp.status === 201) {
          //change logic here ppbb
          let id = resp?.data?.id;
          console.log(resp.data);
          addProjectId(id);
          toast.success("Success! Proceding to add Mapping", {
            position: "top-center",
            autoClose: 1600,
            draggable: false,
            closeButton: false,
          });
          setTimeout(() => {
            handleNext();
          }, 2600);

          // console.log("SUCCESS");
        }
      } else {
        toast.error("Error, File1 and File2 should be different", {
          position: "top-center",
        });
        // console.log("File1 and File 2 should be different");
      }

      //------------------
    } else {
      toast.error("Error, please fill all fields", {
        position: "top-center",
      });
      console.log("ERROR, please fill all fields");
    }
  };

  useEffect(() => {
    const fetchFileInfo = async () => {
      let resp = await getAllFile();
      if (resp.status === 200) {
        setFileInfo(resp.data);
      }
    };

    fetchFileInfo();
  }, []);

  const handleInput = (e, key) => {
    // console.log(key, e.target.value);
    e.preventDefault();
    setProjectInfo((prevState) => {
      return { ...prevState, [key]: e.target.value };
    });
  };

  return (
    <>
      {/* <ToastContainer /> */}
      <form onSubmit={(e) => handleSubmit(e)} className="w-[510px]">
        <Grid grid12>
          <div className="col-span-12 mx-6 mt-6">
            <div>
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-900"
              >
                Project Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Enter Project Name"
                value={projectInfo?.projectName}
                onChange={(e) => handleInput(e, "projectName")}
                required
              />
            </div>
          </div>
          <div className="col-span-6 my-1 ml-6">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              File 1
            </label>
            <select
              onChange={(e) => handleInput(e, "file1")}
              id="source_excel"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
            >
              <option disabled selected value="">
                Select File
              </option>

              {fileInfo?.map((item, ind) => (
                <option key={ind} value={item.id}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>
          <div className="col-span-6 my-1 mr-6">
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-900"
            >
              File 2
            </label>
            <select
              onChange={(e) => handleInput(e, "file2")}
              id="destination_excel"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
            >
              <option disabled selected value="">
                Select File
              </option>
              {fileInfo?.map((item, ind) => (
                <option key={ind} value={item.id}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>
          {/* <div className="col-span-6"></div> */}

          <div className="col-span-12 mx-left flex justify-end mr-6 mb-6 mt-1">
            <Button blue type="submit">
              <svg
                class="me-1 -ms-1 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              Add new project
            </Button>
          </div>
        </Grid>
        {/* <div className="h-20">lion</div> */}
      </form>
    </>
  );
};

export default AddProject;
