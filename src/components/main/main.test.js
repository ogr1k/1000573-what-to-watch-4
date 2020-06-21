import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";
import {FILMS, PROMOFILM} from "../../mocks/test-mocks.js";


const headClickHandler = () =>{};

it(`Render Main`, () => {
  const tree = renderer
    .create(<Main
      filmName={PROMOFILM.name} filmGenre={PROMOFILM.genre} filmDate={PROMOFILM.date} filmImage={PROMOFILM.image} films={FILMS} onHeadClick={headClickHandler}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
