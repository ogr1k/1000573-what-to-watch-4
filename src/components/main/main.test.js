import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";
import {films, PROMOFILM} from "../../mocks/test-mocks.js";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

const headClickHandler = () =>{};

it(`Render Main`, () => {

  const store = mockStore({
    films,
    promoFilm: PROMOFILM,
    genres: [],
    activeFilter: ``,
    maxCards: 8
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <Main
            onHeadClick={headClickHandler}
          />
        </Provider>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
