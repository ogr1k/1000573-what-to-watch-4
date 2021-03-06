import * as React from "react";
import * as renderer from "react-test-renderer";
import MoviePageOverview from "./movie-page-overview";
import {film} from "../../mocks/test-mocks";
import {noop} from "../../utils.js";

it(`Render Movie Page Overview`, () => {

  const tree = renderer
    .create(

        <MoviePageOverview
          activeTab={``}
          film={film}
          onClick={noop}
        />

    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
