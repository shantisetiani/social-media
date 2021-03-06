import axios from "axios";

export default function User({ url, config }) {
  return {
    getAllUser: () => axios.get(`${url}/users`, config()),
    getUser: (params) => axios.get(`${url}/users`, { ...config(), params }),
  };
}
