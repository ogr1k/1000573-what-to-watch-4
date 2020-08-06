import * as React from "react";
import * as renderer from "react-test-renderer";
import ShowMoreButton from "./show-more-button";

const headClickHandler = () => {};

it(`Render ShowMoreButton`, () => {
  const tree = renderer
    .create(<ShowMoreButton onClick={headClickHandler}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
