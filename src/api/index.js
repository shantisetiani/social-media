import { API_URL } from "../config";
import User from "./user";
import Post from "./post";
import Album from "./album";

const config = () => ({
  headers: {
    "Content-Type": "application/json",
  },
});

const params = { url: API_URL, config: config };

export const UserApi = User(params);
export const PostApi = Post(params);
export const AlbumApi = Album(params);
