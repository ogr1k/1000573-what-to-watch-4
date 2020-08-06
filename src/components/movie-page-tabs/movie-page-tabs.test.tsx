import * as React from "react";
import * as renderer from "react-test-renderer";
import MoviePageTabs from "./movie-page-tabs";
import {noop} from "../../utils.js";


it(`Render Movie Page Tabs`, () => {

  const tree = renderer
    .create(
        <MoviePageTabs
          activeTab={``}
          filmId={1}
          onClick={noop}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
