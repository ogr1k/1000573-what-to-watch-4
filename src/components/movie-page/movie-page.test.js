import React from "react";
import renderer from "react-test-renderer";
import MoviePage from "./movie-page.jsx";
import {film} from "../../mocks/test-mocks.js";

it(`Render Movie-Page`, () => {
  const tree = renderer
    .create(<MoviePage film={film}/>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
