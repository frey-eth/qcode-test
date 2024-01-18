import { baseUrl } from "@/utils/axiosConfig";
import axios from "axios";

const uploadImg = async (data) => {
  const response = await axios.post(`${baseUrl}upload/`, data);
  return response.data;
};

const deleteImg = async (id) => {
  const response = await axios.delete(`${baseUrl}upload/${id}`);
  return response.data;
};

const uploadService = {
  uploadImg,
  deleteImg,
};

export default uploadService;
