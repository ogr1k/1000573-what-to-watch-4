import React from "react";
import renderer from "react-test-renderer";
import MoviePage from "./movie-page.jsx";
import {films} from "../../mocks/test-mocks.js";

const testID = 1;

it(`Render Movie-Page`, () => {
  const tree = renderer
    .create(

        <MoviePage films={films} filmId={testID}/>

    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
