import { axiosInstance } from "../axiosInstance";

const getMappingInfo = async ({ id }) => {
  try {
    let resp = await axiosInstance.get(`/api/mapping/${id}`);
    if (resp.status === 200) {
      console.log(resp);
      return resp;
    }
  } catch (error) {
    throw error;
  }
};
