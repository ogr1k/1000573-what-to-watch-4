import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space.js";
import {films} from "../../mocks/test-mocks.js";

const mockStore = configureStore([]);

const DEFAULT_FILTER = `All Genres`;
const DEFAULT_MAX_CARDS = 8;

it(`Render App`, () => {

  const store = mockStore({
    [NameSpace.MAIN]: {
      activeFilter: DEFAULT_FILTER,
      maxCards: DEFAULT_MAX_CARDS
    },
    [NameSpace.DATA]: {
      films: [],
      promoFilm: {},
    }
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
