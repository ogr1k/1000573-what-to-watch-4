import * as React from "react";
import * as renderer from "react-test-renderer";
import Loader from "./loader";


it(`Render Loader`, () => {
  const tree = renderer
    .create(
        <Loader />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
