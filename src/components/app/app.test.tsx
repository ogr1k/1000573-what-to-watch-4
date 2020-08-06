import * as React from "react";
import * as renderer from "react-test-renderer";
import App from "./app";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space.js";
import {film} from "../../mocks/test-mocks";


const mockStore = configureStore([]);

const DEFAULT_FILTER = `All Genres`;
const DEFAULT_MAX_CARDS = 8;

it(`Render App`, () => {
  const store = mockStore({
    [NameSpace.MAIN]: {
      activeFilter: DEFAULT_FILTER,
      maxCards: DEFAULT_MAX_CARDS,
    },
    [NameSpace.DATA]: {
      films: [film],
      promoFilm: film,
    },
    [NameSpace.USER]: {
      authorisationStatus: `AUTH`,
    },
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <App />
        </Provider>, {
          createNodeMock: () => {
            return {};
          }
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
