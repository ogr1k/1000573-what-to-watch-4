import {extend} from "../../utils.js";

const initialState = {
  films: [],
  promoFilm: {},
  comments: []
};

const parseFilmData = (film) => {

  if (!film) {
    return null;
  }

  const {description, director, genre, id, name, rating, released, starring} = film;

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
    starring,
    video: film.preview_video_link,
    year: released,
    backgroundImage: film.background_image,
    backgroundColor: film.background_color,
    runTime: film.run_time
  };

};

const parseData = (element) => {

  return element.map((film) => {
    return parseFilmData(film);
  });

};


const ActionType = {
  LOAD_FILMS: `LOAD_FILMS`,
  LOAD_PROMO_FILM: `LOAD_PROMO_FILM`,
  LOAD_COMMENTS: `LOAD_COMMENTS`,
  CLEAR_COMMENTS: `CLEAR_COMMENTS`
};

const ActionCreator = {
  loadFilms: (films) => ({
    type: ActionType.LOAD_FILMS,
    payload: films,
  }),
  loadPromoFilm: (film) => ({
    type: ActionType.LOAD_PROMO_FILM,
    payload: film
  }),
  loadComments: (comments) => ({
    type: ActionType.LOAD_COMMENTS,
    payload: comments
  }),
  clearComments: () => ({
    type: ActionType.CLEAR_COMMENTS,
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
          const promoFilm = parseFilmData(response.data);
          dispatch(ActionCreator.loadPromoFilm(promoFilm));
        });
  },
  loadComments: (id) => (dispatch, getState, api) => {
    dispatch(ActionCreator.clearComments());
    return api.get(`comments/${id}`)
        .then((response) => {
          dispatch(ActionCreator.loadComments(response.data));
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
    case ActionType.LOAD_COMMENTS: {
      return extend(state, {
        comments: action.payload
      });
    }
    case ActionType.CLEAR_COMMENTS: {
      return extend(state, {
        comments: []
      });
    }
  }

  return state;
};


export {reducer, ActionCreator, ActionType, Operation};
