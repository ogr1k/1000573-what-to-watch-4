import React from "react";
import renderer from "react-test-renderer";
import Filter from "./filter.jsx";

const genre = `Action`;
const activeFilter = `Action`;

it(`Render Films-List`, () => {
  const tree = renderer
    .create(< Filter genre={genre} onClick={() => {}} activeFilter={activeFilter}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
