const postReducer = (state = [], action) => {
  switch (action.type) {
    case "storePosts":
      return action.data;
    default:
      return state;
  }
};

export default postReducer;
