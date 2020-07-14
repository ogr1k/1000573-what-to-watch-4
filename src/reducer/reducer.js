import {getAvailableGenres, extend} from "../utils.js";

const DEFAULT_FILTER = `All Genres`;
const DEFAULT_MAX_CARDS = 8;
const MAX_CARDS_INCREMENT_STEP = 8;

const adaptFilmData = (films) => {

  const result = [];

  films.map(
      (film) => {
        const {description, director, genre, id, name, rating, released} = film;
        result.push(
            {
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
            }
        );
      }
  );

  return result;
};

const adaptPromoFilmData = (promoFilm) => {
  const {name, genre, released} = promoFilm;
  return {
    name,
    genre,
    date: released,
    image: promoFilm.poster_image
  };
};

const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`,
};


const initialState = {
  activeFilter: DEFAULT_FILTER,
  films: [],
  promoFilm: {},
  genres: [],
  maxCards: DEFAULT_MAX_CARDS,
  authorizationStatus: AuthorizationStatus.NO_AUTH,
};

const ActionType = {
  SET_FILTER: `SET_FILTER`,
  INCREMENT_MAX_CARDS: `INCREMENT_MAX_CARDS`,
  LOAD_FILMS: `LOAD_FILMS`,
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  LOAD_PROMO_FILM: `LOAD_PROMO_FILM`
};


const Operation = {
  loadFilms: () => (dispatch, getState, api) => {
    return api.get(`/films`)
      .then((response) => {
        dispatch(ActionCreator.loadFilms(response.data));
      });
  },
  checkAuth: () => (dispatch, getState, api) => {
    return api.get(`/login`)
      .then(() => {
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
      })
      .catch((err) => {
        throw err;
      });
  },
  loadPromoFilm: () => (dispatch, getState, api) => {
    return api.get(`/films/promo`)
      .then((response) => {
        dispatch(ActionCreator.loadPromoFilm(response.data));
      });
  }
  // login: (authData) => (dispatch, getState, api) => {
  //   return api.post(`/login`, {
  //     email: authData.login,
  //     password: authData.password,
  //   })
  //     .then(() => {
  //       dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
  //     });
  // },
};


const ActionCreator = {
  setActiveFilter: (activeGenre) => ({
    type: ActionType.SET_FILTER,
    activeFilter: activeGenre
  }),
  incrementMaxCards: () => ({
    type: ActionType.INCREMENT_MAX_CARDS,
  }),
  loadFilms: (films) => ({
    type: ActionType.LOAD_FILMS,
    payload: films,
  }),
  requireAuthorization: (status) => {
    return {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: status,
    };
  },
  loadPromoFilm: (film) => ({
    type: ActionType.LOAD_PROMO_FILM,
    payload: film
  })
};


const reducer = (state = initialState, action) => {

  switch (action.type) {
    case ActionType.SET_FILTER: {
      return extend(state, {
        activeFilter: action.activeFilter,
        maxCards: DEFAULT_MAX_CARDS
      });
    }
    case ActionType.INCREMENT_MAX_CARDS: {
      return extend(state, {
        maxCards: state.maxCards + MAX_CARDS_INCREMENT_STEP
      });
    }
    case ActionType.LOAD_FILMS: {
      return extend(state, {
        films: adaptFilmData(action.payload),
        genres: getAvailableGenres(action.payload)
      });
    }
    case ActionType.REQUIRED_AUTHORIZATION: {
      return extend(state, {
        authorizationStatus: action.payload
      });
    }
    case ActionType.LOAD_PROMO_FILM: {
      return extend(state, {
        promoFilm: adaptPromoFilmData(action.payload)
      });
    }
  }

  return state;
};


export {reducer, ActionCreator, ActionType, Operation, AuthorizationStatus};
