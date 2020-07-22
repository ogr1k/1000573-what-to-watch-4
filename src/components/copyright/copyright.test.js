import React from "react";
import Copyright from "./copyright.jsx";
import renderer from "react-test-renderer";


it(`Render Copyright`, () => {
  const tree = renderer
    .create(<Copyright />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
