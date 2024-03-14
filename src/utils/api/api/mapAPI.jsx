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
