import * as React from "react";
import * as renderer from "react-test-renderer";
import Main from "./main";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space.js";
import {Router, BrowserRouter} from "react-router-dom";
import history from "../../history.js";
import {film} from "../../mocks/test-mocks";
import {noop} from "../../utils";

const mockStore = configureStore([]);

const DEFAULT_FILTER = `All Genres`;
const DEFAULT_MAX_CARDS = 8;

it(`Render Main`, () => {

  const store = mockStore({
    [NameSpace.MAIN]: {
      activeFilter: DEFAULT_FILTER,
      maxCards: DEFAULT_MAX_CARDS
    },
    [NameSpace.DATA]: {
      films: [film],
      promoFilm: film,
    }
  });

  const tree = renderer
    .create(
        <BrowserRouter>
          <Provider store={store}>
            <Router history={history}>
              <Main
                handleHeaderClick={noop}
              />
            </Router>
          </Provider>
        </BrowserRouter>, {
          createNodeMock: () => {
            return {};
          }
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
