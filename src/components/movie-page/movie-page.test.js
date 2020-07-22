import React from "react";
import renderer from "react-test-renderer";
import MoviePage from "./movie-page.jsx";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import NameSpace from "../../reducer/name-space.js";
import {Router} from "react-router-dom";
import history from "../../history.js";

const mockStore = configureStore([]);

it(`Render Movie-Page`, () => {

  const store = mockStore({
    [NameSpace.DATA]: {
      films: [
        {
          "description": `A former Prohibition-era Jewish gangster returns to the Lower East Side of Manhattan over thirty years later, where he once again must confront the ghosts and regrets of his old life.`,
          "director": `Sergio Leone`,
          "genre": `Crime`,
          "id": 1,
          "name": `Once Upon a Time in America`,
          "poster_image": `https://htmlacademy-react-3.appspot.com/wtw/static/film/poster/Once_Upon_a_Time_in_America.jpg`,
          "preview_image": `https://htmlacademy-react-3.appspot.com/wtw/static/film/preview/Once_Upon_a_Time_in_America.jpg`,
          "rating": 9.9,
          "released": 1984,
          "scores_count": 276395,
          "starring": [`Robert De Niro`, `James Woods`, `Elizabeth McGovern`],
          "preview_video_link": `http://media.xiph.org/mango/tears_of_steel_1080p.webm`
        }
      ],
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
