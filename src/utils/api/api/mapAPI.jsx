import { axiosInstance } from "../axiosInstance";

export const getAllMapping = async () => {
  try {
    let resp = await axiosInstance.get(`/api/mapping/`);
    if (resp.status === 200) {
      console.log(resp);
      return resp;
    }
  } catch (error) {
    throw error;
  }
};

//post mapping api
//update mapping api
export const updateMapping = async ({ id, header }) => {
  // console.log(id, header);
  try {
    let resp = await axiosInstance.put(`/api/mapping/${id}/`, header);
    if (resp.status === 200) {
      console.log(resp);
      return resp;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const postMapping = async ({ header }) => {
  // console.log(id, header);
  try {
    let resp = await axiosInstance.post("/api/mapping/", header);
    if (resp.status === 200 || resp.status === 201) {
      // console.log(resp);
      return resp;
    }
  } catch (error) {
    // console.log(error);
    throw error;
  }
};
