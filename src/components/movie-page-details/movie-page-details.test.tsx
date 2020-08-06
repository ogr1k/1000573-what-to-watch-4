import * as React from "react";
import * as renderer from "react-test-renderer";
import MoviePageDetails from "./movie-page-details";
import {film} from "../../mocks/test-mocks";


it(`Render Movie Page Details`, () => {

  const tree = renderer
    .create(
        <MoviePageDetails
          activeTab={``}
          film={film}
          onClick={() => {}}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
