import axios from "axios";

export default function Post({ url, config }) {
  return {
    getAllPost: () => axios.get(`${url}/posts`, config()),
    getPost: (params) => axios.get(`${url}/posts/`, { ...config(), params }),
    getPostDetail: (postId) => axios.get(`${url}/posts/${postId}`, config()),
    getPostComments: (postId) =>
      axios.get(`${url}/posts/${postId}/comments`, config()),
    createPost: (data) => axios.post(`${url}/posts`, data),
    updatePost: (postId, data) => axios.put(`${url}/posts/${postId}`, data),
    deletePost: (postId) => axios.delete(`${url}/posts/${postId}`, config()),
    createComment: (postId, data) =>
      axios.post(`${url}/posts/${postId}/comments`, data),
    updateComment: (commentId, data) =>
      axios.put(`${url}/comments/${commentId}`, data),
    deleteComment: (commentId) =>
      axios.delete(`${url}/comments/${commentId}`, config()),
  };
}
