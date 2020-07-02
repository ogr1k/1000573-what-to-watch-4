import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";
import {films, PROMOFILM} from "../../mocks/test-mocks.js";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

it(`Render App`, () => {

  const store = mockStore({
    films,
    promoFilm: PROMOFILM,
    genres: [],
    activeFilter: ``
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <App
            films={films}
          />
        </Provider>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
