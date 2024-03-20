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
