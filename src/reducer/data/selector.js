import NameSpace from "../name-space.js";
import {getActiveFilter} from "../main-page/selector.js";
import {createSelector} from "reselect";

const NAME_SPACE = NameSpace.DATA;
const MAX_SAME_GENRES_FILMS_COUNT = 4;

const getFilteredFilms = (activeFilter, films) => {
  if (activeFilter === `All Genres`) {
    return films;
  }

  return films.filter((film) => film.genre === activeFilter);
};

const getAvailableGenres = (films) => {

  const availableGenres = new Set(films.map((film) => film.genre));

  return Array.from(availableGenres);
};

export const getFilms = (state) => {

  return state[NAME_SPACE].films;
};

export const getFilmById = (state, id) => {
  const films = state[NAME_SPACE].films;

  return films.filter((film) => film.id === Number(id))[0];
};


export const getSameGenreFilms = createSelector(
    getFilms,
    getFilmById,
    (films, currentActiveFilm) => {
      const sameGenresFilms = [];

      for (const film of films) {
        if (sameGenresFilms.length === MAX_SAME_GENRES_FILMS_COUNT) {
          return sameGenresFilms;
        }

        if (film.genre === currentActiveFilm.genre && film.id !== currentActiveFilm.id) {
          sameGenresFilms.push(film);
        }
      }

      return sameGenresFilms;
    }
);


export const getPromoFilm = (state) => {
  return state[NAME_SPACE].promoFilm;
};

export const getFilmsByGenres = createSelector(
    getActiveFilter,
    getFilms,
    (resultOne, resultTwo) => {
      return getFilteredFilms(resultOne, resultTwo);
    }
);

export const getGenres = createSelector(
    getFilms,
    (result) => {
      return getAvailableGenres(result);
    }
);

export const getComments = (state) => {
  return state[NAME_SPACE].comments;
};

export const getIsFavouriteFetching = (state) => {

  return state.DATA.isFavouriteFetching;
};

export const getFavouriteFilms = (state) => {

  return state.DATA.favouriteFilms;
};

export const getIsFilmsFetching = (state) => {

  return state[NAME_SPACE].isFilmsFetching;
};


export const getLoadFilmsError = (state) => {

  return state[NAME_SPACE].loadFilmsError;
};

export const getServerError = (state) => {

  return state[NAME_SPACE].isServerUvailable;
};
