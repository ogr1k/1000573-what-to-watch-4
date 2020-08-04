import React from "react";
import renderer from "react-test-renderer";
import ServerError from "./server-error.jsx";


it(`Render ShowMoreButton`, () => {
  const tree = renderer
    .create(<ServerError />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
