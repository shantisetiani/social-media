import axios from "axios";
import { API_URL } from "../config";

const AllApi = () => {
  const config = () => ({
    headers: {
      "Content-Type": "application/json",
    },
  });

  return {
    getAllUser: () => axios.get(`${API_URL}/users`, config()),
    getUser: (params) => axios.get(`${API_URL}/users`, { ...config(), params }),
    getAllPost: () => axios.get(`${API_URL}/posts`, config()),
    getPost: (params) =>
      axios.get(`${API_URL}/posts/`, { ...config(), params }),
    getPostDetail: (id) => axios.get(`${API_URL}/posts/${id}`, config()),
    createPost: (data) => axios.post(`${API_URL}/posts`, data),
    getAlbum: (params) =>
      axios.get(`${API_URL}/albums`, { ...config(), params }),
  };
};

export const Api = AllApi();
