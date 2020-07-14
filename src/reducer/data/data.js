import {getAvailableGenres, extend} from "../../utils.js";

const initialState = {
  films: [],
  promoFilm: {},
  genres: [],
};

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
          dispatch(ActionCreator.loadFilms(response.data));
        });
  },
  loadPromoFilm: () => (dispatch, getState, api) => {
    return api.get(`/films/promo`)
        .then((response) => {
          dispatch(ActionCreator.loadPromoFilm(response.data));
        });
  }
};


const reducer = (state = initialState, action) => {

  switch (action.type) {
    case ActionType.LOAD_FILMS: {
      return extend(state, {
        films: adaptFilmData(action.payload),
        genres: getAvailableGenres(action.payload)
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


export {reducer, ActionCreator, ActionType, Operation};
