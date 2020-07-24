import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api.js";
import {reducer, ActionType, Operation} from "./data.js";
import {films} from "../../mocks/test-mocks.js";

const film = {
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
  "preview_video_link": `http://media.xiph.org/mango/tears_of_steel_1080p.webm`,
  "background_image": ``,
  "background_color": `black`,
  "run_time": 200
};

const parsedFilm = {
  description: film.description,
  director: film.director,
  genre: film.genre,
  id: film.id,
  name: film.name,
  poster: film.poster_image,
  previewImage: film.preview_image,
  rating: film.rating,
  year: film.released,
  ratings: film.scores_count,
  starring: film.starring,
  video: film.preview_video_link,
  backgroundImage: film.background_image,
  backgroundColor: film.background_color,
  runTime: film.run_time
};

const api = createAPI(() => {});

it(`Data reducer without additional parameters should return initial state`, () => {
  expect(reducer(undefined, {})).toEqual({
    films: [],
    promoFilm: {},
  });
});

it(`Reducer should update films by load films`, () => {
  expect(reducer({
    films: [],
  }, {
    type: ActionType.LOAD_FILMS,
    payload: films,
  })).toEqual({
    films,
  });
});

describe(`Operation work correctly`, () => {
  it(`Should make a correct API call to /films`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const filmsLoader = Operation.loadFilms();

    apiMock
      .onGet(`/films`)
      .reply(200, [film]);

    return filmsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_FILMS,
          payload: [parsedFilm],
        });
      });
  });

  it(`Should make a correct API call to /films/promo`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const filmsLoader = Operation.loadPromoFilm();

    apiMock
      .onGet(`/films/promo`)
      .reply(200, film);

    return filmsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_PROMO_FILM,
          payload: parsedFilm,
        });
      });
  });
});
