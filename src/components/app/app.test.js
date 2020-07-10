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
    activeFilter: ``,
    maxCards: 8
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <App
            films={films}
            handleHeaderClick={() => {}}
          />
        </Provider>, {
          createNodeMock: () => {
            return {};
          }
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
