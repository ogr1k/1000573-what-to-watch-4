import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";
import {FILMS, PROMOFILM} from "../../mocks/test-mocks.js";

it(`Render App`, () => {
  const tree = renderer
    .create(<App
      filmName={PROMOFILM.name} filmGenre={PROMOFILM.genre} filmDate={PROMOFILM.date} filmImage={PROMOFILM.image} films={FILMS}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
