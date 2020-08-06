import * as React from "react";
import * as renderer from "react-test-renderer";
import MoviePageOverview from "./movie-page-overview";
import {film} from "../../mocks/test-mocks";

it(`Render Movie Page Overview`, () => {

  const tree = renderer
    .create(

        <MoviePageOverview
          activeTab={``}
          film={film}
          onClick={() => {}}
        />

    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
