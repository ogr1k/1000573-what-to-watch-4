import * as React from "react";
import * as renderer from "react-test-renderer";
import MoviePageReviews from "./movie-page-reviews";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import NameSpace from "../../reducer/name-space.js";
import thunk from 'redux-thunk';
import {createAPI} from "../../api.js";
import {film} from "../../mocks/test-mocks";
import {noop} from "../../utils.js";


const api = createAPI(noop);
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureStore(middlewares);

it(`Render Movie Page Reviews`, () => {

  const store = mockStore({
    [NameSpace.DATA]: {
      comments: [
        {
          "id": 1,
          "user": {
            "id": 4,
            "name": `Kate Muir`
          },
          "rating": 9,
          "comment": `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
          "date": `2019-05-08T14:13:56.569Z`
        }
      ],
    }
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <MoviePageReviews
            activeTab={`Reviews`}
            film={film}
            onClick={noop}
          />
        </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
