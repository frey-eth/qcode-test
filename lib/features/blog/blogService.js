import axios from "axios";
import { baseUrl } from "@/utils/axiosConfig";

const getAllBlog = async () => {
  try {
    const response = await axios.get(`${baseUrl}blog/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all blogs:", error);
    throw error; // Propagate the error to the caller
  }
};

const createBlog = async (blog) => {
  const response = await axios.post(`${baseUrl}blog/`, blog);
  return response.data;
};

const submitComment = async (id, name, comment) => {
  try {
    const response = await axios.post(`${baseUrl}blog/submit-comment/${id}`, {
      name,
      comment,
    });
    return response.data;
  } catch (error) {
    console.error("Error submitting comment:", error);
    throw error;
  }
};

const blogService = {
  getAllBlog,
  createBlog,
  submitComment,
};

export default blogService;
