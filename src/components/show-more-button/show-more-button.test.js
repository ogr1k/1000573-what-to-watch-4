import React from "react";
import renderer from "react-test-renderer";
import ShowMoreButton from "./show-more-button.jsx";

const headClickHandler = () => {};

it(`Render ShowMoreButton`, () => {
  const tree = renderer
    .create(<ShowMoreButton onClick={headClickHandler}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
