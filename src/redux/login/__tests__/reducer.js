import loginReducer from "../reducer";

describe("Login Reducer", () => {
  // Test with the undefined state
  it("Should return the initial state", () => {
    const initialState = false;
    expect(loginReducer(undefined, {})).toEqual(initialState);
  });

  // Test with the state only
  it("Should return the state in the parameter", () => {
    expect(loginReducer(true, {})).toEqual(true);
  });

  it("Should return the new state", () => {
    const initialState = false;
    const newState = true;

    // Test with the action only
    expect(
      loginReducer(undefined, {
        type: "setIsLogin",
        data: newState,
      })
    ).toEqual(newState);

    // Test with the state and action
    expect(
      loginReducer(initialState, {
        type: "setIsLogin",
        data: newState,
      })
    ).toEqual(newState);
  });
});
