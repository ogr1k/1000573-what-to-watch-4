import {extend} from "../../utils.js";

const initialState = {
  films: [],
  promoFilm: {},
};

const parseFilmData = (film) => {

  if (!film) {
    return null;
  }

  const {description, director, genre, id, name, rating, released} = film;

  return {
    description,
    director,
    genre,
    id,
    name,
    poster: film.poster_image,
    previewImage: film.preview_image,
    rating,
    ratings: film.scores_count,
    starring: film.starring.join(),
    video: film.video_link,
    year: released
  };

};

const parseData = (element) => {

  if (Array.isArray(element)) {
    const result = [];

    element.map(
        (film) => {
          result.push(parseFilmData(film));
        }
    );

    return result;
  }

  return parseFilmData(element);
};


const ActionType = {
  LOAD_FILMS: `LOAD_FILMS`,
  LOAD_PROMO_FILM: `LOAD_PROMO_FILM`
};

const ActionCreator = {
  loadFilms: (films) => ({
    type: ActionType.LOAD_FILMS,
    payload: films,
  }),
  loadPromoFilm: (film) => ({
    type: ActionType.LOAD_PROMO_FILM,
    payload: film
  })
};

const Operation = {
  loadFilms: () => (dispatch, getState, api) => {
    return api.get(`/films`)
        .then((response) => {
          const films = parseData(response.data);
          dispatch(ActionCreator.loadFilms(films));
        });
  },
  loadPromoFilm: () => (dispatch, getState, api) => {
    return api.get(`/films/promo`)
        .then((response) => {
          const promoFilm = parseData(response.data);
          dispatch(ActionCreator.loadPromoFilm(promoFilm));
        });
  }
};


const reducer = (state = initialState, action) => {

  switch (action.type) {
    case ActionType.LOAD_FILMS: {
      return extend(state, {
        films: action.payload,
      });
    }
    case ActionType.LOAD_PROMO_FILM: {
      return extend(state, {
        promoFilm: action.payload
      });
    }
  }

  return state;
};


export {reducer, ActionCreator, ActionType, Operation};
