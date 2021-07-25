import axios from "axios";

export default ({ url, config }) => {
  return {
    getAlbum: (params) => axios.get(`${url}/albums`, { ...config(), params }),
    getAlbumDetail: (albumId) =>
      axios.get(`${url}/albums/${albumId}`, config()),
    getPhotosByAlbum: (albumId) =>
      axios.get(`${url}/albums/${albumId}/photos`, config()),
  };
};
