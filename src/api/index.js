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
    getPostComments: (id) =>
      axios.get(`${API_URL}/posts/${id}/comments`, config()),
    createPost: (data) => axios.post(`${API_URL}/posts`, data),
    updatePost: (id, data) => axios.put(`${API_URL}/posts/${id}`, data),
    deletePost: (id) => axios.delete(`${API_URL}/posts/${id}`, config()),
    createComment: (id, data) =>
      axios.post(`${API_URL}/posts/${id}/comments`, data),
    getAlbum: (params) =>
      axios.get(`${API_URL}/albums`, { ...config(), params }),
    getAlbumDetail: (id) => axios.get(`${API_URL}/albums/${id}`, config()),
    getPhotosByAlbum: (id) =>
      axios.get(`${API_URL}/albums/${id}/photos`, config()),
  };
};

export const Api = AllApi();
