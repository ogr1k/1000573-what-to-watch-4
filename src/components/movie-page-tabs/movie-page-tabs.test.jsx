import React from "react";
import renderer from "react-test-renderer";
import MoviePageTabs from "./movie-page-tabs.jsx";
import {Router} from "react-router-dom";
import history from "../../history.js";


it(`Render Movie Page Tabs`, () => {

  const tree = renderer
    .create(

        <Router history={history}>
          <MoviePageTabs
            activeTab={``}
            filmId={1}
          />
        </Router>

    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
