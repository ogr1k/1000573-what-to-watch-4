import React from "react";
import renderer from "react-test-renderer";
import withSelectedFilm from "./with-selected-film.js";
import films from "../../mocks/test-mocks.js";

const availableGenres = [`Comedy`, `Dramma`];

const MockComponent = () => <div/>;


const MockComponentWrapped = withSelectedFilm(MockComponent);

it(`withSelectedFilm is rendered correctly`, () => {
  const tree = renderer.create((
    <MockComponentWrapped
      films={films} genres={availableGenres}
    />
  ), {
    createNodeMock() {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
