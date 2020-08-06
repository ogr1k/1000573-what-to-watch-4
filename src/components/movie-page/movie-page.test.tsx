import * as React from "react";
import * as renderer from "react-test-renderer";
import MoviePage from "./movie-page";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import NameSpace from "../../reducer/name-space.js";
import {Router} from "react-router-dom";
import history from "../../history.js";
import {film} from "../../mocks/test-mocks";

const mockStore = configureStore([]);

it(`Render Movie-Page`, () => {

  const store = mockStore({
    [NameSpace.DATA]: {
      films: [film],
    }
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <Router history={history}>
            <MoviePage
              routerProps={{
                match: {
                  params: {
                    id: `1`
                  }
                }
              }}
              authorisationStatus="AUTH"
            />
          </Router>
        </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
