import React from "react";
import renderer from "react-test-renderer";
import FilmsList from "./films-list.jsx";
import {films} from "../../mocks/test-mocks.js";


const cardClickHandler = () => {};

it(`Render Films-List`, () => {
  const tree = renderer
    .create(< FilmsList films={films} onClick={cardClickHandler} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
