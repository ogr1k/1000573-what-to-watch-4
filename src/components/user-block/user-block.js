import React from "react";
import UserBlock from "./user-block.jsx";
import renderer from "react-test-renderer";


it(`Render Copyright`, () => {
  const tree = renderer
    .create(<UserBlock authorisationStatus="AUTH"/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
