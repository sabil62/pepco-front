import React, { useEffect, useState } from "react";

import { Button, Grid } from "../../../components/tailwind/tailwind_variable";
import { getAllFile } from "../../../utils/api/api/fileAPI";
import { postProject } from "../../../utils/api/api/projectAPI";
import AddProject from "./addproject/addProject";
import MappingAdd from "../mapping/mappinglogic/mappingAdd";

const Project = () => {
  const [isAddProject, setIsAddProject] = useState(true);

  return isAddProject === true ? <AddProject /> : <MappingAdd />;
};

export default Project;
