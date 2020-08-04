import React from "react";
import renderer from "react-test-renderer";
import AddReviewPage from "./add-review-page.jsx";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space.js";
import {Router, BrowserRouter} from "react-router-dom";
import history from "../../history.js";

const mockStore = configureStore([]);

const film = {
  "description": `A pair of young lovers flee their New England town, which causes a local search party to fan out to find them.`,
  "director": `Wes Anderson`,
  "genre": `Adventure`,
  "id": 1,
  "name": `Moonrise Kingdom`,
  "poster": `https://htmlacademy-react-3.appspot.com/wtw/static/film/poster/Moonrise_Kingdom.jpg`,
  "previewImage": `https://htmlacademy-react-3.appspot.com/wtw/static/film/preview/moonrise-kingdom.jpg`,
  "rating": 7.9,
  "ratings": 291183,
  "starring": [
    `Jared Gilman`,
    `Kara Hayward`,
    `Bruce Willis`
  ],
  "video": `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  "year": 2012,
  "backgroundImage": `https://htmlacademy-react-3.appspot.com/wtw/static/film/background/Moonrise_Kingdom.jpg`,
  "backgroundColor": `#D8E3E5`,
  "runTime": 94,
  "mainVideo": `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`
};

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
