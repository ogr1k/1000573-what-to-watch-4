import * as React from "react";
import * as renderer from "react-test-renderer";
import MoviePageTabs from "./movie-page-tabs";


it(`Render Movie Page Tabs`, () => {

  const tree = renderer
    .create(
        <MoviePageTabs
          activeTab={``}
          filmId={1}
          onClick={()=> {}}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
