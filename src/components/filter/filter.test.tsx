import * as React from "react";
import * as renderer from "react-test-renderer";
import Filter from "./filter";

const genre = `Action`;
const activeFilter = `Action`;

it(`Render Filter`, () => {
  const tree = renderer
    .create(< Filter genre={genre} onFilterClick={() => {}} activeFilter={activeFilter}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
