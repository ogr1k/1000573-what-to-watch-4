import {extend} from "../../utils.js";

const initialState = {
  films: [],
  promoFilm: {},
  comments: [],
  isFavouriteFetching: false,
  favouriteFilms: []
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
    runTime: film.run_time,
    isFavourite: film.is_favorite
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
  CLEAR_COMMENTS: `CLEAR_COMMENTS`,
  CHANGE_IS_FAVOURITE: `CHANGE_IS_FAVOURITE`,
  CHANGE_IS_FAVOURITE_PROMO: `CHANGE_IS_FAVOURITE_PROMO`,
  CHANGE_IS_FAVOURITE_FETCH_STATUS: `CHANGE_IS_FAVOURITE_FETCH_STATUS`,
  LOAD_FAVOURITE_FILMS: `LOAD_FAVOURITE_FILMS`,
  CLEAN_FAVOURITE_FILMS_DATA: `CLEAN_FAVOURITE_FILMS_DATA`
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
  }),
  changeIsFavourite: (id) => ({
    type: ActionType.CHANGE_IS_FAVOURITE,
    id
  }),
  changeIsFavouritePromo: () => ({
    type: ActionType.CHANGE_IS_FAVOURITE_PROMO
  }),
  changeIsFavouriteFetching: (status) => ({
    type: ActionType.CHANGE_IS_FAVOURITE_FETCH_STATUS,
    payload: status
  }),
  loadFavouriteFilms: (films) => ({
    type: ActionType.LOAD_FAVOURITE_FILMS,
    payload: films
  }),
  cleanFavouriteFilmsData: () => ({
    type: ActionType.CLEAN_FAVOURITE_FILMS_DATA
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
  },
  postIsFavourite: (id, status, isPromoFilm) => (dispatch, getState, api) => {
    dispatch(ActionCreator.changeIsFavouriteFetching(true));

    return api.post(`/favorite/${Number(id)}/${Number(status)}`)
    .then(() => {

      if (isPromoFilm) {
        dispatch(ActionCreator.changeIsFavouritePromo());
      }

      dispatch(ActionCreator.changeIsFavourite(id));
      dispatch(ActionCreator.changeIsFavouriteFetching(false));
    });
  },
  loadFavouriteFilms: () => (dispatch, getState, api) => {

    dispatch(ActionCreator.cleanFavouriteFilmsData());

    return api.get(`/favorite`)
    .then((response) => {
      const films = parseData(response.data);
      dispatch(ActionCreator.loadFavouriteFilms(films));
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
    case ActionType.CHANGE_IS_FAVOURITE: {

      const updatedFilms = [...state.films];
      const currentFilmIndex = updatedFilms.findIndex((film) => film.id === action.id);
      const updatedFilm = updatedFilms[currentFilmIndex];

      const film = extend(updatedFilm, {
        isFavourite: !updatedFilm.isFavourite
      });

      updatedFilms[currentFilmIndex] = film;


      return extend(state, {
        films: updatedFilms
      });
    }
    case ActionType.CHANGE_IS_FAVOURITE_PROMO: {


      const updatedPromoFilm = extend(state.promoFilm, {
        isFavourite: !state.promoFilm.isFavourite
      });


      return extend(state, {
        promoFilm: updatedPromoFilm
      });

    }
    case ActionType.CHANGE_IS_FAVOURITE_FETCH_STATUS: {

      return extend(state, {
        isFavouriteFetching: action.payload
      });
    }
    case ActionType.LOAD_FAVOURITE_FILMS: {

      return extend(state, {
        favouriteFilms: action.payload
      });
    }
    case ActionType.CLEAN_FAVOURITE_FILMS_DATA: {

      return extend(state, {
        favouriteFilms: []
      });
    }
  }

  return state;
};


export {reducer, ActionCreator, ActionType, Operation};
