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
    getPostDetail: (postId) =>
      axios.get(`${API_URL}/posts/${postId}`, config()),
    getPostComments: (postId) =>
      axios.get(`${API_URL}/posts/${postId}/comments`, config()),
    createPost: (data) => axios.post(`${API_URL}/posts`, data),
    updatePost: (postId, data) => axios.put(`${API_URL}/posts/${postId}`, data),
    deletePost: (postId) =>
      axios.delete(`${API_URL}/posts/${postId}`, config()),
    createComment: (postId, data) =>
      axios.post(`${API_URL}/posts/${postId}/comments`, data),
    updateComment: (commentId, data) =>
      axios.put(`${API_URL}/comments/${commentId}`, data),
    deleteComment: (commentId) =>
      axios.delete(`${API_URL}/comments/${commentId}`, config()),
    getAlbum: (params) =>
      axios.get(`${API_URL}/albums`, { ...config(), params }),
    getAlbumDetail: (albumId) =>
      axios.get(`${API_URL}/albums/${albumId}`, config()),
    getPhotosByAlbum: (albumId) =>
      axios.get(`${API_URL}/albums/${albumId}/photos`, config()),
  };
};

export const Api = AllApi();
