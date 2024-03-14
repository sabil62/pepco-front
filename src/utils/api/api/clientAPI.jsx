import { axiosInstance } from "../axiosInstance";

export const getAllClient = async () => {
  // console.log(id, header);
  try {
    let resp = await axiosInstance.get("/api/category/");
    if (resp.status === 200) {
      console.log(resp);
      return resp;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
