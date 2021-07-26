import { cleanup, render } from "@testing-library/react";
import renderer from "react-test-renderer";
import Break from "../Break";

describe("UI Test Break component", () => {
  afterEach(cleanup);

  it("matches break snapshot", () => {
    const tree = renderer.create(<Break height={12} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
