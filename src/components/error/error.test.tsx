import * as React from "react";
import * as renderer from "react-test-renderer";
import ServerError from "./error";


it(`Render Error`, () => {
  const tree = renderer
    .create(<ServerError />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
