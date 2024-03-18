import React, { useEffect, useState } from "react";

import AddProject from "./addproject/addProject";
import MappingAdd from "../mapping/mappinglogic/mappingAdd";

const Project = ({ handleModalFalse, fetchNewData }) => {
  const [isAddProject, setIsAddProject] = useState(true);
  const [projectId, setProjectId] = useState();

  useEffect(() => {
    console.log(projectId);
  }, [projectId]);

  useEffect(() => {
    setIsAddProject(true);
  }, []);

  const addProjectFalse = () => {
    setIsAddProject(false);
  };

  const addProjectId = (id) => {
    setProjectId(id);
  };

  return isAddProject === true ? (
    <AddProject handleNext={addProjectFalse} addProjectId={addProjectId} />
  ) : (
    <MappingAdd
      projectId={projectId}
      handleModalFalse={handleModalFalse}
      fetchNewData={fetchNewData}
      isModal={true}
    />
  );
};

export default Project;
