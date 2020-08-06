import * as React from "react";
import * as renderer from "react-test-renderer";
import AddReviewPage from "./add-review-page";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space.js";
import {Router, BrowserRouter} from "react-router-dom";
import history from "../../history.js";
import {film} from "../../mocks/test-mocks";

const mockStore = configureStore([]);


it(`Render AddReviewPage`, () => {

  const store = mockStore({
    [NameSpace.DATA]: {
      films: [film],
    },
    [NameSpace.REVIEW]: {
      fetchStatus: ``
    },
  });

  const tree = renderer
    .create(
        <BrowserRouter>
          <Provider store={store}>
            <Router history={history}>
              <AddReviewPage match={{
                "params": {
                  "id": `1`
                }
              }}
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
