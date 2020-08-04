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
  "run_time": 200,
  "is_favorite": false
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
  runTime: film.run_time,
  isFavourite: film.is_favorite
};


const comments = [{
  "id": 1,
  "user": {
    "id": 4,
    "name": `Kate Muir`
  },
  "rating": 8.9,
  "comment": `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
  "date": `2019-05-08T14:13:56.569Z`
}];

const favouriteMock = {
  description: `A former Prohibition-era Jewish gangster returns to the Lower East Side of Manhattan over thirty years later, where he once again must confront the ghosts and regrets of his old life.`,
  director: `Sergio Leone`,
  genre: `Crime`,
  id: 1,
  name: `Once Upon a Time in America`,
  poster: `https://htmlacademy-react-3.appspot.com/wtw/static/film/poster/Once_Upon_a_Time_in_America.jpg`,
  previewImage: `https://htmlacademy-react-3.appspot.com/wtw/static/film/preview/Once_Upon_a_Time_in_America.jpg`,
  rating: 9.9,
  year: 1984,
  ratings: 276395,
  starring: [`Robert De Niro`, `James Woods`, `Elizabeth McGovern`],
  video: `http://media.xiph.org/mango/tears_of_steel_1080p.webm`,
  runTime: 500,
  isFavourite: false
};

const expectedFavouriteMock = {
  description: `A former Prohibition-era Jewish gangster returns to the Lower East Side of Manhattan over thirty years later, where he once again must confront the ghosts and regrets of his old life.`,
  director: `Sergio Leone`,
  genre: `Crime`,
  id: 1,
  name: `Once Upon a Time in America`,
  poster: `https://htmlacademy-react-3.appspot.com/wtw/static/film/poster/Once_Upon_a_Time_in_America.jpg`,
  previewImage: `https://htmlacademy-react-3.appspot.com/wtw/static/film/preview/Once_Upon_a_Time_in_America.jpg`,
  rating: 9.9,
  year: 1984,
  ratings: 276395,
  starring: [`Robert De Niro`, `James Woods`, `Elizabeth McGovern`],
  video: `http://media.xiph.org/mango/tears_of_steel_1080p.webm`,
  runTime: 500,
  isFavourite: true
};

const api = createAPI(() => {});

it(`Data reducer without additional parameters should return initial state`, () => {
  expect(reducer(undefined, {})).toEqual({
    comments: [],
    films: [],
    promoFilm: {},
    favouriteFilms: [],
    isFavouriteFetching: false,
    isFilmsFetching: false,
    isServerUvailable: true
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
    isFilmsFetching: false,
  });
});

it(`Reducer should update comments by load comments`, () => {
  expect(reducer({
    comments: [],
  }, {
    type: ActionType.LOAD_COMMENTS,
    payload: comments,
  })).toEqual({
    comments,
  });
});

it(`Reducer should update comments by load comments`, () => {
  expect(reducer({
    comments: [],
  }, {
    type: ActionType.LOAD_COMMENTS,
    payload: comments,
  })).toEqual({
    comments,
  });
});

it(`Reducer should update favourite status of all films by changeIsFavourite`, () => {

  expect(reducer({
    films: [favouriteMock]
  }, {
    type: ActionType.CHANGE_IS_FAVOURITE,
    id: 1,
  })).toEqual({
    films: [expectedFavouriteMock],
  });
});

it(`Reducer should update favourite status of promoFilm by changeIsFavouritePromo`, () => {

  expect(reducer({
    promoFilm: favouriteMock
  }, {
    type: ActionType.CHANGE_IS_FAVOURITE_PROMO,
  })).toEqual({
    promoFilm: expectedFavouriteMock
  });
});

it(`Reducer should change isFavouriteFetching`, () => {

  expect(reducer({
    isFavouriteFetching: false
  }, {
    type: ActionType.CHANGE_IS_FAVOURITE_FETCH_STATUS,
    payload: true
  })).toEqual({
    isFavouriteFetching: true,
  });

});


it(`Reducer should update favouriteFilms by load favouriteFilms`, () => {

  expect(reducer({
    favouriteFilms: []
  }, {
    type: ActionType.LOAD_FAVOURITE_FILMS,
    payload: [film]
  })).toEqual({
    favouriteFilms: [film],
  });

});

it(`Reducer should clean favouriteFilmsData by cleanFavouriteFilmsData`, () => {

  expect(reducer({
    favouriteFilms: [film]
  }, {
    type: ActionType.CLEAN_FAVOURITE_FILMS_DATA,
  })).toEqual({
    favouriteFilms: [],
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
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(2, {
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

  it(`Should make a correct API call to /comments/id`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const id = 1;
    const commentsLoader = Operation.loadComments(id);

    apiMock
      .onGet(`/comments/${id}`)
      .reply(200, comments);

    return commentsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.LOAD_COMMENTS,
          payload: comments,
        });
      });
  });


  it(`Should make a correct API call to /favorite/id/status (isPromoFilm = false)`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const id = 1;
    const isFavouriteStatus = false;
    const isPromoFilm = false;

    const dataLoader = Operation.postIsFavourite(id, isFavouriteStatus, isPromoFilm);

    apiMock
        .onPost(`/favorite/${id}/${Number(isFavouriteStatus)}`)
        .reply(200);

    return dataLoader(dispatch, () => {}, api)
        .then(() => {
          expect(dispatch).toHaveBeenCalledTimes(3);
        });
  });

  it(`Should make a correct API call to /favorite/id/status (isPromoFilm = true)`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const id = 1;
    const isFavouriteStatus = false;
    const isPromoFilm = true;

    const dataLoader = Operation.postIsFavourite(id, isFavouriteStatus, isPromoFilm);

    apiMock
        .onPost(`/favorite/${id}/${Number(isFavouriteStatus)}`)
        .reply(200);

    return dataLoader(dispatch, () => {}, api)
        .then(() => {
          expect(dispatch).toHaveBeenCalledTimes(4);
        });
  });

  it(`Should make a correct API call to /favorite`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const filmsLoader = Operation.loadFavouriteFilms();

    apiMock
      .onGet(`/favorite`)
      .reply(200, [film]);

    return filmsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(2, {
          type: ActionType.LOAD_FAVOURITE_FILMS,
          payload: [parsedFilm],
        });
      });
  });
});
