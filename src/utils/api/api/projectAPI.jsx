import { axiosInstance } from "../axiosInstance";

export const getAllProject = async () => {
  // http://127.0.0.1:8000/api/project/
  try {
    let resp = await axiosInstance.get("/api/project");
    console.log(resp);
    if (resp.status === 200) {
      return resp;
    }
  } catch (error) {
    throw error;
  }
};

export const getProject = async ({ id }) => {
  try {
    let resp = await axiosInstance.get(`/api/project/${id}`);
    console.log(resp);
    if (resp.status === 200) {
      return resp;
    }
  } catch (error) {
    throw error;
  }
};
