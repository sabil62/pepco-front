import { axiosInstance } from "../axiosInstance";

export const getValidate = async (id) => {
  console.log(id);
  try {
    let resp = await axiosInstance.get(`/api/validate/${id}`);
    if (resp.status === 200 || resp.status === 201) {
      return resp;
    }
  } catch (error) {
    throw error;
  }
};
