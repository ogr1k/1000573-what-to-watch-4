import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space.js";
import {Router} from "react-router-dom";
import history from "../../history.js";

const mockStore = configureStore([]);

const headClickHandler = () =>{};

const DEFAULT_FILTER = `All Genres`;
const DEFAULT_MAX_CARDS = 8;

it(`Render Main`, () => {

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
          <Router history={history}>
            <Main
              handleHeaderClick={headClickHandler}
            />
          </Router>
        </Provider>, {
          createNodeMock: () => {
            return {};
          }
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
