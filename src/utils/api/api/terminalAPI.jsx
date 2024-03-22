import { axiosInstance } from "../axiosInstance";

export const getTerminalInfo = async ({ id }) => {
  try {
    let resp = await axiosInstance.get(`/api/project/${id}`);
    // console.log(resp);
    if (resp.status === 200 || resp.status === 201) {
      return resp;
    }
  } catch (error) {
    throw error;
  }
};

export const postTerminalInfo = async ({ id }) => {
  try {
    let resp = await axiosInstance.post(`/api/project/${id}`);
    // console.log(resp);
    if (resp.status === 200 || resp.status === 201) {
      return resp;
    }
  } catch (error) {
    throw error;
  }
};

export const runTerminalSQL = async ({ header }) => {
  try {
    let resp = await axiosInstance.post("/api/terminal/", header);
    // console.log(resp);
    if (resp.status === 200 || resp.status === 201) {
      return resp;
    }
  } catch (error) {
    throw error;
  }
};

// http://127.0.0.1:8000/api/sql/45/
export const saveTerminalSQL = async ({ id, header }) => {
  try {
    let resp = await axiosInstance.put(`/api/sql/${id}/`, header);
    console.log(resp);
    if (resp.status === 200 || resp.status === 201) {
      return resp;
    }
  } catch (error) {
    throw error;
  }
};
