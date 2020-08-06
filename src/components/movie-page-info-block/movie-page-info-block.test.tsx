import * as React from "react";
import * as renderer from "react-test-renderer";
import MoviePageInfoBlock from "./movie-page-info-block";
import {TabsNames} from "../../constants.js";
import {film} from "../../mocks/test-mocks";


it(`Render Movie Page Info Block`, () => {

  const tree = renderer
    .create(

        <MoviePageInfoBlock
          activeTab={TabsNames.OVERVIEW}
          film={film}
          onClick={()=> {}}
        />

    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
