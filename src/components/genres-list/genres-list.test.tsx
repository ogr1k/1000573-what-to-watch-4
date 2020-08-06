import * as React from "react";
import * as renderer from "react-test-renderer";
import GenresList from "./genres-list";

const genres = [`Action`, `Comedy`];
const activeFilter = `Action`;


it(`Render Genres List`, () => {
  const tree = renderer
    .create(<GenresList genres={genres} onFilterClick={() => {}} activeFilter={activeFilter}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
