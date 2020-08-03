import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Main from "./main";
import {films, PROMOFILM} from "../../mocks/test-mocks.js";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {BrowserRouter} from "react-router-dom";

const mockStore = configureStore([]);

Enzyme.configure({
  adapter: new Adapter(),
});


it(`Should head button be pressed`, () => {

  const store = mockStore({
    films,
    promoFilm: PROMOFILM,
    genres: [],
    activeFilter: ``
  });


  const onHeadClick = jest.fn();

  const main = shallow(
      <BrowserRouter>
        <Provider store={store}>
          <Main
            onHeadClick={onHeadClick}
          />
        </Provider>
      </BrowserRouter>
  );

  const headButtons = main.find(`.small-movie-card__title`);

  headButtons.map((button) =>
    button.simulate(`click`)
  );

  expect(onHeadClick.mock.calls.length).toBe(headButtons.length);
});
