import React from "react";
import renderer from "react-test-renderer";
import GenresList from "./genres-list.jsx";

const genres = [`Action`, `Comedy`];
const activeFilter = `Action`;


it(`Render Films-List`, () => {
  const tree = renderer
    .create(<GenresList genres={genres} clickHandler={() => {}} activeFilter={activeFilter}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
