import React from "react";
import renderer from "react-test-renderer";
import MoviePageTabs from "./movie-page-tabs.jsx";


it(`Render Movie Page Tabs`, () => {

  const tree = renderer
    .create(

        <MoviePageTabs
          activeTab={``}
          filmId={1}
        />

    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
