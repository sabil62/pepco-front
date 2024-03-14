import { axiosInstance } from "../axiosInstance";

export const getFiles = async ({ clientName }) => {
  const queryParamas = {
    client_name: clientName,
  };

  try {
    let resp = await axiosInstance.get("api/file_upload/", {
      params: queryParamas,
    });

    if (resp.status === 200) {
      console.log("SUCCESS");
      return resp;
    }
    // console.log(resp);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const uploadFiles = async ({ formData }) => {
  //API HIT
  try {
    // console.log(formDataArray);
    let resp = await axiosInstance.post("api/file_upload/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(resp);
    if (resp.status === 200) {
      console.log(resp);
      return resp;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAllFile = async () => {
  // http://127.0.0.1:8000/api/project/
  try {
    let resp = await axiosInstance.get("/api/file");
    // console.log(resp);
    if (resp.status === 200) {
      return resp;
    }
  } catch (error) {
    throw error;
  }
};

export const getFile = async ({ id }) => {
  try {
    let resp = await axiosInstance.get(`/api/file/${id}`);
    // console.log(resp);
    if (resp.status === 200) {
      return resp;
    }
  } catch (error) {
    throw error;
  }
};
