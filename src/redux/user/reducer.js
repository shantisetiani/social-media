const userReducer = (state = [], action) => {
  switch (action.type) {
    case "storeUsers":
      return action.data;
    default:
      return state;
  }
};

export default userReducer;
