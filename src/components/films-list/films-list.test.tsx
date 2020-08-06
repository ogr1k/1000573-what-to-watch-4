import * as React from "react";
import * as renderer from "react-test-renderer";
import FilmsList from "./films-list";
import {film} from "../../mocks/test-mocks";

it(`Render FilmsList`, () => {
  const tree = renderer
    .create(< FilmsList films={[film]} />, {
      createNodeMock: () => {
        return {};
      }
    })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
