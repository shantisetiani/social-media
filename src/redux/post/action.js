export const storePosts = (posts) => {
  return {
    type: "storePosts",
    data: posts,
  };
};

export const addPost = (posts) => {
  return {
    type: "addPost",
    data: posts,
  };
};
