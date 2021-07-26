import { setIsLogin } from "../action";

describe("Login Actions", () => {
  it("Should call action to store isLogin info", () => {
    const expectedAction = {
      type: "setIsLogin",
      data: true,
    };
    expect(setIsLogin(true)).toEqual(expectedAction);
  });
});
