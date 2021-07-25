const loginReducer = (state = false, action) => {
  switch (action.type) {
    case "setIsLogin":
      return action.data;
    default:
      return state;
  }
};

export default loginReducer;
