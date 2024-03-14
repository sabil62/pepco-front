import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getAllMapping } from "../../../utils/api/api/mapAPI";
import MappingEdit from "./mappinglogic/mappingEdit";
import MappingAdd from "./mappinglogic/mappingAdd";

const Mapping = () => {
  const [isEditPage, setIsEditPage] = useState();
  const [editMappingInfo, setEditMappingInfo] = useState({});

  const location = useLocation();

  useEffect(() => {
    console.log(location);
    let projectId = location?.state?.projectId;
    if (projectId) {
      const fetchMappingInfo = async () => {
        let associatedIndex = -1;

        let resp = await getAllMapping();
        if (resp.status === 200) {
          let allMappingInfo = resp.data;

          allMappingInfo.forEach((item, index) => {
            if (item.project === projectId) {
              associatedIndex = index;
              setEditMappingInfo(item);
            }
          });
        }

        console.log(associatedIndex, projectId);
        if (associatedIndex >= 0) {
          setIsEditPage(true);
          console.log("divert to edit page");
        } else {
          setIsEditPage(false);
          console.log("divert to add page");
        }
      };
      fetchMappingInfo();
    } else {
      setIsEditPage(false);
    }
  }, []);

  return isEditPage ? (
    isEditPage === true ? (
      <MappingEdit apiEditInfo={editMappingInfo} />
    ) : (
      <MappingAdd />
    )
  ) : null;
};

export default Mapping;
