import React from "react";
import renderer from "react-test-renderer";
import ServerError from "./error.jsx";


it(`Render Error`, () => {
  const tree = renderer
    .create(<ServerError />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
