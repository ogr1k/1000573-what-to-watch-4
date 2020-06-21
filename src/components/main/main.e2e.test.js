import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Main from "./main";
import {FILMS, PROMOFILM} from "../../mocks/test-mocks.js";

Enzyme.configure({
  adapter: new Adapter(),
});


it(`Should head button be pressed`, () => {
  const onHeadClick = jest.fn();

  const main = shallow(
      <Main
        filmName={PROMOFILM.name} filmGenre={PROMOFILM.genre} filmDate={PROMOFILM.date} filmImage={PROMOFILM.image} films={FILMS}
        onHeadClick={onHeadClick}
      />
  );

  const headButtons = main.find(`.small-movie-card__title`);

  headButtons.map((button) =>
    button.simulate(`click`)
  );

  expect(onHeadClick.mock.calls.length).toBe(headButtons.length);
});
